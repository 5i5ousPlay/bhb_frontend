import { SensorListFeature, ReadingSensorRecord } from "../sensors/types";


export type AlertListRecord = {
    id: number;
    sensor: SensorListFeature;
    reading: ReadingSensorRecord;
    message: string;
    reported_on: string;
}

export type AlertListResults = AlertListRecord[]

export type PaginatedAlertListResponse = {
    count: number;
    next: string | null;
    prev: string | null;
    results: AlertListResults;
}
