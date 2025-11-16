import { useState, useMemo } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { useAlertsList } from "../hooks/useAlertsList";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";


export function AlertList() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const { data, loading, error } = useAlertsList(
        paginationModel.page,
        paginationModel.pageSize
    );

    const navigate = useNavigate();

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "sensor",
                headerName: "Sensor",
                width: 220,
                renderCell: (params) => (
                    <Button
                        variant={"text"}
                        color={"primary"}
                        sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const id = params.value as string;
                            navigate(`/sensors/${id}`);
                        }}
                    >
                        {params.value}
                    </Button>
                ),
            },
            { field: "lon", headerName: "Longitude", type: "number", width: 150 },
            { field: "lat", headerName: "Latitude", type: "number", width: 150 },
            { field: "flood_m", headerName: "Flood Height", type: "number", width: 150 },
            { field: "message", headerName: "Message", width: 300, type: "string" },
            { field: "reported_on", headerName: "Reported Date", width: 220 }
        ], [navigate]
    );

    const rows = useMemo(() => {
        if (!data) return [];
        return data.results.map((alertRecord, idx) => {
            const [lon, lat] = alertRecord.sensor.geometry.coordinates;
            const sensor = alertRecord.sensor.id;
            const flood_m  = alertRecord.reading.flood_m;
            const message = alertRecord.message;
            const reported_on = alertRecord.reported_on;

            return {
                id: alertRecord.id,
                sensor: sensor,
                lon,
                lat,
                flood_m: flood_m,
                message: message,
                reported_on: new Date(reported_on).toLocaleString(),
            };
        });
    }, [data]);

    if (loading && !data) return <LoadingScreen />;
    if (error) return <div>Error loading sensors: {error.message}</div>;

    return (
        <Paper sx={{ height: "100%", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationMode={"server"}
                rowCount={data?.count ?? 0}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
