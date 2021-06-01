import ReactDom from 'react-dom'
import { useSearch } from '../../contexts/SearchContext';
import styles from './search.module.scss'

export function Search({ open, close }) {

  if (open == false) return (<div></div>)

  const { search } = useSearch();

  function executeSearch(searchInput) {
    search(searchInput.target.value);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      close()
    }
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay_styles} onClick={close}></div>
      <div>
        <input
          id="search_input"
          placeholder="Pesquisar..."
          className={styles.modal_styles}
          onKeyPress={handleKeyPress}
          onChange={executeSearch}
          autoFocus
        />
      </div>
    </>,
    document.getElementById('search-modal')
  )
}