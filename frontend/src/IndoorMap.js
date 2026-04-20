import React from 'react';
import floor1 from "./floor_photos/1.png"
import floor2 from "./floor_photos/2.png"
import floor3 from "./floor_photos/3.png"
import floor4 from "./floor_photos/4.png"
import floor5 from "./floor_photos/5.png"
import floor6 from "./floor_photos/6.png"
import floor7 from "./floor_photos/7.png"

// Color palettes for zones
const C = {
  lecture : { bg: '#bbdefb', bd: '#1565c0', tx: '#0d47a1' },
  lobby   : { bg: '#e8eaf6', bd: '#5c6bc0', tx: '#283593' },
  office  : { bg: '#c8e6c9', bd: '#388e3c', tx: '#1b5e20' },
  maker   : { bg: '#f8bbd0', bd: '#880e4f', tx: '#880e4f' },
  social  : { bg: '#fff9c4', bd: '#f9a825', tx: '#e65100' },
  utility : { bg: '#f5f5f5', bd: '#9e9e9e', tx: '#616161' },
  collab  : { bg: '#b2ebf2', bd: '#00838f', tx: '#004d40' },
  lab     : { bg: '#e1bee7', bd: '#6a1b9a', tx: '#4a148c' },
};
const DEST = { bg: '#c8e6c9', bd: '#2e7d32', tx: '#1b5e20' };

const W = 700, H = 210;

// Each room: { num, label, x, y, w, h, type }
function makeUpperFloor(floor) {
  const rn = n => `${floor}${String(n).padStart(2, '0')}`;
  const isL3 = floor === 3;
  const isL7 = floor === 7;

  return {
    cY: 110, cH: 24,
    rooms: [
      // above corridor
      { num: rn(0),  label: 'Collaborative Spine', x:   4, y:   4, w: 183, h: 106, type: 'collab'  },
      { num: rn(1),  label: 'Elev. Lobby',          x: 187, y:  28, w:  70, h:  82, type: 'lobby'   },
      { num: rn(2),  label: 'Faculty Office',        x: 257, y:   4, w: 110, h: 106, type: 'office'  },
      { num: rn(3),  label: 'Open Office Suite',     x: 367, y:   4, w: 175, h: 106, type: 'office'  },
      // top-right slot 1
      { num: rn(4),  label: isL3 ? 'Ed Tech Studio' : 'Conference Room',
                     x: 542, y:   4, w: 154, h:  53,
                     type: isL3 ? 'lab' : 'office' },
      // top-right slot 2
      { num: rn(5),  label: isL7 ? 'Multipurpose Forum' : 'Maker Space',
                     x: 542, y:  57, w: 154, h:  53,
                     type: isL7 ? 'lecture' : 'maker' },
      // below corridor
      { num: rn(6),  label: 'Faculty Office',        x:   4, y: 134, w: 135, h:  72, type: 'office'  },
      { num: rn(7),  label: 'Faculty Office',        x: 139, y: 134, w: 135, h:  72, type: 'office'  },
      { num: rn(8),  label: 'Open Office Suite',     x: 274, y: 134, w: 175, h:  72, type: 'office'  },
      { num: rn(9),  label: isL3 ? 'Launchpad'
                           : isL7 ? 'Breakroom / Commons'
                           : 'Break Room',
                     x: 449, y: 134, w: 130, h:  72,
                     type: isL3 ? 'collab' : 'social' },
      { num: rn(10), label: isL3 ? 'Maker Space' : 'Departmental HQ',
                     x: 579, y: 134, w: 117, h:  72,
                     type: isL3 ? 'maker' : 'office' },
    ],
  };
}

const FLOOR_DEFS = {
  // Level 1
  1: {
    cY: 128, cH: 24,
    rooms: [
      { num: '101', label: 'Auditorium',     x:   4, y:   4, w: 220, h: 124, type: 'lecture'  },
      { num: '100', label: 'Lower Lobby',    x: 224, y:  50, w:  80, h:  78, type: 'lobby'    },
      { num: '102', label: 'Elev. Lobby',    x: 304, y:   4, w:  70, h: 124, type: 'lobby'    },
      { num: '103', label: 'Conference',     x: 374, y:   4, w: 100, h:  62, type: 'office'   },
      { num: '104', label: 'Maker Space',    x: 374, y:  66, w: 195, h:  62, type: 'maker'    },
      { num: '108', label: 'Mechanical',     x: 574, y:   4, w: 122, h: 124, type: 'utility'  },
      // below corridor
      { num: '105', label: 'Bike Room',      x:   4, y: 152, w: 110, h:  54, type: 'utility'  },
      { num: '104', label: 'Maker Space',    x: 114, y: 152, w: 255, h:  54, type: 'maker'    },
      { num: '109', label: 'Loading Dock',   x: 369, y: 152, w: 125, h:  54, type: 'utility'  },
      { num: '104', label: 'Maker Space',    x: 494, y: 152, w: 202, h:  54, type: 'maker'    },
    ],
  },
  // Level 2
  2: {
    cY: 118, cH: 24,
    rooms: [
      { num: '200', label: 'Upper Lobby',       x:   4, y:   4, w: 155, h: 114, type: 'lobby'   },
      { num: '205', label: 'Maker Space',        x: 159, y:   4, w: 130, h:  56, type: 'maker'   },
      { num: '201', label: 'Café',               x: 159, y:  60, w:  78, h:  58, type: 'social'  },
      { num: '202', label: 'East Lobby',         x: 237, y:  35, w:  80, h:  83, type: 'lobby'   },
      { num: '203', label: 'Open Office Suite',  x: 317, y:   4, w: 252, h: 114, type: 'office'  },
      { num: '204', label: 'Conference',         x: 569, y:   4, w: 127, h:  57, type: 'office'  },
      { num: '207', label: 'Departmental HQ',    x: 569, y:  61, w: 127, h:  57, type: 'office'  },
      // below corridor
      { num: '206', label: 'Student Group HQ',   x:   4, y: 142, w: 200, h:  64, type: 'social'  },
      { num: '205', label: 'Maker Space',         x: 204, y: 142, w: 165, h:  64, type: 'maker'   },
      { num: '207', label: 'Departmental HQ',     x: 369, y: 142, w: 327, h:  64, type: 'office'  },
    ],
  },
};

