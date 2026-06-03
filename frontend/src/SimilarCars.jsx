import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { useEffect, useState } from "react";

const SimilarCars = ({ currentCarId, favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/cars?status=active");
                if (!res.ok) throw new Error("fetch failed");
                const data = await res.json();
                setSimilar(data.filter(c => c._id !== currentCarId).slice(0, 6));
            } catch (err) {
                console.error(err);
            }
        };
        fetchSimilar();
    }, [currentCarId]);

    if (similar.length === 0) return null;

    return ( 
        <section className="similar-section">
            <div className="similar-inner">
                <div className="similar-header">
                    <h2 className="similar-title">Similar vehicles</h2>
                    <button className="similar-view-all" onClick={() => navigate("/listings")}>View all →</button>
                </div>
                <div className="similar-grid">
                    {similar.map((car) => (
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
 
export default SimilarCars;