import { TableTemplateModel } from "./table-template";

export type TTableList = {
  [key: string]: TableTemplateModel;
};

export const table_list: TTableList = {
  avion: {
    title: 'Avion',
    columns: ['id_avion', 'modelo', 'matricula', 'capacidad_total', 'id_aerolinea'],
    responseAcces: 'avion'
  },
  aeropuerto: {
    title: 'Aeropuerto',
    columns: ['nombre', 'id_aeropuerto', 'codigo_pais', 'codigo_ciudad'],
    responseAcces: 'aeropuerto'
  },
  ciudad: {
    title: 'Ciudad',
    columns: ['nombre_ciudad', 'codigo_ciudad', 'codigo_pais'],
    responseAcces: 'ciudad'
  },
  correo_electronico: {
    title: 'Correo Electronico',
    columns: ['correo', 'id_pasajero'],
    responseAcces: 'correo_electronico'
  },
  pais: {
    title: 'Pais',
    columns: ['nombre_pais', 'codigo_pais'],
    responseAcces: 'pais'
  },
  pasajero: {
    title: 'Pasajero',
    columns: [
      'primer_nombre', 'segundo_nombre', 'tercer_nombre',
      'primer_apellido', 'segundo_apellido', 'id_pasajero',
      'pasaporte', 'codigo_pais', 'codigo_ciudad'
    ],
    responseAcces: 'pasajero'
  },
  plaza: {
    title: 'Plaza',
    columns: ['letra_fila', 'numero_plaza'],
    responseAcces: 'plaza'
  },
  reserva: {
    title: 'Reserva',
    columns: [
      'id_reserva', 'letra_fila', 'numero_plaza',
      'fecha_reserva', 'estado', 'numero_vuelo'
    ],
    responseAcces: 'reserva'
  },
  telefono: {
    title: 'Telefono',
    columns: ['numero_telefono', 'id_pasajero'],
    responseAcces: 'telefono'
  },
  vuelo: {
    title: 'Vuelo',
    columns: [
      'numero_vuelo', 'hora_salida', 'hora_llegada',
      'aeropuerto_origen', 'aeropuerto_destino', 'id_avion'
    ],
    responseAcces: 'vuelo'
  }
};
