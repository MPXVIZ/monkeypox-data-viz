import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <h1>
                MonkeyPox Progression Map
            </h1>
            <ul>
                
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <li>Sources</li>
            </ul>
        </nav>
    );
}
export default Navbar;