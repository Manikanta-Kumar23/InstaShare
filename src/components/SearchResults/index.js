import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'

import Header from '../Header'

import SearchContext from '../SearchContext'

import PostsFeed from '../PostsFeed'

import './index.css'

class SearchResults extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchList, searchInput, searchValue, onSearch} = value
          return (
            <>
              <Header />
              <div className="usr-Bg">
                <div className="srch-crd">
                  <input
                    onChange={searchValue}
                    value={searchInput}
                    className="srch-input"
                    type="search"
                    placeholder="Search Caption"
                  />
                  <button
                    onClick={onSearch}
                    className="srch-butn"
                    type="button"
                    data-testid="searchIcon"
                  >
                    <FaSearch />
                  </button>
                </div>
                {searchList.length === 0 ? (
                  <div className="no-srch-card">
                    <img
                      alt="search not found"
                      className="no-search"
                      src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881947/Search_uyuajy.png"
                    />
                    <h1 className="srch-head">Search Not Found</h1>
                    <p className="srch-para">
                      Try different keyword or search again
                    </p>
                  </div>
                ) : (
                  <div className="result-card">
                    <h1 className="search-head">Search Results</h1>

                    <div className="post-box">
                      <ul className="posts-list">
                        {searchList.map(each => (
                          <PostsFeed list={each} key={each.postId} />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchResults
