import { useState } from "react";

const SearchableDropdown = ({ refEl, value, onClear, open, onOpen, allOptions, onSelect, placeholder, disabled = false }) => {

    const [searchVal, setSearchVal] = useState("");

    const filtered = allOptions.filter(opt => 
        opt.toLowerCase().includes(searchVal.toLowerCase())
    );

    return ( 
        <div className="fsd-wrap" ref={refEl}>
            <div 
                className={`fsd-input-wrap ${open ? "open" : ""} ${disabled? "disabled" : ""}`}
                onClick={() => !disabled && onOpen()}
            >
                {value ? (
                    <span className="fsd-value">{value}</span>
                ) : (
                    <input
                        className="fsd-input"
                        placeholder={placeholder}
                        value={searchVal}
                        onChange={e => {
                            setSearchVal(e.target.value);
                            if (!open) onOpen();
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            onOpen();
                        }}
                        disabled={disabled}
                    />
                )}
                {value && (
                    <button
                        className="fsd-clear"
                        onClick={e => {
                            e.stopPropagation();
                            setSearchVal("");
                            onClear();
                        }}
                    >×</button>
                )}
                {!value && (
                    <span className="fsd-arrow">{open ? "∧" : "∨"}</span>
                )}
            </div>
            {open && !disabled && (
                <div className="fsd-dropdown">
                    {filtered.length === 0 ? (
                        <div className="fsd-empty">Np results</div>
                    ) : (
                        filtered.map(opt => (
                            <div 
                                key={opt}
                                className={`fsd-option ${value === opt ? "active" : ""}`}
                                onClick={() => {
                                    setSearchVal("");
                                    onSelect(opt);
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
 
export default SearchableDropdown;