import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const AuthCallback = () => {
    const [params] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");
        if (!token) {
            navigate("/login"); 
            return;
        }
        fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(r => r.json())
        .then(data => {
            if (data.user) {
                login(token, data.user);
                navigate("/");
            } else navigate("/login");
        })
        .catch(() => navigate("/login"));
    }, []);

    return ( 
        <div 
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <p style={{ color: "var(--text-secondary)" }}>Signing you in...</p>
        </div>
    );
};
 
export default AuthCallback;