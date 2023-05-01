import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SearchContext from '../SearchContext'

import PostsFeed from '../PostsFeed'

import './index.css'

const apiStatus = {
  initial: '',
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
}

class SearchResults extends Component {
  searchApi = () => (
    <SearchContext.Consumer>
      {value => {
        const {isLoading, searchList, searchProfile, onLike} = value
        switch (isLoading) {
          case apiStatus.inProgress:
            return (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="TailSpin"
                  color="#4094EF"
                  height={50}
                  width={50}
                />
              </div>
            )
          case apiStatus.success:
            return (
              <>
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
                          <PostsFeed
                            list={each}
                            onLike={onLike}
                            key={each.postId}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )
          case apiStatus.fail:
            return (
              <div className="fail-card">
                <img
                  alt="failure view"
                  className="fail-img"
                  src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881947/somethng-wnt-wrng_us2apd.png"
                />
                <p className="f-para">Something went wrong. Please try again</p>
                <button
                  onClick={searchProfile}
                  className="retry-button"
                  type="button"
                >
                  Try again
                </button>
              </div>
            )
          default:
            return null
        }
      }}
    </SearchContext.Consumer>
  )

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, searchValue, onSearch} = value
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
                {this.searchApi()}
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchResults
