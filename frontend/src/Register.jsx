import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registration failed");
                return;
            }
            login(data.token, data.user);
            navigate("/");
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="auth-page">
            <div className="auth-card">
                <img src="/car.png" alt="carcity logo" className="auth-logo" />
                <h1 className="auth-title">Create account</h1>
                <p className="auth-sub">Join Carcity in seconds</p>
                <div className="auth-box">
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label className="auth-label">Full name</label>
                            <input 
                                className="auth-input"
                                type="text"
                                placeholder="Jane Doe"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-field">
                            <label className="auth-label">Email</label>
                            <input 
                                className="auth-input"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input 
                                className="auth-input"
                                type="password"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="auth-error">{error}</p>}

                        <button 
                            className="auth-submit-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create account"}
                        </button>

                        <div className="auth-divider"><span>OR SIGN UP WITH GOOGLE</span></div>

                        <a 
                            href="http://localhost:5000/api/auth/google"
                            className="auth-google-btn"
                        >
                            <img src="/google.png" alt="Google" className="auth-google-icon"/>
                            Continue with Google
                        </a>
                    </form>
                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login" className="auth-switch-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default Register;