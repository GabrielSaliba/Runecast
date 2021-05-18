import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../services/api';
import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns';
import { convertDurationToTimeString } from '../../utils/convertDuration';
import styles from '../episodes/episode.module.scss'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { usePlayer } from '../../contexts/PlayerContext';
import { formatDate } from '../../utils/formatDate';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  banner: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  description: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {

  const { play } = usePlayer();

  return (
    <div className={styles.main}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={styles.episode}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>
          <Image
            width={700}
            height={250}
            src={episode?.banner ?? episode.thumbnail}
            objectPosition={'50% 20%'}
            objectFit="cover"
          />
          <button type="button" onClick={() => play(episode)}>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { slug } = ctx.params;
  const { data } = await api.get(`episodes/${slug}`)
  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    banner: data.banner,
    members: data.members,
    publishedAt: formatDate(data.published_at),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString((data.file.duration)),
    description: data.description,
    url: data.file.url,
  };
  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}