DROP TABLE IF EXISTS rooms      CASCADE;
DROP TABLE IF EXISTS nav_edges  CASCADE;
DROP TABLE IF EXISTS nav_nodes  CASCADE;
DROP TABLE IF EXISTS floors     CASCADE;
DROP TABLE IF EXISTS buildings  CASCADE;

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE buildings (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  footprint GEOMETRY(Polygon, 4326),
  meta      JSONB DEFAULT '{}'::jsonb
);
CREATE TABLE floors (
  id          SERIAL PRIMARY KEY,
  building_id INT REFERENCES buildings(id) ON DELETE CASCADE,
  level       INT,
  floor_geom  GEOMETRY(Polygon, 4326),
  meta        JSONB DEFAULT '{}'::jsonb
);
CREATE TABLE nav_nodes (
  id          SERIAL PRIMARY KEY,
  building_id INT,
  floor_id    INT,
  name        TEXT,
  geom        GEOMETRY(Point, 4326)
);
CREATE TABLE nav_edges (
  id     SERIAL PRIMARY KEY,
  source INTEGER,
  target INTEGER,
  cost   DOUBLE PRECISION,
  geom   GEOMETRY(LineString, 4326)
);
CREATE TABLE rooms (
  id          SERIAL PRIMARY KEY,
  building_id INT   REFERENCES buildings(id) ON DELETE CASCADE,
  floor_id    INT   REFERENCES floors(id)    ON DELETE SET NULL,
  room_number TEXT  NOT NULL,
  name        TEXT,
  floor_level INT   DEFAULT 1,
  -- plan_x: 0.0 = west/entrance end  ·  1.0 = east/far end
  -- plan_y: 0.0 = north side of corridor  ·  1.0 = south side
  plan_x      FLOAT DEFAULT 0.5,
  plan_y      FLOAT DEFAULT 0.5,
  meta        JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_buildings_footprint ON buildings USING GIST(footprint);
CREATE INDEX idx_nav_nodes_geom      ON nav_nodes USING GIST(geom);
CREATE INDEX idx_nav_edges_geom      ON nav_edges USING GIST(geom);

-- Malachowsky Hall (building id = 1)
INSERT INTO buildings (name, footprint) VALUES (
  'Malachowsky Hall',
  ST_SetSRID(ST_GeomFromText(
    'POLYGON((-82.3482 29.6438,-82.3482 29.6445,-82.3472 29.6445,-82.3472 29.6438,-82.3482 29.6438))'
  ), 4326)
);

-- ROOMS — room_number must match the `num` fields in IndoorMap.js FLOOR_DEFS
-- Columns: building_id, room_number, name, floor_level, plan_x, plan_y
INSERT INTO rooms (building_id, room_number, name, floor_level, plan_x, plan_y) VALUES

  -- Level 1
  (1, '100', 'Lower Lobby',         1, 0.38, 0.68),
  (1, '101', 'Auditorium',          1, 0.16, 0.30),
  (1, '102', 'Elevator Lobby',      1, 0.48, 0.30),
  (1, '103', 'Conference Room',     1, 0.60, 0.15),
  (1, '104', 'Maker Space',         1, 0.70, 0.45),
  (1, '105', 'Bike Room',           1, 0.08, 0.84),
  (1, '108', 'Mechanical',          1, 0.89, 0.30),
  (1, '109', 'Loading Dock',        1, 0.64, 0.84),

  -- Level 2
  (1, '200', 'Upper Lobby',         2, 0.11, 0.45),
  (1, '201', 'Café',                2, 0.28, 0.72),
  (1, '202', 'East Lobby',          2, 0.42, 0.63),
  (1, '203', 'Open Office Suite',   2, 0.64, 0.42),
  (1, '204', 'Conference Room',     2, 0.87, 0.20),
  (1, '205', 'Maker Space',         2, 0.28, 0.22),
  (1, '206', 'Student Group HQ',    2, 0.20, 0.84),
  (1, '207', 'Departmental HQ',     2, 0.76, 0.84),

  -- Level 3
  (1, '300', 'Collaborative Spine', 3, 0.13, 0.45),
  (1, '301', 'Elevator Lobby',      3, 0.32, 0.45),
  (1, '302', 'Faculty Office',      3, 0.46, 0.30),
  (1, '303', 'Open Office Suite',   3, 0.65, 0.30),
  (1, '304', 'Ed Tech Studio',      3, 0.84, 0.16),
  (1, '305', 'Conference Room',     3, 0.84, 0.44),
  (1, '306', 'Faculty Office',      3, 0.10, 0.82),
  (1, '307', 'Faculty Office',      3, 0.30, 0.82),
  (1, '308', 'Open Office Suite',   3, 0.52, 0.82),
  (1, '309', 'Launchpad',           3, 0.74, 0.82),
  (1, '310', 'Maker Space',         3, 0.91, 0.82),

  -- Level 4
  (1, '400', 'Collaborative Spine', 4, 0.13, 0.45),
  (1, '401', 'Elevator Lobby',      4, 0.32, 0.45),
  (1, '402', 'Faculty Office',      4, 0.46, 0.30),
  (1, '403', 'Open Office Suite',   4, 0.65, 0.30),
  (1, '404', 'Conference Room',     4, 0.84, 0.16),
  (1, '405', 'Maker Space',         4, 0.84, 0.44),
  (1, '406', 'Faculty Office',      4, 0.10, 0.82),
  (1, '407', 'Faculty Office',      4, 0.30, 0.82),
  (1, '408', 'Open Office Suite',   4, 0.52, 0.82),
  (1, '409', 'Break Room',          4, 0.74, 0.82),
  (1, '410', 'Departmental HQ',     4, 0.91, 0.82),

  -- Level 5
  (1, '500', 'Collaborative Spine', 5, 0.13, 0.45),
  (1, '501', 'Elevator Lobby',      5, 0.32, 0.45),
  (1, '502', 'Faculty Office',      5, 0.46, 0.30),
  (1, '503', 'Open Office Suite',   5, 0.65, 0.30),
  (1, '504', 'Conference Room',     5, 0.84, 0.16),
  (1, '505', 'Maker Space',         5, 0.84, 0.44),
  (1, '506', 'Faculty Office',      5, 0.10, 0.82),
  (1, '507', 'Faculty Office',      5, 0.30, 0.82),
  (1, '508', 'Open Office Suite',   5, 0.52, 0.82),
  (1, '509', 'Break Room / Lounge', 5, 0.74, 0.82),
  (1, '510', 'Departmental HQ',     5, 0.91, 0.82),

  -- Level 6
  (1, '600', 'Collaborative Spine', 6, 0.13, 0.45),
  (1, '601', 'Elevator Lobby',      6, 0.32, 0.45),
  (1, '602', 'Faculty Office',      6, 0.46, 0.30),
  (1, '603', 'Open Office Suite',   6, 0.65, 0.30),
  (1, '604', 'Conference Room',     6, 0.84, 0.16),
  (1, '605', 'Maker Space',         6, 0.84, 0.44),
  (1, '606', 'Faculty Office',      6, 0.10, 0.82),
  (1, '607', 'Faculty Office',      6, 0.30, 0.82),
  (1, '608', 'Open Office Suite',   6, 0.52, 0.82),
  (1, '609', 'Break Room',          6, 0.74, 0.82),
  (1, '610', 'Departmental HQ',     6, 0.91, 0.82),

  -- Level 7
  (1, '700', 'Collaborative Spine', 7, 0.13, 0.45),
  (1, '701', 'Elevator Lobby',      7, 0.32, 0.45),
  (1, '702', 'Faculty Office',      7, 0.46, 0.30),
  (1, '703', 'Open Office Suite',   7, 0.65, 0.30),
  (1, '704', 'Conference Room',     7, 0.84, 0.16),
  (1, '705', 'Multipurpose Forum',  7, 0.84, 0.44),
  (1, '706', 'Faculty Office',      7, 0.10, 0.82),
  (1, '707', 'Faculty Office',      7, 0.30, 0.82),
  (1, '708', 'Open Office Suite',   7, 0.52, 0.82),
  (1, '709', 'Breakroom / Commons', 7, 0.74, 0.82),
  (1, '710', 'Departmental HQ',     7, 0.91, 0.82);
   