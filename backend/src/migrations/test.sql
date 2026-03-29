INSERT INTO buildings (name, footprint)
VALUES ('Test Hall', ST_SetSRID(ST_GeomFromText('POLYGON((-73.961 40.807, -73.961 40.808, -73.960 40.808, -73.960 40.807, -73.961 40.807))'),4326));
