export interface Reserva {
  id_reserva:             number;
  letra_fila:             string;
  numero_plaza:           number;
  fecha_reserva:          Date;
  estado:                 string;
  numero_vuelo:           string;
  numero_vueloNavigation: null;
  plaza:                  null;
  id_pasajeros:           any[];
}
