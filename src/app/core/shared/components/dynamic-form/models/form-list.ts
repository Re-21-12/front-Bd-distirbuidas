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
      TypeField: FieldType.Number
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
        TypeField: FieldType.Number
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
}
}
