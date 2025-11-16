import { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSensorList } from "../hooks/useSensorList";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

export function SensorList() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const { data, loading, error } = useSensorList(
        paginationModel.page,
        paginationModel.pageSize
    );

    const navigate = useNavigate();

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                width: 220,
                renderCell: (params) => (
                    <Button
                        variant="text"
                        color="primary"
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
            { field: "name", headerName: "Sensor Name", width: 200 },
            { field: "lon", headerName: "Longitude", type: "number", width: 150 },
            { field: "lat", headerName: "Latitude", type: "number", width: 150 },
            { field: "installed_on", headerName: "Installation Date", width: 220 },
            { field: "is_active", headerName: "Active?", width: 120 },
        ],
        [navigate]
    );

    const rows = useMemo(() => {
        if (!data) return [];
        return data.results.features.map((feature, idx) => {
            const [lon, lat] = feature.geometry.coordinates;
            const { name, installed_on, is_active } = feature.properties;

            return {
                id: feature.id ?? idx,
                name: name || "",
                lon,
                lat,
                installed_on: new Date(installed_on).toLocaleString(),
                is_active: is_active ? "Yes" : "No",
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
                loading={loading}
                paginationMode="server"
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