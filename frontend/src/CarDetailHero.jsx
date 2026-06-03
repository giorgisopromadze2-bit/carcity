import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarDetailHero = ({ car, favorites, onToggleFavorite, darkMode }) => {
    const navigate = useNavigate();
    const images = car.images || [];

    const mainImgIdx = images.findIndex(img => img.isMain);
    const [activeImg, setActiveImg] = useState(mainImgIdx >= 0 ? mainImgIdx : 0);
    
    const isFav = favorites.includes(car._id);

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
                                    onClick={() => onToggleFavorite(car._id)}
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
                            <img src={images[activeImg]?.url} alt={car.model} className="cdh-main-img" />
                            <span className="cdh-counter">{activeImg + 1} / {images.length}</span>
                        </div>
                        <div className="cdh-thumbs">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`cdh-thumb ${activeImg === i ? "active" : ""}`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <img src={img.url} alt="" className="cdh-thumb-img" />
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
                        <h1 className="cdh-title">{car.title || car.model}</h1>
                        <p className="cdh-location">
                            <img src="/location.png" alt="" className="cdh-loc-icon" />
                            {car.location || "-"}
                        </p>
                        <div className="cdh-price-block">
                            <span className="cdh-price">${car.price.toLocaleString()}</span>
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
                                <span className="cdh-spec-val">{car.mileage ? `${car.mileage.toLocaleString()} km` : "-"}</span>
                            </div>
                            <div className="cdh-spec">
                                <img src="/engine.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">ENGINE</span>
                                <span className="cdh-spec-val">{car.engine || "-"}</span>
                            </div>
                            <div className="cdh-spec">
                                <img src="/hp1.png" alt="" className="cdh-spec-icon" />
                                <span className="cdh-spec-label">POWER</span>
                                <span className="cdh-spec-val">{car.power ? `${car.power} hp` : "-"}</span>
                            </div>
                        </div>
                        <button className="cdh-btn-call">
                            <img src="/phone.png" alt="" className="cdh-btn-icon" />
                            {car.contact?.phone ? `Call ${car.contact.phone}` : "Call Seller"}
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
                                onClick={() => onToggleFavorite(car._id)}
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