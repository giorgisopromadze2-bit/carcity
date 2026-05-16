import { useNavigate, useSearchParams } from "react-router-dom";
import { cars } from "./FeaturedCars";
import { useEffect, useMemo, useState } from "react";
import CarCard from "./CarCard";

const BRANDS = ["BMW", "Porsche", "Tesla", "Mercedes", "Audi", "Toyota"];
const TRANSMISSIONS = ["Automatic", "Manual"];
const FUELS = ["Petrol", "Electric", "Hybrid", "Diesel"];

const Listings = ({ favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [inputVal, setInputVal] =useState(searchParams.get("search") || "");
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All");
    const [maxPrice, setMaxPrice] = useState(250000);
    const [minYear, setMinYear] = useState(2018);
    const [selectedTrans, setSelectedTrans] = useState("All");
    const [selectedFuel, setSelectedFuel] = useState("All");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        setSelectedBrand(searchParams.get("brand") || "All");
        const s = searchParams.get("search") || "";
        setSearch(s);
        setInputVal(s);
    }, [searchParams]);

    const filtered = useMemo(() => {
        return cars.filter((car) => {
            if(selectedBrand !== "All" && car.brand !== selectedBrand) return false;
            if(car.price > maxPrice) return false;
            if(car.year < minYear) return false;
            if(selectedTrans !== "All" && car.transmission !== selectedTrans) return false;
            if(selectedFuel !== "All" && car.fuel !== selectedFuel) return false;
            if(search.trim()) {
                const q = search.trim().toLowerCase();
                if(
                    !car.brand.toLowerCase().includes(q) &&
                    !car.model.toLowerCase().includes(q) &&
                    !String(car.year).includes(q) &&
                    !car.color.toLowerCase().includes(q)
                ) return false
            }
            return true;
        });
    }, [selectedBrand, maxPrice, minYear, selectedTrans, selectedFuel, search]);

    const handleReset = () => {
        setSelectedBrand("All");
        setMaxPrice(250000);
        setMinYear(2018);
        setSelectedTrans("All");
        setSelectedFuel("All");
        setSearch("");
        setInputVal("")
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputVal);
    };

    return ( 
        <div className="listings-page">
            <div className="listings-inner">
                <div className="listings-header">
                    <h1 className="listings-title">All Listings</h1>
                    <p className="listings-count">{filtered.length} cars available</p>
                </div>
                <form className="listings-search-form" onSubmit={handleSearch}>
                    <div className="listings-search-wrap">
                        <img src="/search.png" alt="" className="listings-search-icon" />
                        <input 
                            type="text"
                            className="listings-search-input"
                            placeholder="Search by brand, model, year..."
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                        />
                        <button type="submit" className="listings-search-btn">Search</button>
                    </div>
                </form>
                <div className="listings-layout">
                    <aside className="listings-sidebar">
                        <div className="filter-panel">
                            <div className="filter-panel-head">
                                <span className="filter-panel-title">Filters</span>
                                <button className="filter-reset-btn" type="button" onClick={handleReset}>Reset</button>
                            </div>
                            <div className="filter-group">
                                <p className="filter-group-label">Brand</p>
                                <div className="filter-chips">
                                    <button
                                        type="button"
                                        className={`filter-chip ${selectedBrand === "All" ? "active" : ""}`}
                                        onClick={() => setSelectedBrand("All")}
                                    >All</button>
                                    {BRANDS.map((b) => (
                                        <button
                                            type="button"
                                            key={b}
                                            className={`filter-chip ${selectedBrand === b ? "active" : ""}`}
                                            onClick={() => setSelectedBrand(b)}
                                        >{b}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Max Price: ${maxPrice.toLocaleString()}</p>
                                <input 
                                    type="range"
                                    min={20000} 
                                    max={250000}
                                    value={maxPrice}
                                    onChange={(e) => {
                                        setMaxPrice(Number(e.target.value));
                                        e.target.style.setProperty('--val', ((Number(e.target.value) -  20000) / (250000 - 20000) * 100) + '%');
                                    }}
                                    style={{'--val' : ((maxPrice - 20000) / (250000 - 20000) * 100) + '%'}}
                                    className="filter-range"
                                />
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Year: {minYear}</p>
                                <input 
                                    type="range"
                                    min={2015}
                                    max={2026}
                                    step={1}
                                    value={minYear}
                                    onChange={(e) => {
                                        setMinYear(Number(e.target.value));
                                        e.target.style.setProperty('--val', ((Number(e.target.value) - 2015) / (2026 - 2015) * 100) + '%');
                                    }}
                                    style={{'--val': ((minYear - 2015) / (2026 - 2015) * 100) + '%'}} 
                                    className="filter-range"                   
                                />
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Transmission</p>
                                <div className="filter-chips">
                                    <button
                                        type="button"
                                        className={`filter-chip ${selectedTrans === "All" ? "active" : ""}`}
                                        onClick={() => setSelectedTrans("All")}
                                    >All</button>
                                    {TRANSMISSIONS.map((t) => (
                                        <button
                                            type="button"
                                            key={t}
                                            className={`filter-chip ${selectedTrans === t ? "active" : ""}`}
                                            onClick={() => setSelectedTrans(t)}
                                        >{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Fuel Type</p>
                                <div className="filter-chips">
                                    <button
                                        type="button"
                                        className={`filter-chip ${selectedFuel === "All" ? "active" : ""}`}
                                        onClick={() => setSelectedFuel("All")}
                                    >All</button>
                                    {FUELS.map((f) => (
                                        <button
                                            type="button"
                                            key={f}
                                            className={`filter-chip ${selectedFuel === f ? "active" : ""}`}
                                            onClick={() => setSelectedFuel(f)}
                                        >{f}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                    <div className="listings-grid-wrap">
                        {filtered.length === 0 ? (
                            <div className="listings-empty">
                                <img src="/sad.png" alt="" className="listings-empty-icon" />
                                <p className="listings-empty-title">No matches found</p>
                                <p className="listings-empty-text">Try adjusting your filters or search.</p>
                                <button className="listings-empty-btn" type="button" onClick={handleReset}>Reset Filters</button>
                            </div>
                        ) : (
                            <div className="listings-grid">
                                {filtered.map((car) => (
                                    <CarCard 
                                        key={car.id}
                                        car={car}
                                        favorites={favorites}
                                        onToggleFavorite={onToggleFavorite}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Listings;