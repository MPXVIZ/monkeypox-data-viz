import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h1>
                MonkeyPox Progression Map
            </h1>
            <div id="links">

            <ul>
                
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/sources"><li>Sources</li></Link>
            </ul>
            </div>
        </nav>
    );
}
export default Navbar;