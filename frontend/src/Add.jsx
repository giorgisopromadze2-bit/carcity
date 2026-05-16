import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BRANDS = ["BMW", "Porsche", "Tesla", "Mercedes", "Audi", "Toyota", "Ford", "Lexus"];
const FUELS = ["Petrol", "Electric", "Hybrid", "Diesel"];
const TRANSMISSIONS = ["Automatic", "Manual"];
const EMPTY = {
    title: "", brand: "BMW", price: "", year: new Date().getFullYear(),
    mileage: "", fuel: "Petrol", transmission: "Automatic", image: "", description: ""
};

const Add = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const set = (field, val) => {
        setForm(p => ({ ...p, [field]: val }));
        if(errors[field]) setErrors(p => ({ ...p, [field]: "" }));
    };

    const validate = () => {
        const e = {};
        if(!form.title.trim()) e.title = "Title is required";
        if(!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price";
        if(!form.mileage.trim()) e.mileage = "Mileage is required";
        if(!form.year || isNaN(form.year) || form.year < 1990 || form.year > 2030) e.year = "Enter a valid year";
        return e;
    };

    const handleSubmit= async () => {
        const e = validate();
        if(Object.keys(e).length > 0){
            setErrors(e);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    year: Number(form.year),
                }),
            });

            if(!response.ok) throw new Error("server error");

            setSubmitted(true);
        } catch (err) {
            console.log(err);
            alert("Something went wrong. Please try again");
        }
    };

    if(submitted) {
        return (
            <div className="add-page">
                <div className="add-success">
                    <div className="add-success-icon">✓</div>
                    <h2 className="add-success-title">Listing published!</h2>
                    <p className="add-success-text">Your car has been listed successfully.</p>
                    <div className="add-success-btns">
                        <button className="add-submit-btn" onClick={() => {
                            setForm(EMPTY);
                            setSubmitted(false);
                        }}>Add another</button>
                        <button className="add-cancel-btn" onClick={() => navigate("/listings")}>
                            View listings
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return ( 
        <div className="add-page">
            <div className="add-inner">
                <div className="add-header">
                    <h1 className="add-title">Sell your car</h1>
                    <p className="add-subtitle">Reach thousands of buyers in minutes. Listings are free.</p>
                </div>
                <div className="add-card">
                    <div className="add-grid">
                        <div className="add-field">
                            <label className="add-label">Title</label>
                            <input 
                                className={`add-input ${errors.title ? "add-input-error" : ""}`}
                                placeholder="e. g. BMW M4 Competition"
                                value={form.title}
                                onChange={e => set("title" , e.target.value)}
                            />
                            {errors.title && <span className="add-error">{errors.title}</span>}
                        </div>
                        <div className="add-field">
                            <label className="add-label">Brand</label>
                            <select className="add-select" value={form.brand} onChange={e => set("brand", e.target.value)}>
                                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div className="add-field">
                            <label className="add-label">Price (USD)</label>
                            <input 
                                className={`add-input ${errors.price ? "add-input-error" : ""}`}
                                placeholder="84500"
                                type="number"
                                value={form.price}
                                onChange={e => set("price", e.target.value)}
                            />
                            {errors.price && <span className="add-error">{errors.price}</span>}
                        </div>
                        <div className="add-field">
                            <label className="add-label">Year</label>
                            <input 
                                className={`add-input ${errors.year ? "add-input-error" : ""}`}
                                placeholder="2024"
                                type="number"
                                value={form.year}
                                onChange={e => set("year", e.target.value)}
                            />
                            {errors.year && <span className="add-error">{errors.year}</span>}
                        </div>
                        <div className="add-field">
                            <label className="add-label">Mileage (mi)</label>
                            <input 
                                className={`add-input ${errors.mileage ? "add-input-error" : ""}`}
                                placeholder="120000"
                                value={form.mileage}
                                onChange={e => set("mileage", e.target.value)}
                            />
                            {errors.mileage && <span className="add-error">{errors.mileage}</span>}
                        </div>
                        <div className="add-field">
                            <label className="add-label">Fuel Type</label>
                            <select className="add-select" value={form.fuel} onChange={e => set("fuel", e.target.value)}>
                                {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div className="add-field">
                            <label className="add-label">Transmission</label>
                            <select className="add-select" value={form.transmission} onChange={e => set("transmission", e.target.value)}>
                                {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="add-field">
                            <label className="add-label">Image URL</label>
                            <input 
                                className="add-input"
                                placeholder="https:/..."
                                value={form.image}
                                onChange={e => set("image", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="add-field add-field-full">
                        <label className="add-label">Description</label>
                        <textarea  
                            className="add-textarea"
                            placeholder="Tell buyers what makes this car special..."
                            value={form.description}
                            onChange={e => set("description", e.target.value)}
                            rows={5}
                        />
                    </div>
                    <div className="add-actions">
                        <button className="add-submit-btn" onClick={handleSubmit}>
                            Publish Listing
                        </button>
                        <button className="add-cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Add;