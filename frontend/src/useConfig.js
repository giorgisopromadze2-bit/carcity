import { useEffect, useState } from "react";

const cache = {};

export const useConfig = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cache.data) {
            setConfig(cache.data);
            setLoading(false);
            return;
        }
        fetch("http://localhost:5000/api/config")
            .then(r => r.json())
            .then(data => {
                cache.data = data;
                setConfig(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { config, loading };
};