const categories = [
    {
        icon: "/sparkles1.png",
        label: "Comfort",
        items: [
            "Heated seats",
            "Ventilated seats",
            "Ambient lighting",
            "Panoramic roof",
            "Memory seats",
            "4-zone climate",
        ],
    },
    {
        icon: "/technology.png",
        label: "Technology",
        items: [
            "Apple CarPlay",
            "Android Auto",
            "Heads-Up Display",
            "360° Camera",
            "Premium navigation",
            "Wireless charging",
        ],
    },
    {
        icon: "/icons/shield.png",
        label: "Safety",
        items: [
            "Lane keep assist",
            "Blind spot monitor",
            "Adaptive cruise",
            "Parking sensors",
            "Auto emergency brake",
            "Driver attention",
        ],
    },
    {
        icon: "/performance.png",
        label: "Performance",
        items: [
            "Sport package",
            "Adaptive suspension",
            "Sport exhaust",
            "Launch control",
            "Carbon ceramic brakes",
            "Performance tires",
        ],
    },
];

const Equipment = () => {
    return ( 
        <section className="eq-section">
            <h2 className="eq-title">Features & equipment</h2>
            <div className="eq-grid">
                {categories.map((cat, i) => (
                    <div className="eq-card" key={i}>
                        <div className="eq-card-header">
                            <div className="eq-icon-wrap">
                                <img src={cat.icon} alt="" className="eq-icon" />
                                <span className="eq-cat-label">{cat.label}</span>
                            </div>
                            <ul className="eq-list">
                                {cat.items.map((item, j) => (
                                    <li className="eq-item" key={j}>
                                        <img src="/verified.png" alt="" className="eq-check" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section> 
    );
}
 
export default Equipment;