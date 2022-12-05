import { ModelWithId } from "~/models/Playlist.model";
import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "~/libraries/swr.library";
import { Response } from "~/pages/api/playlist"

interface useListProps extends SWRConfiguration{
    limit: string | number,
}

export const useList = ({limit, ...config}: useListProps) => {
    const swr = useSWR<Response>(`/api/playlist?limit=${limit}`, fetcher, config);

    const isLoading = !swr.error && !swr.data;

    return {
        ...swr,
        data: swr.data?.data as ModelWithId[],
        isLoading
    }
}