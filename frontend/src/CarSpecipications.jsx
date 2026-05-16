const CarSpecipications = ({ car }) => {
    const specs = [
        { icon: "/specifications/calendar1.png",      label: "YEAR",         value: car.year },
        { icon: "/specifications/mileage2.png",      label: "MILEAGE",      value: car.mileage },
        { icon: "/specifications/engine1.png",        label: "ENGINE",       value: "3.7L" },
        { icon: "/specifications/hp2.png",           label: "POWER",        value: car.hp },
        { icon: "/specifications/fuel.png",          label: "FUEL",         value: car.fuel },
        { icon: "/specifications/transmission.png",  label: "TRANSMISSION", value: car.transmission },
        { icon: "/specifications/drivetrain.png",    label: "DRIVETRAIN",   value: "AWD" },
        { icon: "/specifications/exinterior.png",      label: "EXTERIOR",     value: car.color },
        { icon: "/specifications/exinterior.png",      label: "INTERIOR",     value: "Black Merino" },
        { icon: "/specifications/vin.png",           label: "VIN",          value: "WBSPO2022B0VF" },
        { icon: "/specifications/steering.png",      label: "STEERING",     value: "Left" },
        { icon: "/specifications/customs.png",       label: "CUSTOMS",      value: "Cleared" },
        { icon: "/specifications/owners.png",        label: "OWNERS",       value: "2" },
        { icon: "/specifications/seats.png",         label: "SEATS",        value: "4" },
    ];

    return (  
        <section className="car-specs-section">
            <div className="car-specs-header">
                <h2 className="car-specs-title">Specifications</h2>
                <span className="car-specs-count">{specs.length} attributes</span>
            </div>
            <div className="car-specs-grid">
                {specs.map((spec, i) => (
                    <div className="car-spec-card" key={i}>
                        <div className="car-spec-icon-wrap">
                            <img src={spec.icon} alt="" className="car-spec-icon" />
                        </div>
                        <span className="car-spec-label">{spec.label}</span>
                        <span className="car-spec-val">{spec.value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
 
export default CarSpecipications;