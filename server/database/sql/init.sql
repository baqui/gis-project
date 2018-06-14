CREATE USER gisProject SUPERUSER PASSWORD 'gisProject';
CREATE DATABASE gisProject;
GRANT ALL PRIVILEGES ON DATABASE gisProject TO gisProject;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;

CREATE TABLE temperatures(
    id bigserial,
    temp numeric,
    zoom integer,
    location Geography(Polygon,4326) not null,
    primary key (id)
);

CREATE TABLE grids(
    id bigserial,
    zoom integer,
    location Geography(Polygon,4326) not null,
    primary key (id)
);

CREATE TABLE weathers(
    id bigserial,
    location_id bigint REFERENCES grids (id) not null,
    data jsonb not null,
    primary key (id)
);



INSERT INTO temperatures (temp, zoom, location)
VALUES ( 25.50, 9, ST_GeomFromText('POLYGON((18.578559458255768 54.3847561202123, 18.582679331302643 54.38855462060335, 18.57426792383194 54.391053442287, 18.578559458255768 54.3847561202123))', 4326) ),
( 15.80, 9, ST_GeomFromText('POLYGON((17.670696 54.341566, 19.450482 53.981348, 17.857464 53.546242, 17.670696 54.341566))', 4326) ),
( 30.10, 9, ST_GeomFromText('POLYGON((19.395550 53.702619, 21.351116 52.775581, 18.637493 52.274269, 19.395550 53.702619))', 4326) );

CREATE OR REPLACE FUNCTION public.makegrid_2d (
  bound_polygon public.geometry,
  width_step integer,
  height_step integer
)
RETURNS public.geometry AS
$body$
DECLARE
  Xmin DOUBLE PRECISION;
  Xmax DOUBLE PRECISION;
  Ymax DOUBLE PRECISION;
  X DOUBLE PRECISION;
  Y DOUBLE PRECISION;
  NextX DOUBLE PRECISION;
  NextY DOUBLE PRECISION;
  CPoint public.geometry;
  sectors public.geometry[];
  i INTEGER;
  SRID INTEGER;
BEGIN
  Xmin := ST_XMin(bound_polygon);
  Xmax := ST_XMax(bound_polygon);
  Ymax := ST_YMax(bound_polygon);
  SRID := ST_SRID(bound_polygon);

  Y := ST_YMin(bound_polygon); --current sector's corner coordinate
  i := -1;
  <<yloop>>
  LOOP
    IF (Y > Ymax) THEN  
        EXIT;
    END IF;

    X := Xmin;
    <<xloop>>
    LOOP
      IF (X > Xmax) THEN
          EXIT;
      END IF;

      CPoint := ST_SetSRID(ST_MakePoint(X, Y), SRID);
      NextX := ST_X(ST_Project(CPoint, $2, radians(90))::geometry);
      NextY := ST_Y(ST_Project(CPoint, $3, radians(0))::geometry);

      i := i + 1;
      sectors[i] := ST_MakeEnvelope(X, Y, NextX, NextY, SRID);

      X := NextX;
    END LOOP xloop;
    CPoint := ST_SetSRID(ST_MakePoint(X, Y), SRID);
    NextY := ST_Y(ST_Project(CPoint, $3, radians(0))::geometry);
    Y := NextY;
  END LOOP yloop;

  RETURN ST_Collect(sectors);
END;
$body$
LANGUAGE 'plpgsql';