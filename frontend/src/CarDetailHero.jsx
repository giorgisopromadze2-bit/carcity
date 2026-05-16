import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarDetailHero = ({ car, favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const [activeImg, setActiveImg] = useState(0);
    const isFav = favorites.includes(car.id);
    const images = [car.image, car.image, car.image];
    const monthlyEst = Math.round((car.price / 60) / 10) * 10;
    
    const prevImg = () => setActiveImg((p) => (p-1 + images.length) % images.length);
    const nextImg = () => setActiveImg((p) => (p+1) % images.length);

    return ( 
        <div className="cdh-page">
            <div className="cdh-inner">
                <button className="cdh-back" onClick={() => navigate("/listings")}>
                    <img src="/back.png" alt="" className="cdh-back-icon" />
                    Back to listings
                </button>
                <div className="cdh-layout">
                    <div className="cdh-gallery">
                        <div
                            className="cdh-main-wrap"
                            onMouseEnter={e => e.currentTarget.classList.add("hovered")}
                            onMouseLeave={e => e. currentTarget.classList.remove("hovered")}
                        >
                            <div className="cdh-badges">
                                <span className="cdh-badge-brand">{car.brand}</span>
                                <span className="cdh-badge-verified">
                                    <img src="/verified.png" alt="" className="cdh-verified-icon" />
                                    Verified
                                </span>
                            </div>
                            <div className="cdh-img-actions">
                                <button
                                    className="cdh-action-btn"
                                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                                    title="Share"
                                >
                                    <img src="/share.png" alt="" className="cdh-action-icon cdh-share" />
                                </button>
                                <button 
                                    className={`cdh-action-btn cdh-fav-btn ${isFav ? "active" : ""}`}
                                    onClick={() => onToggleFavorite(car.id)}
                                    title="Save"
                                >
                                    <img 
                                        src={isFav ? "/red-heart.png" : (darkMode ? "/white-heart.png" : "/black-heart.png")} 
                                        alt="favorite"
                                        className="cdh-action-icon" 
                                    />
                                </button>
                            </div>
                            <button className="cdh-arrow cdh-arrow-left" onClick={prevImg}>
                                <img src="/arrow-left.png" alt="prev" className="cdh-arrow-icon"/>
                            </button>
                            <button className="cdh-arrow cdh-arrow-right" onClick={nextImg}>
                                <img src="/arrow-right.png" alt="next" className="cdh-arrow-icon" />
                            </button>
                            <img src={images[activeImg]} alt={car.model} className="cdh-main-img" />
                            <span className="cdh-counter">{activeImg + 1} / {images.length}</span>
                        </div>
                        <div className="cdh-thumbs">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`cdh-thumb ${activeImg === i ? "active" : ""}`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <img src={img} alt="" className="cdh-thumb-img" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="cdh-info">
                        <div className="cdh-tags">
                            <span className="cdh-tag cdh-tag-brand">{car.brand}</span>
                            <span className="cdh-tag">{car.year}</span>
                            <span className="cdh-tag cdh-tag-fair">
                                <img src="/sparkles.png" alt="" className="cdh-tag-icon" />
                                Fair Price
                            </span>
                        </div>
                        <h1 className="cdh-title">{car.model}</h1>
                        <p className="cdh-location">
                            <img src="/location.png" alt="" className="cdh-loc-icon" />
                            Manhattan, NY
                        </p>
                        <div className="cdh-price-block">
                            <span className="cdh-price">${car.price.toLocaleString()}</span>
                            <p className="cdh-price-sub">Est. ${monthlyEst.toLocaleString()}/mo · 60 mo financing</p>
                        </div>
                        <div className="cdh-specs">
                            <div className="cdh-spec">
                                <img src="/calendar.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">YEAR</span>
                                <span className="cdh-spec-val">{car.year}</span>
                            </div>
                            <div className="cdh-spec">
                                <img src="/mileage1.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">MILEAGE</span>
                                <span className="cdh-spec-val">{car.mileage}</span>
                            </div>
                            <div className="cdh-spec">
                                <img src="/engine.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">ENGINE</span>
                                <span className="cdh-spec-val">3.7L</span>
                            </div>
                            <div className="cdh-spec">
                                <img src="/hp1.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">POWER</span>
                                <span className="cdh-spec-val">{car.hp}</span>
                            </div>
                        </div>
                        <button className="cdh-btn-call">
                            <img src="/phone.png" alt="" className="cdh-btn-icon" />
                            Call Seller
                        </button>
                        <div className="cdh-btn-row">
                            <button className="cdh-btn-secondary">
                                <img src="/message.png" alt="" className="cdh-btn-icon" />
                                Message
                            </button>
                            <button className="cdh-btn-secondary">
                                <img src="/sparkles1.png" alt="" className="cdh-btn-icon" />
                                Financing
                            </button>
                        </div>
                        <div className="cdh-bottom-row">
                            <button 
                                className={`cdh-bottom-btn ${isFav ? "saved" : ""}`}
                                onClick={() => onToggleFavorite(car.id)}
                            >
                                <img 
                                    src={isFav ? "/heart1.png" : "/black-heart.png"} 
                                    alt=""
                                    className="cdh-bottom-icon" 
                                />
                                Save
                            </button>
                            <button className="cdh-bottom-btn">
                                <img src="/edit.png" alt="" className="cdh-bottom-icon" />
                                Edit
                            </button>
                            <button className="cdh-bottom-btn cdh-bottom-delete">
                                <img src="/delete.png" alt="" className="cdh-bottom-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default CarDetailHero;