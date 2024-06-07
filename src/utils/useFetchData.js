import { useState, useEffect } from "react";

export const useFetchData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [apiData, setApiData] = useState(undefined);

    useEffect(() => {
        fetch('https://api-eu.okotoki.com/coins')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setApiData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { apiData, loading, error };
};
