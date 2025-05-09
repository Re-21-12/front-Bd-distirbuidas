import { Component, inject, Injector, OnInit, signal, Type } from '@angular/core';
import {  DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { Forms } from './../../shared/components/dynamic-form/models/form-list';
import { BehaviorSubject } from 'rxjs';
import { FormTemplateModel } from '../../shared/components/dynamic-form/models/form-template';
import { table_list } from '../../shared/components/dynamic-table/models/table-list';
import { DynamicTableComponent } from '../../shared/components/dynamic-table/dynamic-table.component';
import { AvionService } from '../../api/services/avion.service';
import { AeropuertoService } from '../../api/services/aeropuerto.service';
import { AerolineaService } from '../../api/services/aerolinea.service';
import { CiudadService } from '../../api/services/ciudad.service';
import { CorreoElectronicoService } from '../../api/services/correo.service';
import { PaisService } from '../../api/services/pais.service';
import { PlazaService } from '../../api/services/plaza.service';
import { ReservaService } from '../../api/services/reserva.service';
import { TelefonoService } from '../../api/services/telefono.service';
import { BaseApiService } from '../../api/interfaces/base-api';
import { VueloService } from '../../api/services/vuelo.service';

@Component({
  selector: 'app-home',
  imports: [DynamicFormComponent, DynamicTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private _injector = inject(Injector)

private servicesMap: {[key: string]: Type<BaseApiService<any>>} = {
  'aerolinea': AerolineaService,
  'aeropuerto': AeropuertoService,
  'avion': AvionService,
  'ciudad': CiudadService,
  'correo': CorreoElectronicoService,
  'pais': PaisService,
  'plaza': PlazaService,
  'reserva': ReservaService,
  'telefono': TelefonoService,
  'vuelo': VueloService,

};

formSelect = new BehaviorSubject<FormTemplateModel>({} as FormTemplateModel) //Este me va a servir para mostar el select de arriba

displayForm = new BehaviorSubject<FormTemplateModel>({} as FormTemplateModel) //Este me va a servir para mostarra segun la opcion de arriba

selectedForm :string = 'avion'

dataSelected$ = new BehaviorSubject<any[]>([]);
columnsSelected$ = new BehaviorSubject<string[]>([]);

mode = signal<'view' | 'upd' | 'del' | 'ins'>('ins');

currentService: any = null;

defaultFormData$ = new BehaviorSubject<any>({});

dynamicId: any

// TODO: Colocar Data de integracion con servicios

ngOnInit(): void {
  this.formSelect.next({...Forms["opciones"]})
  // this.columnsSelected$.next([...table_list["avion"].columns])
  console.log(this.columnsSelected$)
}

listenSendData = (event: {type: 'ins' |'upd' | 'del' | 'view', data: any}) => {
  this.mode.set(event.type);
  const keys = Object.keys(event.data);

  if (keys.length === 0) return

  const firstKey = keys[0];
  const firstValue = event.data[firstKey];

  this.dynamicId = firstValue

  if (event.type === 'view') {

  this.currentService.getById(firstValue).subscribe({
    next: (data:any) => {
      console.log('data', data);
      this.defaultFormData$.next(data);
    }})

}
if (event.type === 'upd') {
  this.currentService.getById(firstValue).subscribe({
    next: (data:any) => {
      console.log('data', data);
      this.defaultFormData$.next(data);
    }})
}
if (event.type === 'del') {
  this.currentService.delete(firstValue).subscribe({
    next: (data:any) => {
      this.getAll()

    }})
}
}
getAll = () =>{
  this.currentService.getAll().subscribe({
    next: (data:any) => {
      this.dataSelected$.next(data); // Emitimos el nuevo valor
    },
    error: (err:any) => console.error('Error loading data', err)
  });
}
listenValue = (event: any) => {
  try {
    const parsedData = JSON.parse(event);
    this.selectedForm = parsedData.form.opcion;

    // Obtenemos el servicio dinámicamente
    this.currentService = this.getCurrentService();

    if (this.currentService) {
      // Llamamos al método del servicio
      this.getAll()
    }


    this.displayForm.next({...Forms[`${this.selectedForm}`]});
    this.columnsSelected$.next([...table_list[`${this.selectedForm}`].columns]);
    this.mode.set('ins');
  } catch (error) {
    console.error('Error:', error);
  }
}

getCurrentService(): any {
  // Obtenemos el tipo de servicio del mapa
  const serviceType = this.servicesMap[this.selectedForm];

  // Si no existe, retornamos null
  if (!serviceType) return null;

  // Pedimos la instancia al injector
  return this._injector.get(serviceType);
}
submitDisplay = (event: any) => {
  const parsedData = JSON.parse(event);
  const data  = parsedData.form;
console.log('data', data);
// {"id_aerolinea":"3","nombre":"AADC"} desde Swagger
  if(this.mode() === 'ins') {
  this.currentService.create(data).subscribe({
    next: (data:any) => {
      this.getAll()
    },
    error: (err:any) => console.error('Error creating data', err)
  })

}

if(this.mode() === 'upd') {
  this.currentService.update(this.dynamicId,data).subscribe({
    next: (data:any) => {
      this.getAll()
    },
    error: (err:any) => console.error('Error updating data', err)
  })
}
}
}
