import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onSearch: () => {},
  searchValue: () => {},
  searchList: [],
})

export default SearchContext
