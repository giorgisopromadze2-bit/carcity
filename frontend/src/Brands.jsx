import { useNavigate } from "react-router-dom";

const brands = [
    { name: "BMW",      img: "/brands/bmw.png" },
    { name: "Mercedes", img: "/brands/mercedes.png" },
    { name: "Audi",     img: "/brands/audi.png" },
    { name: "Porsche",  img: "/brands/porsche.png" },
    { name: "Tesla",    img: "/brands/tesla.png" },
    { name: "Toyota",   img: "/brands/toyota.png" },
    { name: "Ford",     img: "/brands/ford.png" },
    { name: "Lexus",    img: "/brands/lexus.png" }
];

const Brands = () => {
    const navigate = useNavigate();

    const handleBrandClick = (name) => {
        navigate(`/listings?brand=${encodeURIComponent(name)}`);
    };

    return ( 
        <section className="brands">
            <div className="brands-inner">
                <div className="brands-header">
                    <p className="featured-label">Brands</p>
                    <h2 className="featured-title">Browse by manufacturer</h2>
                </div>
                <div className="brands-grid">
                    {brands.map((brand) => (
                        <button
                            key={brand.name}
                            className="brand-card"
                            onClick={() => handleBrandClick(brand.name)}
                            aria-label={`Browse ${brand.name} cars`}
                        >
                            <div className="brand-card-img-wrap">
                                <img src={brand.img} alt={brand.name} className="brand-card-img" />
                            </div>
                            <span className="brand-card-name">{brand.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
     );
}
 
export default Brands;