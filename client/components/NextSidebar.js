import React from 'react';
import { Link } from 'react-router-dom';

//Next Sidebar
/*
 * Has a link to navigate to next category
 *
*/

export default function NextSidebar ({nextCategory}) {
  return (
    <div id='nextSidebar'>
      <Link to={`/buildbox/${nextCategory}`}>
        <button id="nextBtn">Next</button>
      </Link>
    </div>
  );
}

