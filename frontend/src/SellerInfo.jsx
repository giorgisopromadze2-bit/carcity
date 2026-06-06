const SellerInfo = ({ car }) => {
    const contact = car.contact || {};
    const initials = (contact.name || "S").charAt(0).toUpperCase();

    return (  
        <section className="seller-section">
            <h2 className="seller-title">Seller information</h2>
            <div className="seller-card">
                <div className="seller-avatar">
                    {initials}
                </div>
                <div className="seller-info">
                    <div className="seller-name-row">
                        <span className="seller-name">{contact.name}</span>
                        <span className="seller-verified">
                            <img src="/verified.png" alt="" className="seller-verified-icon" />
                            Verified
                        </span>
                    </div>
                    <div className="seller-location-row">
                        <img src="/location.png" alt="" className="seller-location-icon" />
                        {car.location}
                    </div>
                </div>
                <div className="seller-stats">
                    <div className="seller-stat-card">
                        <div className="seller-stat-top">
                            <img src="/calendar.png" alt="" className="seller-stat-icon" />
                            <span className="seller-stat-label">Joined</span>
                        </div>
                        <span className="seller-stat-val">2020</span>
                    </div>
                    <div className="seller-stat-card">
                        <div className="seller-stat-top">
                            <img src="/listings.png" alt="" className="seller-stat-icon" />
                            <span className="seller-stat-label">Listings</span>
                        </div>
                        <span className="seller-stat-val">22222</span>
                    </div>
                </div>
                <div className="seller-actions">
                    <button className="seller-btn seller-btn-phone">
                        <img src="/phone.png" alt="" className="seller-btn-icon" />
                        {contact.phone}
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