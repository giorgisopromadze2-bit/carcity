import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedCars from "./FeaturedCars";
import Brands from "./Brands";
import Features from "./Features";
import CallToAction from "./CallToAction";

const stats = [
    { value: "12K+", label: "Verified listings" },
    { value: "98%", label: "Satisfaction" },
    { value: "50+", label: "Premium brands" }
];

const Home = ({ favorites, onToggleFavorite, darkMode }) => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if(query && query.trim()){
            navigate(`/listings?search=${encodeURIComponent(query.trim())}`);
        } else {
            navigate("/listings");
        }
    };

    return ( 
        <main className="home">
            <section className="hero">
                <div className="hero-bg">
                    <img src="/hero-car.jpg" alt="" className="hero-bg-img" />
                    <div className="hero-overlay" />
                </div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <img src="/star.png" alt="" className="hero-badge-icon" />
                        Premium curated marketplace
                    </div>
                    <h1 className="hero-title">
                        Find Your{" "}
                        <span className="hero-title-dream">Dream{" "}Car</span>
                    </h1>
                    <p className="hero-sub">
                        Discover hand-picked luxury, performance and electric <br />
                        vehicles from verified sellers across the country.
                    </p>
                    <form className="hero-search" onSubmit={handleSearch}>
                        <div className="hero-search-inner">
                            <img src="/search.png" alt="" className="hero-search-icon" />
                            <input 
                                type="text" 
                                className="hero-search-input"
                                placeholder="Search by brand, model, year..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit" className="hero-search-btn">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="hero-actions">
                        <button className="hero-btn hero-btn-primary" onClick={() => navigate("/listings")}>
                            Browse all cars <span className="hero-btn-arrow">→</span>
                        </button>
                        <button className="hero-btn hero-btn-secondary" onClick={() => navigate("/add")}>
                            Sell your car
                        </button>
                    </div>
                    <div className="hero-stats">
                        {stats.map((s) => (
                            <div key={s.label} className="hero-stat">
                                <span className="hero-stat-value">{s.value}</span>
                                <span className="hero-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <FeaturedCars favorites={favorites} onToggleFavorite={onToggleFavorite} darkMode={darkMode} />
            <Brands />
            <Features />
            <CallToAction />
        </main>
     );
}
 
export default Home;
