import { FeatureCollection, Feature, Point} from "geojson";

export type SensorFeature = Feature<Point, {
    name?: string;
    latest_reading: {
        latest_flood_m: number;
        latest_reported_on: string;
    };
}>;

export type SensorFeatureCollection = FeatureCollection<Point, SensorFeature["properties"]>

export type SensorListFeature = Feature<Point, {
    id: string;
    name?: string;
    installed_on: string;
    is_active: boolean;
}>

export type SensorListFeatureCollection = FeatureCollection<Point, SensorListFeature['properties']>

export interface PaginatedSensorListResponse {
    count: number;
    next: string | null;
    prev: string | null;
    results: SensorListFeatureCollection;
}

export type ReadingSensorRecord = {
    flood_m: number;
    reported_on: string;
    created_on: string;
}

export type ReadingSensorHistory = ReadingSensorRecord[]

export type SensorDetailFeature = Feature<Point, {
    id: string;
    name?: string;
    readings: ReadingSensorHistory;
    installed_on: string;
    is_active: boolean;
}>
