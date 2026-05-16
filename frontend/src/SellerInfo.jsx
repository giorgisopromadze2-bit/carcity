const SELLER = {
    initials: "E",
    name: "Esarsebuli Butxuzia",
    location: "Palo Alto, CA",
    rating: 4.8,
    reviewCount: 64,
    response: "Within 1 hour",
    joined: "2018",
    listings: 64,
    phone: "+1 (650) 555-0177",
};

const SellerInfo = () => {
    return (  
        <section className="seller-section">
            <h2 className="seller-title">Seller information</h2>
            <div className="seller-card">
                <div className="seller-avatar">
                    {SELLER.initials}
                </div>
                <div className="seller-info">
                    <div className="seller-name-row">
                        <span className="seller-name">{SELLER.name}</span>
                        <span className="seller-verified">
                            <img src="/verified.png" alt="" className="seller-verified-icon" />
                            Verified
                        </span>
                    </div>
                    <div className="seller-location-row">
                        <img src="/location.png" alt="" className="seller-location-icon" />
                        {SELLER.location}
                    </div>
                    <div className="seller-rating-row">
                        <img src="/staricon.png" alt="" className="seller-star-icon" />
                        <span className="seller-rating-val">{SELLER.rating}</span>
                        · {SELLER.reviewCount} listings
                    </div>
                </div>
                <div className="seller-stats">
                    <div className="seller-stat-card">
                        <div className="seller-stat-top">
                            <img src="/clockicon.png" alt="" className="seller-stat-icon" />
                            <span className="seller-stat-label">Response</span>
                        </div>
                        <span className="seller-stat-val">{SELLER.response}</span>
                    </div>
                    <div className="seller-stat-card">
                        <div className="seller-stat-top">
                            <img src="/calendar.png" alt="" className="seller-stat-icon" />
                            <span className="seller-stat-label">Joined</span>
                        </div>
                        <span className="seller-stat-val">{SELLER.joined}</span>
                    </div>
                    <div className="seller-stat-card">
                        <div className="seller-stat-top">
                            <img src="/listings.png" alt="" className="seller-stat-icon" />
                            <span className="seller-stat-label">Listings</span>
                        </div>
                        <span className="seller-stat-val">{SELLER.listings}</span>
                    </div>
                </div>
                <div className="seller-actions">
                    <button className="seller-btn seller-btn-phone">
                        <img src="/phone.png" alt="" className="seller-btn-icon" />
                        {SELLER.phone}
                    </button>
                    <button className="seller-btn seller-btn-msg">
                        <img src="/message.png" alt="" className="seller-btn-icon" />
                        Message
                    </button>
                </div>
            </div>
        </section>
    );
}
 
export default SellerInfo;