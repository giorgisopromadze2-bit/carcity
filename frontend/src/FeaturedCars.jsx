import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { useEffect, useState } from "react";

const FeaturedCars = ({ favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/cars?status=active");
                if (!res.ok) throw new Error("fetch failed");
                const data = await res.json();
                setCars(data.slice(0, 6));
            } catch (err) {
                console.error(err);
            }
        };
        fetchCars();
    }, []);

    return ( 
        <section className="featured">
            <div className="featured-inner">
                <div className="featured-header">
                    <div>
                        <p className="featured-label">Featured</p>
                        <h2 className="featured-title">Hand-picked cars</h2>
                    </div>
                    <button className="featured-view-all-btn" onClick={() => navigate("listings")}>
                        View all →
                    </button>
                </div>
                <div className="featured-grid">
                    {cars.map((car) => (
                        <CarCard
                            key={car._id}
                            car={car}
                            favorites={favorites}
                            onToggleFavorite={onToggleFavorite}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default FeaturedCars;