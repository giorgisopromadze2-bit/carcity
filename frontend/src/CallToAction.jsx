import { useNavigate } from "react-router-dom";

const CallToAction  = () => {
    const navigate = useNavigate();

    return ( 
        <section className="cta">
            <div className="cta-inner">
                <div className="cta-card">
                    <h2 className="cta-title">Ready to sell your car?</h2>
                    <p className="cta-desc">List in minutes and search thousands of qualified buyers.</p>
                    <button className="cta-btn" onClick={() => navigate("/add")}>
                        List your car <span className="cta-btn-arrow">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
 
export default CallToAction;