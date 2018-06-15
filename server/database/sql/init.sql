CREATE USER gisProject SUPERUSER PASSWORD 'gisProject';
CREATE DATABASE gisProject;
GRANT ALL PRIVILEGES ON DATABASE gisProject TO gisProject;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;

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



CREATE TABLE grids(
    id bigserial,
    zoom integer,
    location Geography(Polygon,4326) not null,
    primary key (id)
);

CREATE TABLE weathers(
    id bigserial,
    location_id bigint REFERENCES grids (id) not null UNIQUE,
    data jsonb not null,
    primary key (id)
);


-- LEVEL 6 Country
INSERT INTO grids (location) SELECT (
  ST_Dump(
    makegrid_2d(
      ST_GeomFromText(
        'Polygon((14.040465652294529 54.12202348184371, 18.24822932416953 55.05144493105059, 24.02703791791953 54.58301858656643 , 24.27972346479453 50.329477603728535, 23.02728205854453 48.93491932736782, 18.89642268354453 49.208415884837294, 14.655700027294529 50.84563558240263, 13.886657058544529 52.86727749857611, 14.040465652294529 54.12202348184371))',
        4326
      ),
      50000, -- width step in meters
      50000  -- height step in meters
    )
  )
) .geom;

UPDATE grids SET zoom = 6 WHERE zoom IS NULL;

-- LEVEL 8 - County
INSERT INTO grids (location) SELECT (
  ST_Dump(
    makegrid_2d(
      ST_GeomFromText(
        'Polygon((14.040465652294529 54.12202348184371, 18.24822932416953 55.05144493105059, 24.02703791791953 54.58301858656643 , 24.27972346479453 50.329477603728535, 23.02728205854453 48.93491932736782, 18.89642268354453 49.208415884837294, 14.655700027294529 50.84563558240263, 13.886657058544529 52.86727749857611, 14.040465652294529 54.12202348184371))',
        4326
      ),
      30000, -- width step in meters
      30000  -- height step in meters
    )
  )
) .geom;

UPDATE grids SET zoom = 8 WHERE zoom IS NULL;

-- LEVEL 10 - CITIES
INSERT INTO grids (location) SELECT (
  ST_Dump(
    makegrid_2d(
      ST_GeomFromText(
        'Polygon((14.040465652294529 54.12202348184371, 18.24822932416953 55.05144493105059, 24.02703791791953 54.58301858656643 , 24.27972346479453 50.329477603728535, 23.02728205854453 48.93491932736782, 18.89642268354453 49.208415884837294, 14.655700027294529 50.84563558240263, 13.886657058544529 52.86727749857611, 14.040465652294529 54.12202348184371))',
        4326
      ),
      10000, -- width step in meters
      10000  -- height step in meters
    )
  )
) .geom;

UPDATE grids SET zoom = 10 WHERE zoom IS NULL;