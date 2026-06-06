import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CarCard from "./CarCard";
import { useConfig } from "./useConfig";
import SearchableDropdown from "./SearchableDropDown";

const Listings = ({ favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { config } = useConfig();

    const [inputVal, setInputVal] =useState(searchParams.get("search") || "");
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
    const [brandOpen, setBrandOpen] = useState(false);
    const brandRef = useRef(null);

    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef(null);   

    const [selectedModel, setSelectedModel] = useState("");
    const [modelOpen, setModelOpen] = useState(false);
    const modelRef = useRef(null);

    const [priceRange, setPriceRange] = useState(null);
    const [yearRange, setYearRange] = useState(null);
    const [maxMileage, setMaxMileage] = useState(null);
    const [selectedTrans, setSelectedTrans] = useState("All");
    const [selectedFuel, setSelectedFuel] = useState("All");
    const [selectedDrive, setSelectedDrive] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const [cars, setCars] = useState([]);
    const [carsLoading, setCarsLoading] = useState(false);

    const priceMin = useMemo(() => cars.length ? Math.min(...cars.map(c => c.price)) : 0, [cars]);
    const priceMax = useMemo(() => cars.length ? Math.max(...cars.map(c => c.price)) : 2500000, [cars]);
    const yearMin  = useMemo(() => cars.length ? Math.min(...cars.map(c => c.year))  : 1900, [cars]);
    const yearMax  = useMemo(() => cars.length ? Math.max(...cars.map(c => c.year))  : new Date().getFullYear(), [cars]);
    const mileageMax = useMemo(() => cars.length ? Math.max(...cars.map(c => c.mileage || 0)) : 500000, [cars]);

    const TRANSMISSIONS = useMemo(() => config?.transmissions || [], [config]);
    const FUELS = useMemo(() => config?.fuels || [], [config]);
    const DRIVETRAINS = useMemo(() => config?.drivetrains || [], [config]);
    const MODELS_MAP = useMemo(() => config?.models || {}, [config]);
    const SORTS = [
        { value: "newest",     label: "Newest first" },
        { value: "oldest",     label: "Oldest first" },
        { value: "price_asc",  label: "Price ↑" },
        { value: "price_desc", label: "Price ↓" },
        { value: "year_asc",   label: "Year ↑" },
        { value: "year_desc",  label: "Year ↓" },
    ];
    const BRANDS = useMemo(() => {
        const inDB = new Set(cars.map(c => c.brand));
        return (config?.brands || []).filter(b => inDB.has(b)).sort((a, b) => a.localeCompare(b));
    }, [cars, config]);

    const MODELS = useMemo(() => {
        if (!selectedBrand) return [];
        const inDB = new Set(cars.filter(c => c.brand === selectedBrand).map(c => c.model));
        return (MODELS_MAP[selectedBrand] || [])
            .filter(m => inDB.has(m))
            .sort((a, b) => a.localeCompare(b));
    }, [selectedBrand, cars, MODELS_MAP]);

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
        if ( cars.length === 0) return;
        setPriceRange([priceMin, priceMax]);
        setYearRange([yearMin, yearMax]);
        setMaxMileage(mileageMax);
    }, [priceMin, priceMax, yearMin, yearMax, mileageMax]);

    useEffect(() => {
        const handler = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        setSelectedBrand(searchParams.get("brand") || "");
        const s = searchParams.get("search") || "";
        setSearch(s);
        setInputVal(s);
    }, [searchParams]);

    useEffect(() => {
        setSelectedModel("");
    }, [selectedBrand]);

    useEffect(() => {
        const handler = (e) => {
            if (brandRef.current && !brandRef.current.contains(e.target)) {
                setBrandOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [])

    useEffect(() => {
        const handler = (e) => {
            if (modelRef.current && !modelRef.current.contains(e.target)) {
                setModelOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = useMemo(() => {

        if (!priceRange || !yearRange || maxMileage === null) return[];

        let result = cars.filter((car) => {
            if(selectedBrand && car.brand !== selectedBrand) return false;
            if(selectedModel && car.model !== selectedModel) return false;
            if(car.price < priceRange[0] || car.price > priceRange[1]) return false;
            if(car.year < yearRange[0] || car.year > yearRange[1]) return false;
            if((car.mileage || 0) > maxMileage) return false;
            if(selectedTrans !== "All" && car.transmission !== selectedTrans) return false;
            if(selectedFuel !== "All" && car.fuel !== selectedFuel) return false;
            if(selectedDrive !== "All" && car.drivetrain !== selectedDrive) return false;
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

        result = [...result].sort((a, b) => {
            if (sortBy === "newest")     return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === "oldest")     return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === "price_asc")  return a.price - b.price;
            if (sortBy === "price_desc") return b.price - a.price;
            if (sortBy === "year_asc")   return a.year - b.year;
            if (sortBy === "year_desc")  return b.year - a.year;
            return 0; 
        });

        return result;
    }, [cars,priceRange, yearRange, maxMileage, selectedBrand, selectedModel, selectedTrans, selectedFuel, selectedDrive, search, sortBy]);

    const handleReset = () => {
        setSelectedBrand("");
        setSelectedModel("");
        setPriceRange([priceMin, priceMax]);
        setYearRange([yearMin, yearMax]);
        setMaxMileage(mileageMax);
        setSelectedTrans("All");
        setSelectedFuel("All");
        setSelectedDrive("All");
        setSortBy("newest");
        setSearch("");
        setInputVal("");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputVal);
    };

    const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;


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
                                <p className="filter-group-label">Sort by</p>
                                <div className="fsd-wrap" ref={sortRef}>
                                    <div
                                        className={`fsd-input-wrap ${sortOpen ? "open" : ""}`}
                                        onClick={() => setSortOpen(p => !p)}
                                    >
                                        <span className="fsd-value">
                                            {SORTS.find(s => s.value === sortBy)?.label}
                                        </span>
                                        <span className="fsd-arrow">{sortOpen ? "∧" : "∨"}</span>
                                    </div>
                                    {sortOpen && (
                                        <div className="fsd-dropdown">
                                            {SORTS.map(s => (
                                                <div
                                                    key={s.value}
                                                    className={`fsd-option ${sortBy === s.value ? "active" : ""}`}
                                                    onClick={() => {
                                                        setSortBy(s.value);
                                                        setSortOpen(false);
                                                    }}
                                                >
                                                    {s.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Brand</p>
                                <SearchableDropdown 
                                    refEl={brandRef}
                                    value={selectedBrand}
                                    onClear={() => { 
                                        setSelectedBrand("");  
                                        setBrandOpen(false); 
                                    }}
                                    open={brandOpen}
                                    onOpen={() => setBrandOpen(p => !p)}
                                    allOptions={BRANDS}
                                    onSelect={(b) => { 
                                        setSelectedBrand(b); 
                                        setBrandOpen(false); 
                                    }}
                                    placeholder="Select brand..."
                                />
                            </div>
                            <div className="filter-group">
                                <p className="filter-group-label" style={{ opacity: selectedBrand ? 1 : 0.45 }}>Model</p>
                                <SearchableDropdown
                                    refEl={modelRef}
                                    value={selectedModel}
                                    onClear={() => { 
                                        setSelectedModel(""); 
                                        setModelOpen(false); 
                                    }}
                                    open={modelOpen}
                                    onOpen={() => selectedBrand && setModelOpen(p => !p)}
                                    allOptions={MODELS}
                                    onSelect={(m) => { 
                                        setSelectedModel(m); 
                                        setModelOpen(false); 
                                    }}
                                    placeholder={selectedBrand ? "All models" : "Select brand first"}
                                    disabled={!selectedBrand}
                                />
                            </div>
                            <div className="filter-divider" />
                            {priceRange && (
                                <div className="filter-group">
                                    <p className="filter-group-label">
                                        Price: {fmt(priceRange[0])} — {fmt(priceRange[1])}
                                    </p>
                                    <div className="filter-range-row">
                                        <span className="filter-range-label">{fmt(priceMin)}</span>
                                        <input
                                            type="range"
                                            className="filter-range"
                                            min={priceMin}
                                            max={priceMax}
                                            value={priceRange[0]}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                                                e.target.style.setProperty('--val', ((v - priceMin) / (priceMax - priceMin) * 100) + '%');
                                            }}
                                            style={{ '--val': ((priceRange[0] - priceMin) / (priceMax - priceMin) * 100) + '%' }}
                                        />
                                        <input 
                                            type="range"
                                            className="filter-range"
                                            min={priceMin} max={priceMax}
                                            value={priceRange[1]}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                if (v >= priceRange[0]) setPriceRange([priceRange[0], v]);
                                                e.target.style.setProperty('--val', ((v - priceMin) / (priceMax - priceMin) * 100) + '%');
                                            }}
                                            style={{ '--val': ((priceRange[1] - priceMin) / (priceMax - priceMin) * 100) + '%' }}
                                        />
                                        <span className="filter-range-label">{fmt(priceMax)}</span>
                                    </div>
                                </div>
                            )}
                            <div className="filter-divider" />
                            {yearRange && (
                                <div className="filter-group">
                                    <p className="filter-group-label">
                                        Year: {yearRange[0]} — {yearRange[1]}
                                    </p>
                                    <div className="filter-range-row">
                                        <span className="filter-range-label">{yearMin}</span>
                                        <input
                                            type="range"
                                            className="filter-range"
                                            min={yearMin} max={yearMax} step={1}
                                            value={yearRange[0]}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                if (v <= yearRange[1]) setYearRange([v, yearRange[1]]);
                                                e.target.style.setProperty('--val', ((v - yearMin) / (yearMax - yearMin) * 100) + '%');
                                            }}
                                            style={{ '--val': ((yearRange[0] - yearMin) / (yearMax - yearMin) * 100) + '%' }}
                                        />
                                        <input
                                            type="range"
                                            className="filter-range"
                                            min={yearMin} max={yearMax} step={1}
                                            value={yearRange[1]}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                if (v >= yearRange[0]) setYearRange([yearRange[0], v]);
                                                e.target.style.setProperty('--val', ((v - yearMin) / (yearMax - yearMin) * 100) + '%');
                                            }}
                                            style={{ '--val': ((yearRange[1] - yearMin) / (yearMax - yearMin) * 100) + '%' }}
                                        />
                                        <span className="filter-range-label">{yearMax}</span>
                                    </div>
                                </div>
                            )}
                            <div className="filter-divider" />
                            {maxMileage !== null && (
                                <div className="filter-group">
                                    <p className="filter-group-label">
                                        Max mileage: {maxMileage.toLocaleString()} km
                                    </p>
                                    <input
                                        type="range"
                                        className="filter-range"
                                        min={0} max={mileageMax}
                                        value={maxMileage}
                                        onChange={e => {
                                            setMaxMileage(Number(e.target.value));
                                            e.target.style.setProperty('--val', (Number(e.target.value) / mileageMax * 100) + '%');
                                        }}
                                        style={{ '--val': (maxMileage / mileageMax * 100) + '%' }}
                                    />
                                </div>
                            )}
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Transmission</p>
                                <div className="filter-chips">
                                    <button
                                        type="button"
                                        className={`filter-chip ${selectedTrans === "All" ? "active" : ""}`}
                                        onClick={() => setSelectedTrans("All")}
                                    >
                                        All
                                    </button>
                                    {TRANSMISSIONS.map((t) => (
                                        <button
                                            type="button"
                                            key={t}
                                            className={`filter-chip ${selectedTrans === t ? "active" : ""}`}
                                            onClick={() => setSelectedTrans(t)}
                                        >
                                            {t}
                                        </button>
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
                            <div className="filter-divider" />
                            <div className="filter-group">
                                <p className="filter-group-label">Drivetrain</p>
                                <div className="filter-chips">
                                    <button 
                                        type="button" 
                                        className={`filter-chip ${selectedDrive === "All" ? "active" : ""}`} 
                                        onClick={() => setSelectedDrive("All")}
                                    >
                                        All
                                    </button>
                                    {DRIVETRAINS.map(d => (
                                        <button 
                                            type="button" 
                                            key={d} 
                                            className={`filter-chip ${selectedDrive === d ? "active" : ""}`} 
                                            onClick={() => setSelectedDrive(d)}
                                        >
                                            {d}
                                        </button>
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