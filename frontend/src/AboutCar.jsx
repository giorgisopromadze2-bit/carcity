import { useState } from "react";

const SHORT_LIMIT = 325;

const AboutCar = ({ car }) => {
    const [expanded, setExpanded] = useState(false);

    const description = car.description || "";
    const shortText = description.length > SHORT_LIMIT
        ? description.slice(0, SHORT_LIMIT) + "..."
        : description;

    return ( 
        <section className="about-car-section">
            <div className="about-car-inner">
                {description && (
                    <div className="about-car-card">
                        <h2 className="about-car-title">About this vehicle</h2>
                        <p className="about-car-text">
                            {expanded ? description : shortText}
                        </p>
                        {description.length > SHORT_LIMIT && (
                            <button
                                className="about-car-toggle"
                                onClick={() => setExpanded((p) => !p)}
                            >
                                {expanded ? "Show less ∧" : "Show more ∨"}
                            </button>
                        )}
                    </div>
                )}
                <div className="about-car-card about-market-card">
                    <div className="market-head">
                        <h2 className="about-car-title">Market insight</h2>
                        <span className="market-badge">
                            <img src="/trend.png" alt="" className="market-badge-icon" />
                            Great Price
                        </span>
                    </div>
                    <div className="market-price"></div>
                    <p className="market-based">Based on  similar listings</p>
                    <div className="market-range-wrap">
                        <div className="market-track">
                            <div className="market-dot" style={{ left: `%` }}></div>
                        </div>
                        <div className="market-labels">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AboutCar;