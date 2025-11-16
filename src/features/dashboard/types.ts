
export type SummaryStats = {
    total: number;
    online: number;
    flooded: number;
    critical: number;
    alerts_24hrs: number;
}

export type FloodSeverityStats = {
    no_flood: number;
    minor: number;
    moderate: number;
    severe: number;
    extreme: number;
}

export type DashboardSummaryResponse = {
    summary: SummaryStats;
    flood_severity: FloodSeverityStats;
}


export type AverageFloodReading = {
    ts: string;
    avg_flood: number;
}

export type FloodTrend = AverageFloodReading[]
