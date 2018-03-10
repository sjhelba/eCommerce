import React from 'react';
import { Link } from 'react-router-dom';

//Previous Sidebar
/*
 * Has a link to navigate to previous category
 *
*/

export default function PrevSidebar ({prevCategory}) {
  return (
    <div id='prevSidebar'>
      <Link to={`/buildbox/${prevCategory}`}>
        <button id="prevBtn">Previous</button>
      </Link>
    </div>
  );
}
