import { Component, OnInit } from '@angular/core';
import {  DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { Forms } from './../../shared/components/dynamic-form/models/form-list';
import { BehaviorSubject } from 'rxjs';
import { FormTemplateModel } from '../../shared/components/dynamic-form/models/form-template';
import { table_list } from '../../shared/components/dynamic-table/models/table-list';
@Component({
  selector: 'app-home',
  imports: [DynamicFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

formSelect = new BehaviorSubject<FormTemplateModel>({} as FormTemplateModel) //Este me va a servir para mostar el select de arriba

displayForm = new BehaviorSubject<FormTemplateModel>({} as FormTemplateModel) //Este me va a servir para mostarra segun la opcion de arriba

selectedForm :string = 'avion'

dataSelected = new BehaviorSubject<any>({} as any)

columnsSelected = new BehaviorSubject<any>({} as any)

// TODO: Colocar Data de integracion con servicios

ngOnInit(): void {
  this.formSelect.next({...Forms["opciones"]})
  this.columnsSelected.next({...table_list["avion"].columns})

}

listenValue = (event: any) => {
  try {
    const parsedData = JSON.parse(event);

    // Acceso correcto a la propiedad anidada
    this.selectedForm = parsedData.form.opcion;

    console.log('Datos parseados:', parsedData);
    console.log('Opción seleccionada:', this.selectedForm);

    this.displayForm.next({...Forms[`${this.selectedForm}`]});

  } catch (error) {
    console.error('Error al parsear JSON:', error);
  }
}

}
