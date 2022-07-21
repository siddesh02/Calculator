import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ViewItems from "./components/ViewItems"
import CreateItems from "./components/CreateItems"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/create" element={<CreateItems />} />
          <Route exact path="/view" element={< ViewItems/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
