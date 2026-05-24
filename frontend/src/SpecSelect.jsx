import { useState } from "react";

const SpecSelect = ({ value, options, disabled, onChange, placeholder = "Select..." }) => {
    const [open, setOpen] = useState(false);

    return ( 
        <div className="spec-select">
            <button
                type="button"
                className="spec-select-btn"
                disabled={disabled}
                onClick={() => !disabled && setOpen(p => !p)}
            >
                {value || placeholder}
                <span className={`spec-select-arrow ${open ? "open" : ""}`}>▾</span>
            </button>
            {open && (
                <>
                    <div className="spec-select-backdrop" onClick={() => setOpen(false)}/>
                        <div className="spec-select-dropdown">
                            {options.map(opt => (
                                <div
                                    key={opt}
                                    className={`spec-select-option ${opt === value ? "active" : ""}`}
                                    onClick={() => {
                                        onChange(opt);
                                        setOpen(false);
                                    }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                </>
            )}
        </div>
    );
}
 
export default SpecSelect;