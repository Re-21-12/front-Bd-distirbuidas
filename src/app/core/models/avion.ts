export interface Avion {
  id_avion:               number;
  matricula:              string;
  modelo:                 string;
  capacidad_total:        number;
  id_aerolinea:           string;
  id_aerolineaNavigation: null;
  vuelos:                 any[];
}
