CREATE TABLE resultados(
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  fkIdPartido int(11) DEFAULT NULL,
  puntosEquipo1Set1 int(2) DEFAULT NULL,
  puntosEquipo1Set2 int(2) DEFAULT NULL,
  puntosEquipo1Set3 int(2) DEFAULT NULL,
  puntosEquipo2Set1 int(2) DEFAULT NULL,
  puntosEquipo2Set2 int(2) DEFAULT NULL,
  puntosEquipo2Set3 int(2) DEFAULT NULL
);

ALTER TABLE resultados ADD CONSTRAINT resultados_fkIdPartido FOREIGN KEY resultados_fkIdPartido(fkIdPartido) REFERENCES partidos(id);