// Build levels 3–7 using template
for (let f = 3; f <= 7; f++) FLOOR_DEFS[f] = makeUpperFloor(f);

function IndoorMap({ rooms, destinationRoomId, floorLevel }) {
  const destRoom   = rooms.find(r => r.id === destinationRoomId);
  const destNum    = destRoom?.room_number ?? null;
  const floorDef   = FLOOR_DEFS[floorLevel];

  if (!floorDef) {
    return (
      <div id="indoor_map">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
          <rect width={W} height={H} fill="#f5f5f5" rx={4} />
          <text x={W / 2} y={H / 2} textAnchor="middle" fill="#aaa" fontSize={13}>
            Floor plan unavailable for Level {floorLevel}
          </text>
        </svg>
      </div>
    );
  }

  const { cY, cH, rooms: zones } = floorDef;

  if(floorLevel === 1){
    return(
      <div id="indoor_map">
        <img src={floor1} style={{width:"100%"}}></img>
      </div>
    );
  }

    if(floorLevel === 2){
    return(
      <div id="indoor_map">
        <img src={floor2} style={{width:"100%"}}></img>
      </div>
    );
  }

  if(floorLevel === 3){
    return(
      <div id="indoor_map">
        <img src={floor3} style={{width:"100%"}}></img>
      </div>
    );
  }

    if(floorLevel === 4){
    return(
      <div id="indoor_map">
        <img src={floor4} style={{width:"100%"}}></img>
      </div>
    );
  }

    if(floorLevel === 5){
    return(
      <div id="indoor_map">
        <img src={floor5} style={{width:"100%"}}></img>
      </div>
    );
  }

    if(floorLevel === 6){
    return(
      <div id="indoor_map">
        <img src={floor6} style={{width:"100%"}}></img>
      </div>
    );
  }

    if(floorLevel === 7){
    return(
      <div id="indoor_map">
        <img src={floor7} style={{width:"100%"}}></img>
      </div>
    );
  }

  return (
    <div id="indoor_map">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
           aria-label={`Level ${floorLevel} floor plan`}>

        {/* Building shell */}
        <rect x={1} y={1} width={W - 2} height={H - 2}
              fill="#fafafa" stroke="#444" strokeWidth={3} rx={3} />

        {/* Primary corridor */}
        <rect x={1} y={cY} width={W - 2} height={cH}
              fill="#e0e0e0" stroke="#aaa" strokeWidth={1} />
        <text x={W / 2} y={cY + cH / 2 + 4}
              textAnchor="middle" fontSize={9} fill="#888" fontStyle="italic">
          Primary Corridor
        </text>
        <text x={18} y={cY + cH / 2 + 4} fontSize={9} fill="#aaa">← Entrance</text>

        {/* Level label */}
        <text x={W - 8} y={16} textAnchor="end" fontSize={11} fill="#ccc" fontStyle="italic">
          Level {floorLevel}
        </text>

        {/* Stairwell indicators */}
        {[{ x: floorLevel === 1 ? 224 : 187, y: 4, w: 22, h: 22 }].map((s, i) => (
          <g key={`stair-${i}`}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h}
                  fill="#e8e8e8" stroke="#999" strokeWidth={1} />
            <line x1={s.x} y1={s.y + s.h} x2={s.x + s.w} y2={s.y}
                  stroke="#999" strokeWidth={1} />
          </g>
        ))}

        {/* Zones */}
        {zones.map((zone, i) => {
          const isDest = zone.num === destNum;
          const col    = isDest ? DEST : (C[zone.type] || C.utility);
          const cx     = zone.x + zone.w / 2;
          const cy     = zone.y + zone.h / 2;
          // Scale font to room width
          const fs     = zone.w < 70 ? 7 : zone.w < 110 ? 8.5 : zone.w < 160 ? 9.5 : 10.5;
          const hasNum = zone.h >= 46;

          return (
            <g key={`zone-${i}`}>
              <rect
                x={zone.x} y={zone.y} width={zone.w} height={zone.h}
                fill={col.bg}
                stroke={isDest ? '#2e7d32' : col.bd}
                strokeWidth={isDest ? 2.5 : 1}
                rx={3}
              />
              <text
                x={cx} y={hasNum ? cy - 7 : cy}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={fs}
                fontWeight={isDest ? '700' : '500'}
                fill={isDest ? '#1b5e20' : col.tx}
              >
                {zone.label}
              </text>
              {hasNum && (
                <text x={cx} y={cy + 8}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={7.5} fill={isDest ? '#2e7d32' : '#aaa'}>
                  #{zone.num}
                </text>
              )}
              {isDest && (
                <text x={cx} y={zone.y - 5} textAnchor="middle" fontSize={15}>
                  📍
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default IndoorMap;
