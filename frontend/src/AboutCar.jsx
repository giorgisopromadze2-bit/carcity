import { useEffect, useState } from "react";

const SHORT_LIMIT = 325;

const AboutCar = ({ car }) => {
    const [expanded, setExpanded] = useState(false);
    const [marketData, setMarketData] = useState(null);

    useEffect(() => {
        if ( !car?.brand || !car?.model) return;
        const fetchMarket = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/cars?brand=${encodeURIComponent(car.brand)}&model=${encodeURIComponent(car.model)}&status=active`
                );
                const data = await res.json();
                const others = data.filter(c => c._id !== car._id);
                if (others.length === 0) return;

                const prices = others.map(c => c.price);
                const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                setMarketData({ avg, min, max, count: others.length });
            } catch (err) {
                console.error(err);
            }
        };
        fetchMarket();
    }, [car._id, car.brand, car.model]);

    const description = car.description || "";
    const shortText = description.length > SHORT_LIMIT
        ? description.slice(0, SHORT_LIMIT) + "..."
        : description;
    
    const dotPercent = marketData 
        ? Math.min(100, Math.max(0, ((
                car.price - marketData.min) / ((marketData.max - marketData.min) || 1)) * 100
            ))
        : 50;

    const fmt = (n) => `$${n.toLocaleString()}`;

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
                        {marketData && (
                            <span className="market-badge">
                                <img src="/trend.png" alt="" className="market-badge-icon" />
                                {car.price <= marketData.avg ? "Greate Price" : "Above Average"}
                            </span>
                        )}
                    </div>
                    {marketData ? (
                        <>
                            <div className="market-price">{fmt(marketData.avg)}</div>
                            <p className="market-based">
                                Average based on {marketData.count} similar listing{marketData.count !== 1 ? "s" : ""}
                            </p>
                            <div className="market-range-wrap">
                                <div className="market-track">
                                    <div className="market-dot" style={{ left: `${dotPercent}%` }} />
                                </div>
                                <div className="market-labels">
                                    <span>{fmt(marketData.min)}</span>
                                    <span>This car: {fmt(car.price)}</span>
                                    <span>{fmt(marketData.max)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="market-based" style={{ marginTop: 8 }}>
                            Not enough data this model yet.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
 
export default AboutCar;