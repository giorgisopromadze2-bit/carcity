import { useEffect, useRef, useState } from "react";

const SpecSelect = ({ value, options, disabled, onChange, placeholder = "Select...", searchable = false }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);
    const wrapRef = useRef(null);

    const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    useEffect(() => {
        if (!open) setSearch("");
    }, [open]);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return ( 
        <div className="spec-select" ref={wrapRef}>
            <div
                className={`spec-select-btn ${open ? "open" : ""} ${disabled ? "disabled" : ""}`}
                onClick={() => !disabled && setOpen(p => !p)}
                style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}
            >
                {open ? ( 
                    searchable ? (
                        <input
                            ref={inputRef}
                            className="spec-select-inline-input"
                            placeholder={placeholder}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onClick={e => e.stopPropagation()}
                        />
                    ) : (
                        <span style={{ flex: 1, minWidth: 0 }}>{value || placeholder}</span>
                    )
                ) : (
                    <span style={{ flex: 1, minWidth: 0 }}>{value || placeholder}</span>
                )}
                <span className={`spec-select-arrow ${open ? "open" : ""}`}>▾</span>
            </div>

            {open && (
                <div className="spec-select-dropdown">
                    {filtered.length === 0 ? (
                        <div className="fsd-empty">No results</div>
                    ) : (
                        filtered.map(opt => (
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
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
 
export default SpecSelect;