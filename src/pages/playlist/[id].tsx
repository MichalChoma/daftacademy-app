import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { Container, Layout } from "~/components";
import { usePlaylist } from "~/hooks/usePlaylist.hook";
import { getAllIds, getPlaylistById } from "~/libraries/api.library";
import dbConnect from "~/libraries/mongoose.library";
import { NextPageWithLayout } from "~/types/common.types";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = ctx.params?.id?.toString();
  await dbConnect();
  const data = await getPlaylistById(id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: data.id,
      fallbackData: {
        data,
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
    fallback: true,
  };
};

const Playlist: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ id, fallbackData }) => {

    const { data, isLoading} = usePlaylist({
        id,
        fallbackData,
        revalidateOnMount: false,
    });
  return (
    <>
        <Head>
            <title>DaftAcademy - lista</title>
        </Head>
      <Container>
        PlaylistId: {id}
      </Container>
    </>
  );
};

export default Playlist;

Playlist.getLayout = (page) => <Layout>{page}</Layout>;
