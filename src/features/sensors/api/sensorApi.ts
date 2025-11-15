import {http} from "../../../api/httpClient";
import { SensorFeatureCollection, PaginatedSensorListResponse,
    SensorDetailFeature } from "../types";

export async function fetchSensors(): Promise<SensorFeatureCollection> {
    const res =  await http.get<SensorFeatureCollection>("/sensor/live-sensors/");
    return res.data
}

export async function fetchSensorList(
    page: number,
    pageSize: number
): Promise<PaginatedSensorListResponse> {
    const res = await http.get<PaginatedSensorListResponse>("/sensor/list/", {
        params: {
            page: page + 1,      // DataGrid is 0-based, API is 1-based
            page_size: pageSize, // remove this line if your API doesn’t support it
        },
    });
    return res.data;
}

export async function fetchSensorDetail(sensorId?: string): Promise<SensorDetailFeature> {
    const res = await http.get<SensorDetailFeature>(`sensor/detail/${sensorId}`);
    return res.data
}
