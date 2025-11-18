import {http} from "../../../api/httpClient";
import { SensorFeatureCollection, PaginatedSensorListResponse,
    SensorDetailFeature, SensorAlertList, ReadingSensorHistory } from "../types";

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
            page: page + 1,
            page_size: pageSize,
        },
    });
    return res.data;
}

export async function fetchSensorDetail(sensorId?: string): Promise<SensorDetailFeature> {
    const res = await http.get<SensorDetailFeature>(`sensor/detail/${sensorId}`);
    return res.data
}

export async function fetchSensorDetailReadings(sensorId?: string): Promise<ReadingSensorHistory> {
    const res = await http.get<ReadingSensorHistory>(`/sensor/detail/${sensorId}/readings`);
    return res.data
}


export async function fetchSensorDetailAlerts(sensorId?: string): Promise<SensorAlertList> {
    const res = await http.get<SensorAlertList>(`/sensor/detail/${sensorId}/alerts`);
    return res.data
}

