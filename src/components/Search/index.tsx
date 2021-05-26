import ReactDom from 'react-dom'
import styles from './search.module.scss'

export function Search({open, close}) {
  if (open == false) return (<div></div>)

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay_styles} onClick={close}></div>
      <div>
        <input className={styles.modal_styles}></input>
      </div>
    </>,
    document.getElementById('search-modal')
  )
}