import { useMemo } from "react";
import { MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { ZoomAwareCircleMarker } from "./ZoomAwareCircleMarker";
import { useSensors } from "../../sensors/hooks/useSensors";
import { SensorFeature } from "../../sensors/types";
import { getColor } from "../../../utils/helpers";
import { LoadingScreen } from "../../../components/LoadingScreen";


export default function FloodMap() {
    const { data, loading, error } = useSensors(2000);

    const center = useMemo(() =>({
        lat: 14.641299831608274,
        lng: 121.08063347000564
    }), []);

    const markers = useMemo(() => {
        if (!data) return null;

        return data.features.map((feature: SensorFeature) => {
            const [lng, lat] = feature.geometry.coordinates;
            const { name, latest_reading } = feature.properties;
            const h = latest_reading.latest_flood_m;
            const color = getColor(h);

            const reportedOn = new Date(
                latest_reading.latest_reported_on
            ).toLocaleString();

            return (
                <ZoomAwareCircleMarker
                    key={feature.id ?? `${lng}-${lat}`}
                    center={[lat, lng]}
                    h={h}
                    color={color}
                >
                    <Tooltip>
                        <div>
                            <strong>{name ?? "Unnamed Sensor"}</strong><br/>
                            Flood level: {h.toFixed(2)} m<br/>
                            Reported: {reportedOn}
                        </div>
                    </Tooltip>
                </ZoomAwareCircleMarker>
            );
        });
        }, [data]);

    if (loading && !data) return  <LoadingScreen/>;
    if (error) return <div>Error loading sensors: {error.message}</div>

    return (
        <MapContainer
            center={[center.lat, center.lng]}     // from MapOptions
            zoom={13}                             // from MapOptions
            scrollWheelZoom={true}               // from MapOptions
            style={{ height: "100%", width: "100%" }}  // from style?: CSSProperties
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
    );
}
