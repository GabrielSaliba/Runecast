import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import { SearchContextProvider } from '../contexts/SearchContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <SearchContextProvider>
      <div className={styles.wrapper}>
        <main>
          <div id='search-modal'></div>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
      </SearchContextProvider>  
    </PlayerContextProvider>
  )
}

export default MyApp
