import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import { SearchContextProvider } from '../contexts/SearchContext'
import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'
import light from '../styles/themes/light'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <SearchContextProvider>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <div className={styles.wrapper}>
            <main>
              <div id='search-modal'></div>
              <Header />
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
        </ThemeProvider>
      </SearchContextProvider>
    </PlayerContextProvider>
  )
}

export default MyApp
