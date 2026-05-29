import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import CarCard from "./CarCard";
import { useConfig } from "./useConfig";

const Listings = ({ favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { config } = useConfig();

    const [inputVal, setInputVal] =useState(searchParams.get("search") || "");
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All");
    const [maxPrice, setMaxPrice] = useState(2500000);
    const [minYear, setMinYear] = useState(1900);
    const [selectedTrans, setSelectedTrans] = useState("All");
    const [selectedFuel, setSelectedFuel] = useState("All");

    const [cars, setCars] = useState([]);
    const [carsLoading, setCarsLoading] = useState(false);

    const priceMin = useMemo(() => cars.length ? Math.min(...cars.map(c => c.price)) : 0, [cars]);
    const priceMax = useMemo(() => cars.length ? Math.max(...cars.map(c => c.price)) : 2500000, [cars]);
    const yearMin  = useMemo(() => cars.length ? Math.min(...cars.map(c => c.year))  : 1900, [cars]);
    const yearMax  = useMemo(() => cars.length ? Math.max(...cars.map(c => c.year))  : 2026, [cars]);

    const TRANSMISSIONS = useMemo(() => config?.transmissions || [], [config]);
    const FUELS = useMemo(() => config?.fuels || [], [config]);
    const BRANDS = useMemo(() => {
        const inDB = new Set(cars.map(c => c.brand));
        return (config?.brands || []).filter(b => inDB.has(b)).sort((a, b) => a.localeCompare(b));
    }, [cars, config]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setCarsLoading(true);
                const res = await fetch("http://localhost:5000/api/cars");
                if (!res.ok) throw new Error("fetch failed");
                const data = await res.json();
                setCars(data);
            } catch (err) {
                console.error(err);
            } finally {
                setCarsLoading(false);
            }
        };
        fetchCars();
    }, []);

    useEffect(() => {
        if (cars.length === 0) return;
        setMaxPrice(Math.max(...cars.map(C => C.price)));
        setMinYear(Math.min(...cars.map(c => c.year)));
    }, [cars]);

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
                    !(car.exterior || "").toLowerCase().includes(q)
                ) return false
            }
            return true;
        });
    }, [cars, selectedBrand, maxPrice, minYear, selectedTrans, selectedFuel, search]);

    const handleReset = () => {
        setSelectedBrand("All");
        setMaxPrice(priceMax);
        setMinYear(yearMin);
        setSelectedTrans("All");
        setSelectedFuel("All");
        setSearch("");
        setInputVal("");
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
                                    min={priceMin} 
                                    max={priceMax}
                                    value={maxPrice}
                                    onChange={(e) => {
                                        setMaxPrice(Number(e.target.value));
                                        e.target.style.setProperty('--val', ((Number(e.target.value) -  priceMin) / (priceMax - priceMin) * 100) + '%');
                                    }}
                                    style={{'--val' : ((maxPrice - priceMin) / (priceMax - priceMin) * 100) + '%'}}
                                    className="filter-range"
                                />
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Year: {minYear}</p>
                                <input 
                                    type="range"
                                    min={yearMin}
                                    max={yearMax}
                                    step={1}
                                    value={minYear}
                                    onChange={(e) => {
                                        setMinYear(Number(e.target.value));
                                        e.target.style.setProperty('--val', ((Number(e.target.value) - yearMin) / (yearMax - yearMin) * 100) + '%');
                                    }}
                                    style={{'--val': ((minYear - yearMin) / (yearMax - yearMin) * 100) + '%'}} 
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
                        {carsLoading ? (
                            <div style={{ padding: 40, color: "var(--text-secondary)" }}>Loading...</div>
                        ) : filtered.length === 0 ? (
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
                                        key={car._id}
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