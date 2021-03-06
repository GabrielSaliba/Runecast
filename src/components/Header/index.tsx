import Link from 'next/link'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles.module.scss'
import { Search } from '../Search';
import { useContext, useState } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { ThemeContext } from 'styled-components';


export function Header() {
  //https://date-fns.org/v2.21.1/docs/format
  const date = new Date();
  const dayOfWeek = format(date, "EEEE, ", { locale: ptBR });
  const dayOfMonth = format(date, "dd", { locale: ptBR });
  const month = format(date, "MMMM", { locale: ptBR });
  const {title} = useContext(ThemeContext);

  const { clearSearch } = useSearch()

  const [modal, setModal] = useState(false)
  const logo = title === 'light' ? 'logo' : 'logo-white'

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a onClick={clearSearch}>
          <img src={`/${logo}.png`} alt="Runecast" />
        </a>
      </Link>

      <p>As histórias, contos e lendas de Runeterra</p>

      <p>
        {dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1)}
        {dayOfMonth} de {month[0].toUpperCase() + month.slice(1)}
      </p>

      <span>
        <div onClick={() => setModal(true)}><SearchIcon /></div>
      </span>
      <Search open={modal} close={() => setModal(false)}></Search>
    </header>
  );
}