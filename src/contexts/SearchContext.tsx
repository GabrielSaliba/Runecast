import { ReactNode, useState } from "react"
import { createContext, useContext } from "react"

type SearchContextData = {
  searchString: string;
  searchedEpisodes;
  search: (searchInput: string) => void;
  setSearchedEpisodesList: (episodes) => void;
  clearSearch: () => void;
}

export const SearchContext = createContext({} as SearchContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export function SearchContextProvider({ children }: PlayerContextProviderProps) {

  const [searchString, setSearchString] = useState('')
  const [searchedEpisodes, setSearchedEpisodes] = useState([])

  function search(searchInput: string) {
    setSearchString(searchInput);
  }

  function setSearchedEpisodesList(episodes) {
    setSearchedEpisodes(episodes);
  }

  function clearSearch() {
    setSearchString(null)
  }

  return (<SearchContext.Provider value={{
    searchString,
    clearSearch,
    searchedEpisodes,
    setSearchedEpisodesList,
    search
  }}>

    {children}
  </SearchContext.Provider>
  )
}

export const useSearch = () => {
  return useContext(SearchContext);
}