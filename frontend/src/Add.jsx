import { useNavigate, useParams } from "react-router-dom";
import { useConfig } from "./useConfig";
import { useEffect, useRef, useState } from "react";
import SpecSelect from "./SpecSelect";

const Add = () => {
    const { id } = useParams();
    const isNew = !id;
    const navigate = useNavigate();
    const thumbsRef = useRef(null);
    const activeThumbRef = useRef(null);
    const { config, loading: configLoading } = useConfig();

    const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible : false });

    const BRANDS = (config?.brands || []).sort((a, b) => a.localeCompare(b));
    const MODELS = config?.models || {};
    const FUELS = config?.fuels || [];
    const TRANSMISSIONS = config?.transmissions || [];
    const ALL_SPECS = config?.allSpecs || [];
    const EQUIPMENT_CATS = config?.equipmentCats || [];

    const [loading, setLoading] = useState(!isNew);
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");

    const [phoneError, setPhoneError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [brandError, setBrandError] = useState("");
    const [modelError, setModelError] = useState("");
    const [mileageError, setMileageError] = useState("");
    const [imagesError, setImagesError] = useState("");
    const [vinError, setVinError] = useState("");
    

    const [images, setImages] = useState([]);
    const [mainImgIdx, setMainImgIdx] = useState(0);
    const [activeImg, setActiveImg] = useState(0);

    const [removedSpecs, setRemovedSpecs] = useState([]);
    const [specsVals, setSpecsVals] = useState({
        year: String(new Date().getFullYear()),
        mileage: "", 
        engine: "", 
        power: "",
        fuel: "Petrol", 
        transmission: "Automatic",
        drivetrain: "RWD", 
        exterior: "", 
        interior: "",
        vin: "", 
        steering: "Left", 
        customs: "Cleared",
        owners: "", 
        seats: "5"
    });

    const [equipment, setEquipment] = useState({});
    const [newEquipInput, setNewEquipInput] = useState({});

    useEffect(() => {
        if (!config) return;
        const cats = config.equipmentCats || [];
        setEquipment(prev => {
            const init = {};
            cats.forEach(c => { init[c.key] = prev[c.key] || []; });
            return init;
        });
        setNewEquipInput(prev => {
            const init = {};
            cats.forEach(c => { init[c.key] = prev[c.key] || ""; });
            return init;
        });
        if (isNew) {
            setSpecsVals(prev => ({
                ...prev,
                fuel: prev.fuel || config.fuels?.[0] || "Petrol",
                transmission: prev.transmission || config.transmissions?.[0] || "Automatic",
            }));
        }
    }, [config]);

    useEffect(() => {
        if (isNew) return;
        const fetchCar = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/cars/${id}`);
                if (!res.ok) throw new Error("not found");
                const data = await res.json();
                setBrand(data.brand || "");
                setModel(data.model || "");
                setPrice(data.price || "");
                setLocation(data.location || "");
                setPhone(data.contact?.phone || "");
                setDescription(data.description || "");
                const mainIdx = data.images?.findIndex(img => img.isMain) ?? 0;
                setMainImgIdx(mainIdx >= 0 ? mainIdx : 0);
                setImages(data.images || []);
                setSpecsVals({
                    year:         String(data.year || ""),
                    mileage:      data.mileage || "",
                    engine:       data.engine || "",
                    power:        data.power || "",
                    fuel:         data.fuel || "Petrol",
                    transmission: data.transmission || "Automatic",
                    drivetrain:   data.drivetrain || "RWD",
                    exterior:     data.exterior || "",
                    interior:     data.interior || "",
                    vin:          data.vin || "",
                    steering:     data.steering || "Left",
                    customs:      data.customs || "Cleared",
                    owners:       data.owners || "",
                    seats:        String(data.seats || "5")
                });
                if (data.equipment) {
                    setEquipment(prev => {
                        const merged = { ...prev };
                        Object.keys(data.equipment).forEach(k => {
                            merged[k] = data.equipment[k] || [];
                        });
                        return merged;
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    useEffect(() => {
        if (!activeThumbRef.current) return;
        activeThumbRef.current.scrollIntoView({
            behavior: "smooth", block: "nearest", inline: "center"
        });
    }, [activeImg, images]);

    useEffect(() => {
        const handleWheel = (e) => {
            if(document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        };
        document.addEventListener("wheel", handleWheel, { passive: false });
        return () => document.removeEventListener("wheel", handleWheel);
    }, []);

    const buildPayload = (isPublish = false) => ({
        brand, 
        model, 
        price: Number(price), 
        year: Number(specsVals.year),
        mileage: specsVals.mileage ? Number(specsVals.mileage) : undefined, 
        location,
        contact: { phone },
        description, 
        images: images.map(({ url, public_id }, i) => ({ url, public_id, isMain: i === mainImgIdx })),
        fuel: specsVals.fuel,
        transmission: specsVals.transmission,
        drivetrain: specsVals.drivetrain,
        engine: specsVals.engine,
        power: specsVals.power ? Number(specsVals.power) : undefined,
        exterior: specsVals.exterior,
        interior: specsVals.interior,
        vin: specsVals.vin,
        steering: specsVals.steering,
        customs: specsVals.customs,
        owners: specsVals.owners ? Number(specsVals.owners) : undefined,
        seats: specsVals.seats ? Number(specsVals.seats) : undefined,
        equipment,
        status: isPublish ? "active" : "pending"
    });

    const validate = (requirePhone = false) => {
        let valid = true;
        if (!price || isNaN(price) || Number(price) <= 0) { 
            setPriceError("Enter a valid price"); 
            valid = false; 
        } else setPriceError("");
        if (!brand) { 
            setBrandError("Brand is required"); 
            valid = false; 
        } else setBrandError("");
        if (!model) {
            setModelError("Model is required");
            valid = false;
        } else setModelError("");
        if (!specsVals.mileage || isNaN(specsVals.mileage) || Number(specsVals.mileage) < 0) { 
            setMileageError("Mileage is required"); 
            valid = false; 
        } else setMileageError("");
        if (images.length === 0) { 
            setImagesError("At least one photo is required"); 
            valid = false; 
        } else setImagesError("");
        if (requirePhone && !phone.trim()) { 
            setPhoneError("Phone number is required to publish"); 
            valid = false; 
        } else {
            setPhoneError("");
        }
        return valid;
    };

    const validateVin = (vin) => {
        if (!vin) return;
        if (vin.length !== 17) return "VIN must be exactly 17 characters";
        if (/[IOQ]/i.test(vin)) return "VIN cannot contain I, O, or Q";
        if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) return "VIN contains invalid characters";
        return "";
    };

    const doSave = async (payload) => {
        if (isNew) {
            const res = await fetch("http://localhost:5000/api/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("save failed");
            const data = await res.json();
            navigate(`/add/${data._id}`, { replace: true });
            return data;
        } else {
            const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("save failed");
            return res.json();
        }
    };

    const handlePublish = async () => {
        if (!validate(true)) return;
        setPublishing(true);
        try {
            await doSave(buildPayload(true));
            navigate("/listings");
        } catch {
            alert("Something went wrong.");
        } finally {
            setPublishing(false);
        }
    };

    const handleDelete = async () => {
        if (isNew) { navigate(-1); return; }
        if (!window.confirm("Delete this listing?")) return;
        setDeleting(true);
        try {
            await fetch(`http://localhost:5000/api/cars/${id}`, { method: "DELETE" });
            navigate("/listings");
        } catch {
            alert("Delete failed.");
        } finally {
            setDeleting(false);
        }
    };

    const removeImage = async (i) => {
        const img = images[i];

        if (img.public_id) {
            try {
                await fetch("http://localhost:5000/api/upload", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ public_id: img.public_id })
                });
            } catch {}
        }

        setImages(p => p.filter((_, idx) => idx !== i));
        if (mainImgIdx >= i && mainImgIdx > 0) setMainImgIdx(p => p - 1);
        setActiveImg(0);
    };

    const prevImg = () => setActiveImg(p => (p - 1 + images.length) % images.length);
    const nextImg = () => setActiveImg(p => (p + 1) % images.length);

    const toggleSpec = (key) => {
        setRemovedSpecs(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);
    };

    const toggleEquip = (cat, item) => {
        setEquipment(p => {
            const list = p[cat] || [];
            return { ...p, [cat]: list.includes(item) ? list.filter(i => i !== item) : [...list, item] };
        });
    };

    const addCustomEquip = (cat) => {
        const val = newEquipInput[cat]?.trim();
        if (!val) return;
        if (!equipment[cat]?.includes(val)) {
            setEquipment(p => ({ ...p, [cat]: [...(p[cat] || []), val] }));
        }
        setNewEquipInput(p => ({ ...p, [cat]: "" }));
    };

    if (loading || configLoading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        </div>
    );

    const displayImg = images[activeImg]?.url || null;

    return (
        <div className="car-main">
            <div className="cdh-inner" style={{ paddingBottom: 0 }}>
                <div 
                    style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        marginBottom: 8 
                    }}>
                    <button 
                        className="cdh-back" 
                        onClick={() => navigate(-1)
                    }>
                        <img src="/back.png" alt="" className="cdh-back-icon" />
                        Back
                    </button>
                    <div style={{ textAlign: "right" }}>
                        <h1 className="add-title" style={{ marginBottom: 2 }}>
                            {isNew ? "Sell your car" : "Edit listing"}
                        </h1>
                        <p className="add-subtitle">
                            {isNew
                                ? "Reach thousands of buyers in minutes. Listings are free."
                                : "Update your listing details below."}
                        </p>
                    </div>
                </div>

                <div className="cdh-layout">
                    <div className="cdh-gallery">
                        <div className="cdh-main-wrap">
                            {displayImg
                                ? <img src={displayImg} className="cdh-main-img" />
                                : <div className="add-details-no-img" onClick={() => !uploading && document.getElementById("file-upload-input").click()}>
                                    {uploading ? (
                                        <>
                                            <div className="upload-spinner" />
                                            <span className="add-details-no-img-text">Uploading...</span>
                                            <span className="add-details-no-img-sub">Please wait</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="add-details-no-img-icon">+</div>
                                            <span className="add-details-no-img-text">Add photos or video</span>
                                            <span className="add-details-no-img-sub">Click to upload from your device</span>
                                        </>
                                    )}
                                </div>
                            }
                            <div className="cdh-badges">
                                {brand && <span className="cdh-badge-brand">{brand}</span>}
                            </div>
                            {images.length > 1 && <>
                                <button className="cdh-arrow cdh-arrow-left" onClick={prevImg}>
                                    <img src="/arrow-left.png" alt="" className="cdh-arrow-icon" />
                                </button>
                                <button className="cdh-arrow cdh-arrow-right" onClick={nextImg}>
                                    <img src="/arrow-right.png" alt="" className="cdh-arrow-icon" />
                                </button>
                                <span className="cdh-counter">{activeImg + 1} / {images.length}</span>
                            </>}
                        </div>
                        <input 
                            id="file-upload-input"
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={ async e => {
                                const files = Array.from(e.target.files);
                                if (files.length === 0) return;

                                const newFiles = files.filter(file => 
                                    !images.some(img => 
                                        img._tempKey === `${file.name}-${file.size}`
                                    )
                                );

                                if (newFiles.length === 0) {
                                    e.target.value = "";
                                    return;
                                }

                                setUploading(true);
                                setImagesError("");
                                
                                const formData = new FormData();
                                newFiles.forEach(file => formData.append("images", file));

                                try{
                                    const res = await fetch("http://localhost:5000/api/upload", {
                                        method: "POST",
                                        body: formData
                                    });
                                    const data = await res.json();
                                    const withKeys = data.urls.map((img, i) => ({
                                        ...img,
                                        _tempKey: `${newFiles[i].name}-${newFiles[i].size}`
                                    }));
                                    setImages(p => [...p, ...withKeys]);
                                } catch {
                                    alert("Upload failed.")
                                } finally {
                                    setUploading(false);
                                }
                                e.target.value = "";
                            }}
                        />
                        {images.length > 0 && (
                            <div
                                className="cdh-thumbs add-details-thumbs-scroll"
                                ref={thumbsRef}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    const el = thumbsRef.current;
                                    el._drag = true;
                                    el._startX = e.pageX - el.offsetLeft;
                                    el._scrollLeft = el.scrollLeft;
                                }}
                                onMouseMove={e => {
                                    const el = thumbsRef.current;
                                    if (!el._drag) return;
                                    el.scrollLeft = el._scrollLeft - (e.pageX - el.offsetLeft - el._startX);
                                }}
                                onMouseUp={() => thumbsRef.current._drag = false}
                                onMouseLeave={() => thumbsRef.current._drag = false}
                                onWheel={e => { thumbsRef.current.scrollLeft += e.deltaY; }}
                            >
                                {images.map((img, i) => (
                                    <div 
                                        key={i} 
                                        className="add-details-thumb-wrap" 
                                        ref={activeImg === i ? activeThumbRef : null}
                                    >
                                        <button 
                                            className={`cdh-thumb ${activeImg === i ? "active" : ""}`} 
                                            onClick={() => setActiveImg(i)}
                                            style={{ width: "100%", height: "100%", margin: 0 }}
                                        >
                                            <img src={img.url} alt="" className="cdh-thumb-img" />
                                        </button>

                                        <button 
                                            className={`add-details-thumb-star ${mainImgIdx === i ? "is-main" : ""}`}
                                            onClick={() => { 
                                                setMainImgIdx(i); 
                                                setActiveImg(i); 
                                            }}
                                            onMouseEnter={e => {
                                                const r = e.currentTarget.getBoundingClientRect();
                                                setTooltip({ text: mainImgIdx === i ? "Main photo" : "Set as main", x: r.left + r.width / 2, y: r.top - 8, visible: true });
                                            }}
                                            onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
                                        >⭐</button>

                                        <button 
                                            className="add-details-thumb-del" 
                                            onClick={() => removeImage(i)}
                                            onMouseEnter={e => {
                                                const r = e.currentTarget.getBoundingClientRect();
                                                setTooltip({ text: "Remove photo", x: r.left + r.width / 2, y: r.top - 8, visible: true });
                                            }}
                                            onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
                                        >×</button>
                                    </div>
                                ))}
                                {tooltip.visible && (
                                    <div style={{
                                        position: "fixed",
                                        left: tooltip.x,
                                        top: tooltip.y,
                                        transform: "translate(-50%, -100%)",
                                        background: "rgba(0,0,0,0.78)",
                                        color: "#fff",
                                        fontSize: 11,
                                        fontWeight: 500,
                                        padding: "4px 9px",
                                        borderRadius: 6,
                                        whiteSpace: "nowrap",
                                        pointerEvents: "none",
                                        zIndex: 9999,
                                        fontFamily: "inherit",
                                        animation: "tooltip-in 0.15s ease",
                                    }}>
                                        {tooltip.text}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="cdh-info">
                        <div className="cdh-tags">
                            {brand && <span className="cdh-tag cdh-tag-brand">{brand}</span>}
                            {specsVals.year && <span className="cdh-tag">{specsVals.year}</span>}
                        </div>

                        <div className="add-field">
                            <label className="add-label">Price <span style={{ color: "#e11d48" }}>*</span></label>
                            <div style={{ position: "relative" }}>
                                <input
                                    className={`add-input ${priceError ? "add-input-error" : ""}`}
                                    type="number"
                                    placeholder="e.g. 38500"
                                    value={price}
                                    onChange={e => { 
                                        setPrice(e.target.value); 
                                        setPriceError(""); 
                                    }}
                                />
                                <span style={{
                                    position: "absolute",
                                    right: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "var(--text-secondary)",
                                    pointerEvents: "none",
                                }}>$</span>
                            </div>
                            {priceError && <span className="add-error">{priceError}</span>}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="add-field">
                                <label className="add-label">Location <span style={{ color: "#e11d48" }}>*</span></label>
                                <input
                                    className="add-input"
                                    placeholder="e.g. Tbilisi"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="add-field">
                                <label className="add-label">Year <span style={{ color: "#e11d48" }}>*</span></label>
                                <div className="add-brand-select">
                                    <SpecSelect 
                                        value={specsVals.year}
                                        options={Array.from(
                                            { length: new Date().getFullYear() - 1900 + 1 },
                                            (_, i) => String(new Date().getFullYear() - i)
                                        )}
                                        onChange={val => setSpecsVals(p => ({ ...p, year: val}))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="add-field">
                                <label className="add-label">Brand <span style={{ color: "#e11d48" }}>*</span></label>
                                <div className="add-brand-select">
                                    <SpecSelect 
                                        value={brand}
                                        options={BRANDS}
                                        disabled={false}
                                        onChange={val => {
                                            setBrand(val);
                                            setModel("");
                                            setBrandError("");
                                        }}
                                        placeholder="Select Brand"
                                        searchable
                                    />
                                    {brandError && <span className="add-error">{brandError}</span>}
                                </div>
                            </div>
                            <div className="add-field">
                                <label className="add-label">Model <span style={{ color: "#e11d48" }}>*</span></label>
                                <div 
                                    className="add-brand-select"
                                    style={{
                                        opacity: brand ? 1 : 0.7,
                                        pointerEvents: brand ? "all" : "none",
                                        transition: "opacity 0.3s"
                                    }}
                                >
                                    <SpecSelect 
                                        value={model}
                                        options={(MODELS[brand] || []).slice().sort((a, b) => a.localeCompare(b))}
                                        disabled={!brand}
                                        onChange={val => {
                                            setModel(val);
                                            setModelError("");
                                        }}
                                        placeholder={brand ? "Select Model" : "Select Brand first"}
                                        searchable
                                    />
                                </div>
                                {modelError && <span className="add-error">{modelError}</span>}
                            </div>
                        </div>

                        <div className="add-field">
                            <label className="add-label">
                                Phone number <span style={{ color: "#e11d48" }}>*</span>
                            </label>
                            <input
                                className={`add-input ${phoneError ? "add-input-error" : ""}`}
                                placeholder="+995 123-456-789"
                                value={phone}
                                onChange={e => { 
                                    setPhone(e.target.value); 
                                    setPhoneError(""); 
                                }}
                            />
                            {phoneError && <span className="add-error">{phoneError}</span>}
                        </div>

                        <div className="add-field">
                            <label className="add-label">Photos / video</label>
                            <button
                                className="add-cancel-btn"
                                style={{ 
                                    width: "100%", 
                                    padding: "11px 14px", 
                                    textAlign: "left", 
                                    color: "var(--text-secondary)"
                                }}
                                onClick={() => {
                                    if (!uploading) document.getElementById("file-upload-input").click();
                                }}
                            >
                                {uploading ? "⏳ Uploading..." : "📎 Upload photos or video"}
                            </button>
                            {imagesError && <span className="add-error">{imagesError}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <section className="car-specs-section" style={{ paddingTop: 48 }}>
                <div className="car-specs-header">
                    <h2 className="car-specs-title">Specifications</h2>
                    <span className="car-specs-count">
                        {ALL_SPECS.filter(s => !removedSpecs.includes(s.key)).length} / {ALL_SPECS.length} visible
                    </span>
                </div>
                <div className="car-specs-grid">
                    {ALL_SPECS.map(spec => {
                        const isRemoved = removedSpecs.includes(spec.key);

                        const specCard = (children, error) => (
                            <div key={spec.key} className="car-spec-card add-details-spec-card" style={{ opacity: isRemoved ? 0.25 : 1 }}>
                                <div className="car-spec-icon-wrap">
                                    <img src={spec.icon} alt="" className="car-spec-icon" />
                                </div>
                                <span className="car-spec-label">{spec.label}</span>
                                {children}
                                {error && <span className="add-error" style={{ fontSize: 11 }}>{error}</span>}
                                <button
                                    className={`add-details-spec-toggle ${isRemoved ? "is-removed" : ""}`}
                                    title={isRemoved ? "Restore" : "Hide"}
                                    onClick={() => toggleSpec(spec.key)}
                                >
                                    {isRemoved ? "+" : "−"}
                                </button>
                            </div>
                        );

                        if (spec.key === "fuel") return specCard(
                            <SpecSelect 
                                value={specsVals.fuel || "Petrol"} 
                                options={FUELS} 
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, fuel: val }))} 
                            />
                        );
                        if (spec.key === "transmission") return specCard(
                            <SpecSelect 
                                value={specsVals.transmission || "Automatic"} 
                                options={TRANSMISSIONS} 
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, transmission: val }))} 
                            />
                        );
                        if (spec.key === "drivetrain") return specCard(
                            <SpecSelect 
                                value={specsVals.drivetrain || "RWD"} 
                                options={["FWD", "RWD", "AWD", "4WD"]} 
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, drivetrain: val }))} 
                            />
                        );
                        if (spec.key === "steering") return specCard(
                            <SpecSelect 
                                value={specsVals.steering || "Left"} 
                                options={["Left", "Right"]} 
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, steering: val }))} />
                        );
                        if (spec.key === "customs") return specCard(
                            <SpecSelect 
                                value={specsVals.customs || "Cleared"} 
                                options={["Cleared", "Not Cleared"]} 
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, customs: val }))} />
                        );
                        if (spec.key === "engine") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                type="number" 
                                step="0.1" 
                                min="0" 
                                placeholder="3.5"
                                value={specsVals.engine || ""} 
                                disabled={isRemoved}
                                onChange={e => setSpecsVals(p => ({ ...p, engine: e.target.value }))} />
                        );
                        if (spec.key === "power") return specCard(
                            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                <input 
                                    className="add-details-spec-input" 
                                    type="number" 
                                    min="0" 
                                    placeholder="435" 
                                    style={{ flex: 1 }}
                                    value={specsVals.power || ""} 
                                    disabled={isRemoved}
                                    onChange={e => setSpecsVals(p => ({ ...p, power: e.target.value }))} />
                                <span 
                                    style={{ 
                                        fontSize: 12, 
                                        fontWeight: 600, 
                                        color: "var(--text-secondary)", 
                                        flexShrink: 0 
                                    }}
                                >hp</span>
                            </div>
                        );
                        if (spec.key === "year") return specCard(
                            <SpecSelect
                                value={specsVals.year || String(new Date().getFullYear())}
                                options={Array.from(
                                    { length: new Date().getFullYear() - 1900 + 1 },
                                    (_, i) => String(new Date().getFullYear() - i)
                                )}
                                disabled={isRemoved}
                                onChange={val => setSpecsVals(p => ({ ...p, year: val }))}
                            />
                        );
                        if (spec.key === "mileage") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                type="number" 
                                min="0"
                                placeholder="32850"
                                value={specsVals.mileage || ""} 
                                disabled={isRemoved}
                                onChange={e => { 
                                    setSpecsVals(p => ({ ...p, mileage: e.target.value })); 
                                    setMileageError("");
                                }} 
                            />,
                            mileageError
                        );
                        if (spec.key === "exterior") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                placeholder="Blue"
                                value={specsVals.exterior || ""} 
                                disabled={isRemoved}
                                onChange={e => setSpecsVals(p => ({ ...p, exterior: e.target.value }))} />
                        );
                        if (spec.key === "interior") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                placeholder="Red"
                                value={specsVals.interior || ""} 
                                disabled={isRemoved}
                                onChange={e => setSpecsVals(p => ({ ...p, interior: e.target.value }))} />
                        );
                        if (spec.key === "vin") return specCard(
                            <input 
                                className={`add-details-spec-input ${vinError ? "add-input-error" : ""}`}
                                placeholder="1HGCM82633A123456"
                                value={specsVals.vin || ""} 
                                disabled={isRemoved}
                                onChange={e => {
                                    const val = e.target.value.toUpperCase();
                                    setSpecsVals(p => ({ ...p, vin: val }));
                                    setVinError(validateVin(val));
                                }}
                                maxLength={17}
                            />,
                            vinError
                        );
                        if (spec.key === "owners") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                type="number" 
                                min="0" 
                                placeholder="3"
                                value={specsVals.owners || ""} 
                                disabled={isRemoved}
                                onChange={e => setSpecsVals(p => ({ ...p, owners: e.target.value }))} />
                        );
                        if (spec.key === "seats") return specCard(
                            <input 
                                className="add-details-spec-input" 
                                type="number" 
                                min="1"
                                value={specsVals.seats ?? "5"} 
                                disabled={isRemoved}
                                onChange={e => {
                                    const val = e.target.value;
                                    setSpecsVals(p => ({ ...p, seats: val === "" ? "" : String(Math.max(1, Number(val)))}));
                                }}
                            />
                        );
                        return specCard(
                            <input 
                                className="add-details-spec-input" 
                                placeholder="—"
                                value={specsVals[spec.key] || ""} 
                                disabled={isRemoved}
                                onChange={e => setSpecsVals(p => ({ ...p, [spec.key]: e.target.value }))} />
                        );
                    })}
                </div>
            </section>

            <section className="eq-section">
                <h2 className="eq-title">Features & equipment</h2>
                <div className="eq-grid">
                    {EQUIPMENT_CATS.map(cat => (
                        <div key={cat.key} className="eq-card">
                            <div className="eq-icon-wrap">
                                <img src={cat.icon} alt="" className="eq-icon" />
                                <span className="eq-cat-label">{cat.label}</span>
                            </div>
                            <ul className="eq-list">
                                {[
                                    ...cat.suggestions,
                                    ...(equipment[cat.key] || []).filter(item => !cat.suggestions.includes(item))
                                ].sort((a, b) => {
                                    const aActive = equipment[cat.key]?.includes(a) ? 1 : 0;
                                    const bActive = equipment[cat.key]?.includes(b) ? 1 : 0;
                                    return bActive - aActive;
                                }).map(item => {
                                    const active = equipment[cat.key]?.includes(item);
                                    return (
                                        <li
                                            key={item}
                                            className="eq-item"
                                            onClick={() => toggleEquip(cat.key, item)}
                                            style={{
                                                justifyContent: "space-between",
                                                opacity: active ? 1 : 0.35,
                                                transition: "opacity 0.25s",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <img src="/verified.png" alt="" className="eq-check" />
                                                {item}
                                            </span>
                                            <button
                                                className="add-details-eq-remove"
                                                onClick={e => e.stopPropagation()}
                                                style={{
                                                    fontSize: 18,
                                                    color: active ? "#e11d48" : "var(--text-secondary)",
                                                    fontWeight : 600 
                                                }}
                                            >
                                                {active ? "-" : "+"}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                                <input
                                    className="add-details-spec-input"
                                    placeholder="Add custom..."
                                    value={newEquipInput[cat.key] || ""}
                                    onChange={e => setNewEquipInput(p => ({ ...p, [cat.key]: e.target.value}))}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") addCustomEquip(cat.key);
                                    }}
                                    style={{ flex: 1 }}
                                />
                                <button 
                                    className="add-cancel-btn"
                                    style={{ padding: "6px 12px", fontSize: 13 }}
                                    onClick={() => addCustomEquip(cat.key)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-car-section">
                <div className="about-car-inner add-car-inner">
                    <div className="about-car-card">
                        <h2 className="about-car-title">About this vehicle</h2>
                        <textarea
                            className="add-textarea"
                            rows={7}
                            placeholder="Tell buyers what makes this car special..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onInput={e => {
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                        />
                    </div>
                </div>
            </section>

            <div 
                style={{ 
                    padding: "0 100px 80px", 
                    display: "flex", 
                    gap: 12, 
                    alignItems: "center" 
                }}
            >
                <button
                    className="add-submit-btn"
                    style={{ fontSize: 15, padding: "13px 36px" }}
                    onClick={handlePublish}
                    disabled={publishing}
                >
                    {publishing ? "Publishing..." : "Publish Listing"}
                </button>
                {!isNew && (
                    <button
                        className="add-cancel-btn"
                        style={{ 
                            fontSize: 15, 
                            padding: "13px 28px", 
                            color: "#e11d48", 
                            borderColor: "rgba(225,29,72,0.3)", 
                            marginLeft: "auto" 
                        }}
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        🗑 Delete Listing
                    </button>
                )}
            </div>
        </div>
    );
};

export default Add;