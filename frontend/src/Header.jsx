import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const Header = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef(null);

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Listings", path: "/listings" },
        { label: "Favorites", path: "/favorites" }
    ];

    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target))
                setDropOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initials = user?.name
        ? user.name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : "?";

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
                    <button className="icon-btn" onClick={() => setDarkMode(prev => !prev)}>
                        <img src={darkMode? "/sun.png" : "/moon.png"} alt="theme" className="icon-img" />
                    </button>
                    <button className="icon-btn" onClick={() => navigate('/favorites')}>
                        <img src={darkMode? "/white-heart.png" : "/black-heart.png"}  alt="heart" className="icon-img" />
                    </button>
                    <Link to="/add" className="btn-sell">
                        <span className="btn-sell-plus">+</span>Sell Car
                    </Link>
                    {user ? (
                        <div className="header-avatar-wrap" ref={dropRef}>
                            <button
                                className="header-avatar-btn"
                                onClick={() => setDropOpen(p => !p)}
                            >
                                {user.avatar
                                    ? <img src={user.avatar} alt="avatar img" className="header-avatar-img" />
                                    : <span className="header-avatar-initials">{initials}</span>
                                }
                            </button>
                            {dropOpen && (
                                <div className="header-dropdown">
                                    <div className="header-dropdown-user">
                                        <span className="header-dropdown-name">{user.name}</span>
                                        <span className="header-dropdown-email">{user.email}</span>
                                    </div>
                                    <div className="header-dropdown-divider"/>
                                    <button 
                                        className="header-dropdown-logout"
                                        onClick={() => {
                                            logout();
                                            setDropOpen(false);
                                            navigate("/");
                                        }}
                                    >
                                        <img src="/logout.png" alt="log out icon" className="header-dropdown-logout-icon"/>
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            className="btn-signin"
                            onClick={() => navigate("/login")}
                        >
                            <img src="/user.png" alt="user icon" className="btn-signin-icon"/>
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </header>
     );
};
 
export default Header;