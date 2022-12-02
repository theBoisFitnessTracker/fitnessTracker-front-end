import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div>
                <h1>The Only Fans</h1>
                <nav>
                    <Link to="/">   Home   </Link>
                    <Link to="Login">   Login   </Link>
                    <Link to="Profile">   Profile   </Link>
                    <Link to="Fans">   Marketplace   </Link>
                </nav>
            </div>
        </div>
    )
};


export default Navbar;