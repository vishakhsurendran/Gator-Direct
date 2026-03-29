CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE buildings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  footprint GEOMETRY(Polygon, 4326),
  meta JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE floors (
  id SERIAL PRIMARY KEY,
  building_id INT REFERENCES buildings(id) ON DELETE CASCADE,
  level INT,
  floor_geom GEOMETRY(Polygon, 4326),
  meta JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE nav_nodes (
  id SERIAL PRIMARY KEY,
  building_id INT,
  floor_id INT,
  name TEXT,
  geom GEOMETRY(Point, 4326)
);

CREATE TABLE nav_edges (
  id SERIAL PRIMARY KEY,
  source INTEGER,
  target INTEGER,
  cost DOUBLE PRECISION,
  geom GEOMETRY(LineString, 4326)
);

CREATE INDEX idx_buildings_footprint ON buildings USING GIST(footprint);
CREATE INDEX idx_nav_nodes_geom ON nav_nodes USING GIST(geom);
CREATE INDEX idx_nav_edges_geom ON nav_edges USING GIST(geom);
