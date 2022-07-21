import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <br></br>
        <Link to="/">MY TRAVELLING PLAN</Link>
        <ol>
          <li> <NavLink to="/create">Create Schedule</NavLink></li>
          <li><NavLink to="/view">View Schedule</NavLink></li>
        </ol>
      </div>
    </nav>
  );
}

export default Navbar;
