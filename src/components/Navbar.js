import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div>
                <h1>The Only Fans</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/routines">Routines</Link>
                </nav>
            </div>
        </div>
    )
};


export default Navbar;