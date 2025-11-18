import { useEffect, useState } from "react";
import { fetchSensorDetailAlerts } from "../api/sensorApi";
import { SensorAlertList } from "../types";


export function useSensorDetailAlerts(pollInterval = 5000, sensorId?: string) {
    const [alerts, setAlerts] = useState<SensorAlertList>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function load() {
        try {
            const sensorAlerts = await fetchSensorDetailAlerts(sensorId);
            setAlerts(sensorAlerts);
            setError(null);
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        const id =  setInterval(load, pollInterval);
        return () => clearInterval(id)
    }, [pollInterval]);

    return { alerts, loading, error, refetch: load };
}

