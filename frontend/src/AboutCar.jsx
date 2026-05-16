import { useState } from "react";

const DESCRIPTION = "Tri-motor Plaid with 1,020 hp. 0-60 in under 2 seconds. Full Self-Driving capability included. This vehicle has been meticulously maintained with full service history available. Recent inspection completed by certified technicians. All factory options included with original documentation. Non-smoker, garage-kept, and ready for immediate delivery. Financing options available with competitive rates through our partner network. Trade-ins welcome and we offer extended warranty packages for added peace of mind."
const SHORT_LIMIT = 325;
const MARKET = {
    price: 109990,
    based: 25,
    min: 101191,
    avg: 112190,
    max: 123189
};
const fmt = (n) => "$" + n.toLocaleString("en-US");

const AboutCar = () => {
    const [expanded, setExpanded] = useState(false);

    const shortText = DESCRIPTION.length > SHORT_LIMIT ? DESCRIPTION.slice(0, SHORT_LIMIT) + "...": DESCRIPTION;
    const position = Math.max(
        0,
        Math.min(
            100, 
            ((MARKET.price - MARKET.min) / (MARKET.max - MARKET.min))*100
        )
    );

    return ( 
        <section className="about-car-section">
            <div className="about-car-inner">
                <div className="about-car-card">
                    <h2 className="about-car-title">About this vehicle</h2>
                    <p className="about-car-text">
                        {expanded ? DESCRIPTION : shortText}
                    </p>
                    <button
                        className="about-car-toggle"
                        onClick={() => setExpanded((p) => !p)}
                    >
                        {expanded ? "Show less ∧" : "Show more ∨"}
                    </button>
                </div>
                <div className="about-car-card about-market-card">
                    <div className="market-head">
                        <h2 className="about-car-title">Market insight</h2>
                        <span className="market-badge">
                            <img src="/trend.png" alt="" className="market-badge-icon" />
                            Great Price
                        </span>
                    </div>
                    <div className="market-price">{fmt(MARKET.price)}</div>
                    <p className="market-based">Based on {MARKET.based} similar listings</p>
                    <div className="market-range-wrap">
                        <div className="market-track">
                            <div className="market-dot" style={{ left: `${position}%` }}></div>
                        </div>
                        <div className="market-labels">
                            <span>{fmt(MARKET.min)}</span>
                            <span>Avg {fmt(MARKET.avg)}</span>
                            <span>{fmt(MARKET.max)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AboutCar;