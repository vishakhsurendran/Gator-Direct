import './App.css';
import React, { useState } from 'react';
import search_icon from './search_icon.svg';

function App() {
  const [text, setText]=useState("Search...");
    const [isHidden, setIsHidden] = useState(false)

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
    setIsHidden(false);
  }

  function closePopup(){
    setIsHidden(true)
  }
  
  return (
    <div className="App">
      <div>

        {/* Temporary button to open popup. */}
        <button onClick={openPopup} style={{position : 'fixed', zIndex : 10, marginLeft : 100}}>
          Open popup
        </button>

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
          map here
        </div>

        {/* empty pop up */}
        <div id="pop-up" style={{ display: isHidden ? 'none' : 'block' }}>
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
