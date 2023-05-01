import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import {HiMenu} from 'react-icons/hi'

import {AiFillCloseCircle} from 'react-icons/ai'

import SearchContext from '../SearchContext'

import './index.css'

class Header extends Component {
  state = {isShow: false, pathId: ''}

  componentDidMount() {
    const {location} = this.props
    this.setState({
      pathId: location.pathname,
    })
  }

  onMenu = () => {
    this.setState(PrevState => ({
      isShow: !PrevState.isShow,
    }))
  }

  onClose = () => {
    this.setState({
      isShow: false,
    })
  }

  onSignOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isShow, pathId} = this.state
    const homeColor = pathId === '/' ? 'color' : null
    const profColor = pathId === '/my-profile' ? 'color' : null
    const srchColor = pathId === '/search-results' ? 'color' : null
    const display = isShow === true ? 'flex' : 'none'
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchInput, onSearch, searchValue} = value
          return (
            <>
              <nav className="nav-bar">
                <div className="nav-card">
                  <Link to="/">
                    <img
                      alt="website logo"
                      className="nav-logo"
                      src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881947/Logo_yf6yuz.png"
                    />
                  </Link>
                  <h1 className="web-name">Insta Share</h1>
                </div>
                <ul className="desk-nav">
                  <li className="srch-card">
                    <input
                      onChange={searchValue}
                      value={searchInput}
                      className="search-input"
                      type="search"
                      placeholder="Search Caption"
                    />
                    <button
                      onClick={onSearch}
                      className="srch-btn"
                      type="button"
                      data-testid="searchIcon"
                    >
                      <FaSearch />
                    </button>
                  </li>
                  <li className="desk-para">
                    <Link to="/" className={`link ${homeColor}`}>
                      Home
                    </Link>
                  </li>
                  <li className="desk-para">
                    <Link to="/my-profile" className={`link ${profColor}`}>
                      Profile
                    </Link>
                  </li>
                  <li className="desk-para">
                    <button
                      onClick={this.onSignOut}
                      className="log-btn"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                <button
                  onClick={this.onMenu}
                  className="menu-btn"
                  type="button"
                >
                  <HiMenu size={24} />
                </button>
              </nav>
              <hr className="nav-line" />
              <div className="show">
                <ul style={{display}} className="mob-nav">
                  {isShow && (
                    <>
                      <li className="desk-para">
                        <Link to="/" className={`link ${homeColor}`}>
                          Home
                        </Link>
                      </li>
                      <li className="desk-para">
                        <Link
                          className={`link ${srchColor}`}
                          to="/search-results"
                        >
                          Search
                        </Link>
                      </li>
                      <li className="desk-para">
                        <Link to="/my-profile" className={`link ${profColor}`}>
                          Profile
                        </Link>
                      </li>
                      <li className="btn">
                        <button
                          onClick={this.onSignOut}
                          className="log-btn"
                          type="button"
                        >
                          Logout
                        </button>
                      </li>
                      <li className="desk-para">
                        <button
                          onClick={this.onClose}
                          className="close-btn"
                          type="button"
                        >
                          <AiFillCloseCircle size={20} />
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
