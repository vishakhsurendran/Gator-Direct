import './App.css';
import React, { useState } from 'react';
import search_icon from './search_icon.svg';
import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';

function App() {
  const [text, setText]=useState("Search...");
    const [isOpen, setIsOpen] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    console.log("location entered: " + text);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function setEmpty(e) {
    if(text === "Search..."){
      setText("");
    }
  }

  function openPopup(){
    setIsOpen(true);
  }

  function closePopup(){
    setIsOpen(false)
  }

  function onMapClick(e){
    console.log("Latitude: " + e.detail.latLng.lat + " longitude: " + e.detail.latLng.lng)
  }

  return (
    <div className="App">
      <div>

        {/* Search bar and button. Text entry is stored in text variable */}
        <form id="search" onSubmit={handleSubmit}>
          <button id ="search_button">
              <img src={search_icon} style={{ width: "100%", height:"100%"}} alt="Search icon" />
            </button>
            <label>
              <input id ="search_bar" type="text" value={text} onChange={handleChange} onClick={setEmpty}></input>
            </label>
        </form>

        {/* div where you would put the map? */}
        <div id="background">
          <APIProvider apiKey={'AIzaSyC8QHz5ffDQbmWplTjAJd71h07YukB4JRI'} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={20}
                defaultCenter={ { lat: 29.644274160235955, lng: -82.34719287634364} }
                mapId = "map"
                onClick = {onMapClick}
                >
                {/* marker over malachowsky hall */} 
                <AdvancedMarker 
                  position={{lat: 29.644, lng: -82.34772}} 
                  onClick = {openPopup}
                  />
            </Map>
          </APIProvider>
        </div>

        {/* empty pop up */}
        <div id="pop-up" style={{ display: isOpen ? 'block' : 'none' }}>
            <button onClick={closePopup} id="closePopupButton">
              X
            </button>
            Popup contents
        </div>

      </div>
    </div>
  );
}

export default App;
