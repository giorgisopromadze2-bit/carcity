const Equipment = ({ car }) => {
    const categories = [
        { key: "comfort",     icon: "/sparkles1.png",     label: "Comfort" },
        { key: "technology",  icon: "/technology.png",    label: "Technology" },
        { key: "safety",      icon: "/icons/shield.png",  label: "Safety" },
        { key: "performance", icon: "/performance.png",   label: "Performance" }
    ];

    return ( 
        <section className="eq-section">
            <h2 className="eq-title">Features & equipment</h2>
            <div className="eq-grid">
                {categories.map((cat, i) => {
                    const items = car.equipment?.[cat.key] || [];
                    if (items.length === 0) return null;
                    return (
                        <div className="eq-card" key={cat.key}>
                            <div className="eq-card-header">
                                <div className="eq-icon-wrap">
                                    <img src={cat.icon} alt="" className="eq-icon" />
                                    <span className="eq-cat-label">{cat.label}</span>
                                </div>
                                <ul className="eq-list">
                                    {items.map((item, j) => (
                                        <li className="eq-item" key={j}>
                                            <img src="/verified.png" alt="" className="eq-check" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section> 
    );
}
 
export default Equipment;