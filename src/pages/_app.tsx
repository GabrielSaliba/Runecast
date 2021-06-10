import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import { SearchContextProvider } from '../contexts/SearchContext'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import dark from '../styles/themes/dark'
import { useState } from 'react'
import light from '../styles/themes/light'


function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState(light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <PlayerContextProvider>
      <SearchContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className={styles.wrapper}>
            <main>
              <div id='search-modal'></div>
              <Header  />
              <Component {...pageProps} />
            </main>
            <Player toggleTheme={toggleTheme}/>
          </div>
        </ThemeProvider>
      </SearchContextProvider>
    </PlayerContextProvider>
  )
}

export default MyApp
