import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onSearchValue: () => {},
  searchValue: () => {},
  searchList: [],
  isLoading: '',
  searchProfile: () => {},
  onLike: () => {},
})

export default SearchContext
