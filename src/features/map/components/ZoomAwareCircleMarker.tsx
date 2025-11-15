import { CircleMarker } from "react-leaflet";
import { useMap } from "react-leaflet";
import { getBaseRadius } from "../../../utils/helpers";

export function ZoomAwareCircleMarker({ children, h, center, color }: any) {
    const map = useMap();
    const zoom = map.getZoom();

    // scale factor—tweak to taste
    const BASE_ZOOM = 13;
    const zoomScale = zoom / BASE_ZOOM;
    const radius = getBaseRadius(h) * zoomScale;


    return (
        <CircleMarker
            center={center}
            radius={radius}
            pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.7,
            }}
        >
            {children}
        </CircleMarker>
    );
}
