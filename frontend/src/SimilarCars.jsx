import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { cars } from "./FeaturedCars";

const SimilarCars = ({ currentCarId, favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();

    const similar = cars.filter((c) => c.id !== currentCarId).slice(0, 6);

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
                            key={car.id}
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