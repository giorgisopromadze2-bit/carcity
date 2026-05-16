import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Header = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Listings", path: "/listings" },
        { label: "Favorites", path: "/favorites" }
    ];

    return ( 
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="logo">
                    <img src="/car.png" alt="car" className="logo-img" />
                    <span className="logo-text">
                        Car <span className="logo-accent">City</span>
                    </span>
                </Link>
                <nav className="nav">
                    {navLinks.map((link) =>(
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="header-right">
                    <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
                        <img src={darkMode? "/sun.png" : "/moon.png"} alt="theme" className="icon-img" />
                    </button>
                    <button className="icon-btn" onClick={() => navigate('/favorites')}>
                        <img src={darkMode? "/white-heart.png" : "/black-heart.png"}  alt="heart" className="icon-img" />
                    </button>
                    <Link to="/add" className="btn-sell">
                        <span className="btn-sell-plus">+</span>Sell Car
                    </Link>
                </div>
            </div>
        </header>
     );
}
 
export default Header;