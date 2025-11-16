import { http } from "../../../api/httpClient";
import {PaginatedAlertListResponse} from "../types";


export async function fetchAlertsList(
    page: number,
    pageSize: number
): Promise<PaginatedAlertListResponse> {
    const res = await http.get<PaginatedAlertListResponse>("/alert/list/", {
        params: {
            page: page + 1,
            page_size: pageSize,
        },
    });
    return res.data;
}
