import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";

export const cars =[
    {
        id: 1,
        brand: "BMW",
        model: "BMW M4 Competition",
        year: 2023,
        color: "Sao Paulo Yellow",
        price: 84500,
        transmission: "Automatic",
        mileage: "8.200 mi",
        fuel: "Petrol",
        hp: "503 hp",
        image: "/bmw.jpg",
    },
    {
        id: 2,
        brand: "Porsche",
        model: "Porsche 911 Turbo S",
        year: 2022,
        color: "GT Silver",
        price: 198000,
        transmission: "Automatic",
        mileage: "12,500 mi",
        fuel: "Petrol",
        hp: "640 hp",
        image: "/porsche.jpg",
    },
    {
        id: 3,
        brand: "Tesla",
        model: "Tesla Model S Plaid",
        year: 2024,
        color: "Pearl White",
        price: 109990,
        transmission: "Automatic",
        mileage: "3,400 mi",
        fuel: "Electric",
        hp: "1020 hp",
        image: "/tesla.jpg",
    },
    {
        id: 4,
        brand: "Mercedes",
        model: "Mercedes AMG GT",
        year: 2023,
        color: "Obsidian Black",
        price: 145000,
        transmission: "Automatic",
        mileage: "5,100 mi",
        fuel: "Petrol",
        hp: "577 hp",
        image: "/mercedes.jpg",
    },
    {
        id: 5,
        brand: "Audi",
        model: "Audi RS7 Sportback",
        year: 2023,
        color: "Daytona Grey",
        price: 121000,
        transmission: "Automatic",
        mileage: "7,800 mi",
        fuel: "Petrol",
        hp: "591 hp",
        image: "/audi.jpg",
    },
    {
        id: 6,
        brand: "Toyota",
        model: "Toyota GR Supra",
        year: 2024,
        color: "Phantom Matte Grey",
        price: 58900,
        transmission: "Automatic",
        mileage: "2,300 mi",
        fuel: "Petrol",
        hp: "382 hp",
        image: "/toyota.jpg",
    },
];

const FeaturedCars = ({ favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();

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
 
export default FeaturedCars;