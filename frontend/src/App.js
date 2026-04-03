import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import searchIcon from './search_icon.svg';
import IndoorMap from './IndoorMap';
import { UF_BUILDINGS } from './ufBuildings';

const API_BASE  = 'http://localhost:4000';
const MAPS_KEY  = 'AIzaSyC8QHz5ffDQbmWplTjAJd71h07YukB4JRI';
const UF_CENTER = { lat: 29.6436, lng: -82.3549 };

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (map && center) { map.panTo(center); map.setZoom(18); }
  }, [map, center]);
  return null;
}

function BuildingSearch({ onBuildingSelect }) {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const inputRef  = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(UF_BUILDINGS.filter(b => b.name.toLowerCase().includes(q)).slice(0, 8));
  }, [query]);

  useEffect(() => {
    function handler(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setResults([]);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function select(building) {
    onBuildingSelect(building);
    setQuery('');
    setResults([]);
  }

  return (
    <div id="search_wrapper" ref={wrapperRef}>
      <button
        id="search_button"
        type="button"
        aria-label="Search"
        onClick={() => inputRef.current?.focus()}
      >
        <img src={searchIcon} style={{ width: '100%', height: '100%' }} alt="" />
      </button>
      <input
        ref={inputRef}
        id="search_bar"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search campus buildings…"
        autoComplete="off"
      />
      {results.length > 0 && (
        <div id="search_results">
          {results.map((b, i) => (
            <div key={i} className="search_result" onMouseDown={() => select(b)}>
              <span className="result_name">{b.name}</span>
              {b.dbId && <span className="result_badge">Indoor nav available</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mapCenter,        setMapCenter]        = useState(null);
  const [isOpen,           setIsOpen]           = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildingRooms,    setBuildingRooms]    = useState([]);
  const [selectedRoom,     setSelectedRoom]     = useState(null);
  const [indoorRoute,      setIndoorRoute]      = useState(null);
  const [currentFloor,     setCurrentFloor]     = useState(1);
  const [loadingRoute,     setLoadingRoute]     = useState(false);

  /* Pop-up for building that has indoor data */
  function openBuilding(buildingId, buildingName) {
    const bData = UF_BUILDINGS.find(b => b.dbId === buildingId) || {};
    setSelectedBuilding({ id: buildingId, name: buildingName, lat: bData.lat, lng: bData.lng });
    setSelectedRoom(null);
    setIndoorRoute(null);
    setCurrentFloor(1);
    setBuildingRooms([]);
    setIsOpen(true);

    fetch(`${API_BASE}/rooms?building_id=${buildingId}`)
      .then(r => r.json())
      .then(data => setBuildingRooms(Array.isArray(data) ? data : []))
      .catch(err => console.error('Rooms fetch error:', err));
  }

  /* For buildings with no data */
  function openGenericBuilding(name, lat, lng) {
    setSelectedBuilding({ id: null, name, lat, lng });
    setBuildingRooms([]);
    setSelectedRoom(null);
    setIndoorRoute(null);
    setIsOpen(true);
  }

  const handleBuildingSelect = useCallback((building) => {
    setMapCenter({ lat: building.lat, lng: building.lng });
    if (building.dbId) {
      openBuilding(building.dbId, building.name);
    } else {
      openGenericBuilding(building.name, building.lat, building.lng);
    }
  }, []);

  function navigateToRoom(room) {
    setSelectedRoom(room);
    setCurrentFloor(room.floor_level);
    setLoadingRoute(true);

    fetch(`${API_BASE}/routing/indoor`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ building_id: room.building_id, room_id: room.id }),
    })
      .then(r => r.json())
      .then(data => { setIndoorRoute(data); setLoadingRoute(false); })
      .catch(err => { console.error('Routing error:', err); setLoadingRoute(false); });
  }

  /* Google Maps walking directions */
  function openWalkingDirections() {
    const { lat, lng } = selectedBuilding;
    if (!lat || !lng) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}&travelmode=walking`,
            '_blank', 'noopener,noreferrer'
          );
        },
        () => window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`,
          '_blank', 'noopener,noreferrer'
        )
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`,
        '_blank', 'noopener,noreferrer'
      );
    }
  }

  function closePopup() {
    setIsOpen(false);
    setSelectedRoom(null);
    setIndoorRoute(null);
  }

  const floors = [...new Set(buildingRooms.map(r => r.floor_level))].sort((a, b) => a - b);

  return (
    <div className="App">
      {/* Building search */}
      <div id="search">
        <BuildingSearch onBuildingSelect={handleBuildingSelect} />
      </div>

      <APIProvider apiKey={MAPS_KEY} onLoad={() => console.log('Maps API loaded')}>
        <div id="background">
          <Map defaultZoom={18} defaultCenter={UF_CENTER} mapId="map">
            <MapController center={mapCenter} />
            <AdvancedMarker
              position={{ lat: 29.644, lng: -82.34772 }}
              title="Malachowsky Hall"
              onClick={() => openBuilding(1, 'Malachowsky Hall')}
            />
          </Map>
        </div>
      </APIProvider>

      {isOpen && (
        <div id="pop-up">
          <button onClick={closePopup} id="closePopupButton" aria-label="Close">✕</button>
          <h2 id="popup_title">{selectedBuilding?.name}</h2>

          {/* Walking directions button */}
          {selectedBuilding?.lat && (
            <button id="directions_btn" onClick={openWalkingDirections}>
              Get Walking Directions
            </button>
          )}

          {selectedBuilding?.id ? (
            /* ── Building with indoor data ── */
            <>
              <div id="room_selector">
                <label htmlFor="room_select">Navigate to room:</label>
                <select
                  id="room_select"
                  value={selectedRoom?.id ?? ''}
                  onChange={e => {
                    const room = buildingRooms.find(r => r.id === parseInt(e.target.value));
                    if (room) navigateToRoom(room);
                  }}
                >
                  <option value="">— select a room —</option>
                  {buildingRooms.map(room => (
                    <option key={room.id} value={room.id}>
                      L{room.floor_level} · {room.room_number} — {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {floors.length > 1 && (
                <div id="floor_tabs">
                  {floors.map(f => (
                    <button
                      key={f}
                      className={`floor_btn${currentFloor === f ? ' active' : ''}`}
                      onClick={() => setCurrentFloor(f)}
                    >
                      Level {f}
                    </button>
                  ))}
                </div>
              )}

              <IndoorMap
                rooms={buildingRooms}
                destinationRoomId={selectedRoom?.id}
                floorLevel={currentFloor}
              />

              {loadingRoute && <p className="route_loading">Calculating route…</p>}

              {indoorRoute && !loadingRoute && (
                <div id="nav_steps">
                  <h3>
                    Directions → {selectedRoom?.room_number}: {selectedRoom?.name}
                  </h3>
                  <ol>
                    {indoorRoute.steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              )}

              {!selectedRoom && (
                <p className="hint">Select a room above to see indoor directions.</p>
              )}
            </>
          ) : (
            /* ── Building without indoor data ── */
            <div id="generic_info">
              <p>No indoor navigation data is available for this building yet.</p>
              <p className="hint">Only buildings with mapped floor plans support room-level navigation.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
