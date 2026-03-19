import './App.css';
import React, { useState } from 'react';
import search_icon from './search_icon.svg';

function App() {
  const [text, setText]=useState("Search...");

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

  return (
    <div className="App">
      <div>
        <form id="search" onSubmit={handleSubmit}>
          <button id ="search_button">
              <img src={search_icon} style={{ width: "100%", height:"100%"}} alt="Search icon" />
            </button>
            <label>
              <input id ="search_bar" type="text" value={text} onChange={handleChange} onClick={setEmpty}></input>
            </label>
        </form>
        <div id="background"> 
          put map here
        </div>
      </div>
    </div>
  );
}

export default App;
