export interface Pasajero {
  id_pasajero:             number;
  primer_nombre:           string;
  segundo_nombre:          null;
  tercer_nombre:           null;
  primer_apellido:         string;
  segundo_apellido:        string;
  pasaporte:               string;
  codigo_pais:             string;
  codigo_ciudad:           string;
  codigo_ciudadNavigation: null;
  codigo_paisNavigation:   null;
  correo_electronicos:     any[];
  telefonos:               any[];
  id_reservas:             any[];
}
