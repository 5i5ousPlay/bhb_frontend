import {useEffect, useState} from "react";
import {fetchSensorDetail} from "../api/sensorApi";
import {SensorDetailFeature} from "../types";


export function useSensorDetail(sensorId?: string) {
    const [data, setData] = useState<SensorDetailFeature | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!sensorId) {
            setData(null);
            setError(new Error("Missing sensor ID"));
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const sensorDetail = await fetchSensorDetail(sensorId);
                if (!cancelled) {
                    setData(sensorDetail);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) setError(err as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };

    }, [sensorId]);

    return { data, loading, error };
}
