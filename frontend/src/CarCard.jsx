import { useNavigate } from "react-router-dom";

const CarCard = ({ car, favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const isFav = favorites.includes(car.id);

    return (
        <div className="car-card" onClick={() => navigate(`/cars/${car.id}`)}>
            <div className="car-card-img-wrap">
                <img src={car.image} alt={car.model} className="car-card-img" />

                <span className="car-card-brand">{car.brand}</span>

                <button
                    className={`car-card-fav ${isFav ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(car.id);
                    }}
                >
                    <img
                        src={isFav ? "/red-heart.png" 
                            : (darkMode ? "/white-heart.png" : "/black-heart.png")}
                        alt="favorite"
                        className="car-card-fav-icon"
                    />
                </button>

                <div className="car-card-overlay">
                    <span className="car-card-model">{car.model}</span>

                    <span className="car-card-year-color">
                        {car.year} · {car.color}
                    </span>
                </div>
            </div>

            <div className="car-card-body">
                <div className="car-card-price-row">
                    <span className="car-card-price">
                        ${car.price.toLocaleString()}
                    </span>

                    <span className="car-card-trans">
                        {car.transmission}
                    </span>
                </div>

                <hr className="car-card-hr" />
            
                <div className="car-card-specs">
                    <span className="car-card-spec">
                        <img src="/mileage.png" alt="" className="spec-icon" />
                        {car.mileage}
                    </span>

                    <span className="car-card-spec">
                        <img src="/fuel.png" alt="" className="spec-icon" />
                        {car.fuel}
                    </span>

                    <span className="car-card-spec">
                        <img src="/hp.png" alt="" className="spec-icon" />
                        {car.hp}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CarCard;