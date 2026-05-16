import { useNavigate } from "react-router-dom";
import { cars } from "./FeaturedCars";
import CarCard from "./CarCard";

const Favorites = ({ favorites = [], onToggleFavorite, darkMode }) => {
    const navigate=useNavigate();
    const favCars = cars.filter((car) => favorites.includes(car.id));

    return ( 
        <main className="fav-page">
            <div className="fav-inner">
                <div className="fav-header">
                    <h1 className="fav-title">Your favorites</h1>
                    <p className="fav-count">{favCars.length} saved {favCars.length === 1 ? "car" : "cars"}</p>
                </div>
                {favCars.length === 0 ? (
                    <div className="fav-empty-card">
                        <img src="/black-heart.png" alt="no favorites" className="fav-empty-icon" />
                        <h2 className="fav-emty-title">No favorites yet</h2>
                        <p className="fav-empty-text">Tap the heart on any car to save it.</p>
                        <button className="cta-btn" onClick={() => navigate("/listings")}>
                            Browse cars
                        </button>
                    </div>
                ) : (
                    <div className="fav-grid">
                        {favCars.map((car) => (
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
        </main>
    );
}
 
export default Favorites;