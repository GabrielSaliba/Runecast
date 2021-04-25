import Link from 'next/link'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {
  //https://date-fns.org/v2.21.1/docs/format
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  })  

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Podcastr"/>
        </a>
      </Link>

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}