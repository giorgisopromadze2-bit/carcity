
const features =[
    {
        icon: "/icons/shield.png",
        title: "Verified Sellers",
        desc: "Every listing is reviewed and every seller is verified.",
    },
    {
        icon: "/icons/zap.png",
        title: "Instant Inquiries",
        desc: "Connect with sellers directly through our messaging.",
    },
    {
        icon: "/icons/sparkles.png",
        title: "Curated Quality",
        desc: "Premium and performance vehicles, hand-selected.",
    }
];

const Features = () => {
    return ( 
        <section className="features">
            <div className="features-inner">
                <div className="features-grid">
                    {features.map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-card-icon-wrap">
                                <img src={f.icon} alt={f.title} className="feature-card-icon" />
                            </div>
                            <h3 className="feature-card-title">{f.title}</h3>
                            <p className="feature-card-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
     );
}
 
export default Features;