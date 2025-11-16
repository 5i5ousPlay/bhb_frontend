import { http } from "../../../api/httpClient";
import { DashboardSummaryResponse, FloodTrend } from "../types";
import { AlertListResults } from "../../alerts/types";


export async function fetchDashboardSummary():Promise<DashboardSummaryResponse> {
    const res = await http.get<DashboardSummaryResponse>('/dashboard/summary/');
    return res.data
}

export async function fetchFloodTrend(mode: string): Promise<FloodTrend> {
    const res = await http.get<FloodTrend>(`/dashboard/flood-trend/?mode=${mode}`)
    return res.data
}

export async function fetchRecentAlerts(): Promise<AlertListResults> {
    const res = await http.get<AlertListResults>('dashboard/recent-alerts/');
    return res.data
}
