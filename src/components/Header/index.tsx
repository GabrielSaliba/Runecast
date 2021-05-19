import Link from 'next/link'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {
  //https://date-fns.org/v2.21.1/docs/format
  const date = new Date();
  const dayOfWeek = format(date, "EEEE, ", { locale: ptBR });
  const dayOfMonth = format(date, "dd", { locale: ptBR });
  const month = format(date, "MMMM", { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Podcastr" />
        </a>
      </Link>

      <p>As histórias, contos e lendas de Runeterra</p>

      <p>
        {dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)}
        {dayOfMonth} de {month[0].toUpperCase() + month.slice(1)}
      </p>
    </header>
  );
}