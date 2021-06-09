import { GetStaticProps } from 'next';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDuration';

import styles from './home.module.scss';
import { usePlayer } from '../contexts/PlayerContext';
import { formatDate } from '../utils/formatDate';
import { useSearch } from '../contexts/SearchContext';
import Episode from './episodes/[slug]';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  featured: string
}

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export function getSearchedEpisodes() {

  const { searchString, setSearchedEpisodesList } = useSearch();
  // filtrar: data publicação
  // ordem: decrescente
  // pesquisar por título
  api.get('episodes', {
    params: {
      title_like: searchString,
      _sort: 'published_at',
      _order: 'desc'
    }
  }).then(response => {
    const episodes = response.data.map(episode => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: formatDate(episode.published_at),
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString((episode.file.duration)),
        url: episode.file.url,
      };
    })
    setSearchedEpisodesList(episodes);
  })
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {

  const { playList, play } = usePlayer();
  const { searchString, searchedEpisodes, clearSearch } = useSearch();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  if (searchString) {
    getSearchedEpisodes();

    return (
      <div className={styles.homepage}>
        <h2>Resultados encontrados para "{searchString}"</h2>
        <section className={styles.searchedEpisodes}>
          <button onClick={clearSearch}><span>&larr;</span> Voltar</button>
          <ul>
            {searchedEpisodes.map((episode) => {
              return (
                <li key={episode.id}>
                  <div style={{ width: 100 }}>
                    <Image
                      width={192}
                      height={192}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </div>

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type="button" onClick={() => play(episode)}>
                    <img src="/play-yellow.svg" alt="Tocar episódio" />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    )
  }


  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Runecast</title>
      </Head>

      <section className={styles.featuredEpisodes}>
        <h1>Destaques</h1>

        <ul>
          {allEpisodes.map((episode, index) => {
            if (episode.featured == 'true') {
              return (
                <li key={episode.id}>
                  <div style={{ width: 100 }}>
                    <Image
                      width={192}
                      height={192}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </div>

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type="button" onClick={() => play(episode)}>
                    <img src="/play-yellow.svg" alt="Tocar episódio" />
                  </button>
                </li>
              )
            }
          })}
        </ul>
      </section>

      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <div style={{ width: 100 }}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </div>

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => playList(episodeList, index)}>
                  <img src="/play-yellow.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Título</th>
            <th>Campeão</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 105 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-yellow.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // filtrar: data publicação
  // ordem: decrescente
  const { data } = await api.get('episodes', {
    params: {
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes: Episode[] = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: formatDate(episode.published_at),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString((episode.file.duration)),
      url: episode.file.url,
      featured: episode.featured
    };
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}