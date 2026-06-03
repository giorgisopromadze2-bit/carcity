import { useNavigate, useParams } from "react-router-dom";
import CarDetailHero from "./CarDetailHero";
import CarSpecipications from "./CarSpecipications";
import Equipment from "./Equipment";
import AboutCar from "./AboutCar";
import SellerInfo from "./SellerInfo";
import SimilarCars from "./SimilarCars";
import { useEffect, useState } from "react";

const CarDetail = ({ favorites, onToggleFavorite, darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior : "smooth" });
    }, [id]);

    useEffect(() => {
        const fetchCcar = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/cars/${id}`);
                if (!res.ok) throw new Error("not found");
                const data = await res.json();
                setCar(data);
            } catch (err) {
                setCar(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCcar();
    }, [id]);

    if (loading) return (
        <div style={{ padding: "120px 32px", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        </div>
    );

    if(!car) {
        return (
            <div style={{ padding: "120px 32px", textAlign: "center"}}>
                <p style={{ color: "var(--text-secondary)", marginBottom: 16}}>Car not found.</p>
                <button
                    onClick={() => navigate("/listings")}
                    style={{
                        fontFamily: "inherit", 
                        fontSize: 14, 
                        fontWeight: 600,
                        padding: "10px 24px", 
                        borderRadius: 10,
                        border: "1.5px solid var(--border-btn)",
                        background: "var(--bg)", 
                        color: "var(--text-primary)",
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
            <Equipment car={car} />
            <AboutCar car={car} />
            <SellerInfo car={car} />
            <SimilarCars 
                currentCarId={car._id}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                darkMode={darkMode}
            />
        </div>
    );
}
 
export default CarDetail;