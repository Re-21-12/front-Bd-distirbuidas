import { FormTemplateModel } from './form-template';
import {FieldType} from './form-template';
export type TFormList = {
  [key: string]: FormTemplateModel;
}

export const Forms: TFormList = {
aerolinea:{
 Code: 'aerolinea',
 Title: 'Aerolinea',
  Fields: [
    {
      Id: 1,
      Code: 'nombre',
      Name: 'Nombre',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 50,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 2,
      Code: 'id_aerolinea',
      Name: 'id_aerolinea',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    }
  ]

},
aeropuerto:{
  Code: 'aeropuerto',
  Title: 'Aeropuerto',
    Fields: [
      {
        Id: 1,
        Code: 'nombre',
        Name: 'Nombre',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'id_aeropuerto',
        Name: 'id_aeropuerto',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 3,
      Code: 'codigo_pais',
      Name: 'Codigo Pais',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
      },
      {
        Id: 4,
        Code: 'codigo_ciudad',
        Name: 'codigo_ciudad',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      }
    ]
},
avion:{
  Code: 'avion',
  Title: 'Avion',
    Fields: [
      {
        Id: 1,
        Code: 'modelo',
        Name: 'Modelo',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'id_avion',
        Name: 'id_avion',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 3,
        Code: 'capacidad_total',
        Name: 'Capacidad',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Number
      },
      {
        Id: 4,
        Code: 'id_aerolinea',
        Name: 'Aerolinea',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id:5,
        Code: 'matricula',
        Name: 'Matricula',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      }
    ]
},
ciudad:{
  Code: 'ciudad',
  Title: 'Ciudad',
    Fields: [
      {
        Id: 1,
        Code: 'nombre_ciudad',
        Name: 'Nombre Ciudad',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'codigo_ciudad',
        Name: 'Codigo Ciudad',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 3,
        Code: 'codigo_pais',
        Name: 'Codigo Pais',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
    ]
},
  correo_electronico:{
    Code: 'correo_electronico',
    Title: 'Correo Electronico',
      Fields: [
        {
          Id: 1,
          Code: 'correo',
          Name: 'Correo Electronico',
          IsRequired: true,
          IsEditable: true,
          Hidden: false,
          MaxLength: 50,
          MinLength: 3,
          Disabled: false,
          TypeField: FieldType.Text
        },
        {
          Id: 2,
          Code: 'id_pasajero',
          Name: 'pasajero',
          IsRequired: true,
          IsEditable: true,
          Hidden: false,
          MaxLength: 10,
          MinLength: 3,
          Disabled: false,
          TypeField: FieldType.Text
        }
      ]
},
pais:{
  Code : 'pais',
  Title: 'Pais',
    Fields: [
      {
        Id: 1,
        Code: 'nombre_pais',
        Name: 'Nombre Pais',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'codigo_pais',
        Name: 'Codigo Pais',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      }
    ]
},
pasajero:{
  Code: 'pasajero',
  Title: 'Pasajero',
    Fields: [
      {
        Id: 1,
        Code: 'primer_nombre',
        Name: 'Primer Nombre',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'segundo_nombre',
        Name: 'Segundo Nombre',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 3,
        Code: 'tercer_nombre',
        Name: 'Tercer Nombre',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 4,
        Code: 'primer_apellido',
        Name: 'Primer Apellido',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 5,
        Code: 'segundo_apellido',
        Name: 'Segundo Apellido',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 6,
        Code: 'id_pasajero',
        Name: 'id_pasajero',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 7,
        Code: 'pasaporte',
        Name: 'Pasaporte',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 8,
        Code: 'codigo_pais',
        Name: 'Codigo Pais',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 9,
        Code: 'codigo_ciudad',
        Name: 'Codigo Ciudad',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      }

    ]
},
plaza:{
  Code: 'plaza',
  Title: 'Plaza',
    Fields: [
      {
        Id: 1,
        Code: 'letra_fila',
        Name: 'fila',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
      {
        Id: 2,
        Code: 'numero_plaza',
        Name: 'Numero Plaza',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 10,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Text
      },
    ]
},
reserva: {
  Code: 'reserva',
  Title: 'Reserva',
  Fields: [
    {
      Id: 1,
      Code: 'id_reserva',
      Name: 'ID Reserva',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 2,
      Code: 'letra_fila',
      Name: 'Letra Fila',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 3,
      Code: 'numero_plaza',
      Name: 'Número Plaza',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Number
    },
    {
      Id: 4,
      Code: 'fecha_reserva',
      Name: 'Fecha Reserva',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 10,
      Disabled: false,
      TypeField: FieldType.Date
    },
    {
      Id: 5,
      Code: 'estado',
      Name: 'Estado',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 50,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 6,
      Code: 'numero_vuelo',
      Name: 'Número Vuelo',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 50,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    }
  ]
},
telefono: {
  Code: 'telefono',
  Title: 'Teléfono',
  Fields: [
    {
      Id: 1,
      Code: 'numero_telefono',
      Name: 'Número Teléfono',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 15,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 2,
      Code: 'id_pasajero',
      Name: 'ID Pasajero',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Text
    }
  ]
},
vuelo: {
  Code: 'vuelo',
  Title: 'Vuelo',
  Fields: [
    {
      Id: 1,
      Code: 'numero_vuelo',
      Name: 'Número Vuelo',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 50,
      MinLength: 3,
      Disabled: false,
      TypeField: FieldType.Text
    },
    {
      Id: 2,
      Code: 'hora_salida',
      Name: 'Hora Salida',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 25,
      MinLength: 20,
      Disabled: false,
      TypeField: FieldType.DateTime
    },
    {
      Id: 3,
      Code: 'hora_llegada',
      Name: 'Hora Llegada',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 25,
      MinLength: 20,
      Disabled: false,
      TypeField: FieldType.DateTime
    },
    {
      Id: 4,
      Code: 'aeropuerto_origen',
      Name: 'Aeropuerto Origen',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Number
    },
    {
      Id: 5,
      Code: 'aeropuerto_destino',
      Name: 'Aeropuerto Destino',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Number
    },
    {
      Id: 6,
      Code: 'id_avion',
      Name: 'ID Avión',
      IsRequired: true,
      IsEditable: true,
      Hidden: false,
      MaxLength: 10,
      MinLength: 1,
      Disabled: false,
      TypeField: FieldType.Number
    }
  ]
},
opciones:{
  Code: 'opciones',
  Title: 'Opciones',
    Fields: [
      {
        Id: 1,
        Code: 'opcion',
        Name: 'Opcion',
        IsRequired: true,
        IsEditable: true,
        Hidden: false,
        MaxLength: 50,
        MinLength: 3,
        Disabled: false,
        TypeField: FieldType.Select,
        Options: [
          { value: 'aerolinea', label: 'aerolinea' },
          { value: 'aeropuerto', label: 'aeropuerto' },
          { value: 'avion', label: 'avion' },
          { value: 'ciudad', label: 'ciudad' },
          { value: 'correo_electronico', label: 'correo_electronico' },
          { value: 'pais', label: 'pais' },
          { value: 'pasajero', label: 'pasajero' },
          { value: 'plaza', label: 'plaza' },
          { value: 'reserva', label: 'reserva' },
          { value: 'telefono', label: 'telefono' },
          { value: 'vuelo', label: 'vuelo' }
        ]
      },
    ]
}
}
