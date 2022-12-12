import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container, Layout, Loader } from "~/components";
import { usePlaylist } from "~/hooks/usePlaylist.hook";
import useSpotifyPlaylist from "~/hooks/useSpotifyPlaylist.hook";
import { getAllIds, getPlaylistById } from "~/libraries/api.library";
import dbConnect from "~/libraries/mongoose.library";
import { NextPageWithLayout } from "~/types/common.types";
import PlaylistView from "~/views/Playlist/Playlist.view";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = ctx.params?.id?.toString();
  await dbConnect();
  const dataDB = await getPlaylistById(id);

  if (!dataDB) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: dataDB.id,
      fallbackData: {
        dataDB,
      },
    },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = async () => {
  await dbConnect();
  const ids = await getAllIds();

  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

const Playlist: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id, fallbackData }) => {
  const [loading, setLoading] = useState<boolean>(true);
  
  const { data, isLoading } = usePlaylist({
    id,
    fallbackData,
  });

  const { isLoading: SpotifyIsLoading, mutate, SpotifyData } = useSpotifyPlaylist({
    id: fallbackData.dataDB.spotifyId,
  });

  React.useEffect(() => {
    setLoading(isLoading || SpotifyIsLoading);
  }, [isLoading, SpotifyIsLoading]);
  
  useEffect(() => {
    if(SpotifyData?.spotifyId){
      mutate();
    }
  },[SpotifyData?.spotifyId, mutate])


  return (
    <>
      <Head>
        <title>DaftAcademy - {fallbackData?.dataDB.name || ""}</title>
      </Head>
      <Container>
        {loading || !SpotifyData ? (
          <Loader />
        ) : (
          <PlaylistView
            playlist={{
              name: data?.name || "",
              owner: data?.owner || "",
              slug: data?.slug || "",
              spotifyId: data?.spotifyId || "",
              upvote: data?.upvote || 0,
              color: data?.color || "",
              url: SpotifyData?.body.external_urls.spotify,
              image: SpotifyData?.body.images[0].url,
            }}
            trackList={SpotifyData?.body.tracks.items || []}
          />
        )}
      </Container>
    </>
  );
};

export default Playlist;

Playlist.getLayout = (page) => <Layout>{page}</Layout>;
