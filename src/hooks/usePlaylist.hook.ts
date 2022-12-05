import { ModelWithId } from "~/models/Playlist.model";
import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "~/libraries/swr.library";
import { Response } from "~/pages/api/playlist"

interface usePlaylistProps extends SWRConfiguration{
    id: string,
}

export const usePlaylist = ({id, ...config}: usePlaylistProps) => {
    const swr = useSWR<Response>(`/api/playlist/${id}`, fetcher, config);

    const isLoading = !swr.error && !swr.data;

    return {
        ...swr,
        data: swr.data?.data as ModelWithId[],
        isLoading
    }
}
