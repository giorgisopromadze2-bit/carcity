import { useNavigate, useParams } from "react-router-dom";
import { cars } from "./FeaturedCars";
import CarDetailHero from "./CarDetailHero";
import CarSpecipications from "./CarSpecipications";
import Equipment from "./Equipment";
import AboutCar from "./AboutCar";
import SellerInfo from "./SellerInfo";
import SimilarCars from "./SimilarCars";
import { useEffect } from "react";

const CarDetail = ({ favorites, onToggleFavorite, darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const car = cars.find((c) => c.id === Number(id));

    useEffect(() => {
        window.scrollTo({ top: 0, behavior : "smooth" });
    }, [id])

    if(!car) {
        return (
            <div style={{ padding: "120px 32px", textAlign: "center"}}>
                <p style={{ color: "var(--text-secondary)", marginBottom: 16}}>Car not found.</p>
                <button
                    onClick={() => navigate("/listings")}
                    style={{
                        fontFamily: "inherit", fontSize: 14, fontWeight: 600,
                        padding: "10px 24px", borderRadius: 10,
                        border: "1.5px solid var(--border-btn)",
                        background: "var(--bg)", color: "var(--text-primary)",
                        cursor: "pointer"
                    }}
                >Back to listings</button>
            </div>
        );
    }

    return ( 
        <div className="car-main">
            <CarDetailHero 
                car={car}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                darkMode={darkMode}
            />
            <CarSpecipications car={car} />
            <Equipment />
            <AboutCar />
            <SellerInfo />
            <SimilarCars 
                currentCarId={car.id}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                darkMode={darkMode}
            />
        </div>
    );
}
 
export default CarDetail;