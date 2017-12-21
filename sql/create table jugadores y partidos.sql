CREATE TABLE jugadores (
  id int(11) AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(50) DEFAULT NULL ,
  apellidos VARCHAR(50) DEFAULT NULL,
  correo VARCHAR(50) DEFAULT NULL,
  nivel FLOAT DEFAULT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE jugadores CHANGE COLUMN apellidos contrasena VARCHAR(50) DEFAULT NULL;

CREATE TABLE partidos (
  id int(11) AUTO_INCREMENT NOT NULL,
  fkIdJugador1 int(11) DEFAULT NULL,
  fkIdJugador2 int(11) DEFAULT NULL,
  fkIdJugador3 int(11) DEFAULT NULL,
  fkIdJugador4 int(11) DEFAULT NULL,
  lugar VARCHAR(100) DEFAULT NULL,
  hora TIME DEFAULT NULL,
  fecha DATE DEFAULT NULL,
  nivel FLOAT DEFAULT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE partidos ADD CONSTRAINT `partidos_jugador1` FOREIGN KEY  (`fkIdJugador1`) REFERENCES jugadores(`id`) on UPDATE CASCADE ;
ALTER TABLE partidos ADD CONSTRAINT `partidos_jugador2` FOREIGN KEY  (`fkIdJugador2`) REFERENCES jugadores(`id`) on UPDATE CASCADE ;
ALTER TABLE partidos ADD CONSTRAINT `partidos_jugador3` FOREIGN KEY  (`fkIdJugador3`) REFERENCES jugadores(`id`) on UPDATE CASCADE ;
ALTER TABLE partidos ADD CONSTRAINT `partidos_jugador4` FOREIGN KEY  (`fkIdJugador4`) REFERENCES jugadores(`id`) on UPDATE CASCADE ;