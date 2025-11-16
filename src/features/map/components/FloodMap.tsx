import { useMemo, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import { ZoomAwareCircleMarker } from "./ZoomAwareCircleMarker";
import { useSensors } from "../../sensors/hooks/useSensors";
import { SensorFeature, SensorFeatureCollection } from "../../sensors/types";
import { getColor } from "../../../utils/helpers";
import { LoadingScreen } from "../../../components/LoadingScreen";

function FloodMapInner({
                           data,
                           targetSensorId,
                       }: {
    data: SensorFeatureCollection;
    targetSensorId?: string | null;
}) {
    const map = useMap();
    const navigate = useNavigate();

    // If a sensor id is provided in the query params, find it
    const targetSensor = useMemo(() => {
        if (!targetSensorId) return null;
        return data.features.find((f) => f.id === targetSensorId) ?? null;
    }, [data, targetSensorId]);

    // Center + zoom on that sensor once data is available
    const hasCenteredRef = useRef(false);

    useEffect(() => {
        if (!targetSensor || hasCenteredRef.current) return;

        const [lng, lat] = targetSensor.geometry.coordinates;
        map.setView([lat, lng], 17, { animate: true });

        hasCenteredRef.current = true;
    }, [map, targetSensor]);

    // Build markers
    const markers = useMemo(() => {
        return data.features.map((feature: SensorFeature) => {
            const id = feature.id;
            const [lng, lat] = feature.geometry.coordinates;
            const { name, latest_reading } = feature.properties;
            const h = latest_reading.latest_flood_m;
            const color = getColor(h);

            const reportedOn = new Date(
                latest_reading.latest_reported_on
            ).toLocaleString();

            return (
                <ZoomAwareCircleMarker
                    key={id ?? `${lng}-${lat}`}
                    center={[lat, lng]}
                    h={h}
                    color={color}
                    onClick={() => navigate(`/sensors/${id}`)}
                >
                    <Tooltip>
                        <div>
                            <strong>{name ?? "Unnamed Sensor"}</strong>
                            <br />
                            Flood level: {h.toFixed(2)} m
                            <br />
                            Reported: {reportedOn}
                        </div>
                    </Tooltip>
                </ZoomAwareCircleMarker>
            );
        });
    }, [data, navigate]);

    return <>{markers}</>;
}

export default function FloodMap() {
    const { data, loading, error } = useSensors(2000);
    const [searchParams] = useSearchParams();
    const targetSensorId = searchParams.get("sensor");

    const center = useMemo(
        () => ({
            lat: 14.641299831608274,
            lng: 121.08063347000564,
        }),
        []
    );

    if (loading && !data) return <LoadingScreen />;
    if (error) return <div>Error loading sensors: {error.message}</div>;
    if (!data) return null;

    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render markers + optional centering logic */}
            <FloodMapInner data={data} targetSensorId={targetSensorId} />
        </MapContainer>
    );
}
