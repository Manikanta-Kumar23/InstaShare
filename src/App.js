import {Component} from 'react'

import {Route, Switch, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import SearchContext from './components/SearchContext'

import Login from './components/Login'

import Home from './components/Home'

import NotFound from './components/NotFound'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import SearchResults from './components/SearchResults'

import AuthenticateUser from './components/AuthenticateUser'

import './App.css'

const apiStatus = {
  initial: '',
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {searchInput: '', searchList: [], isLoading: apiStatus.initial}

  onSearchValue = async () => {
    const {history} = this.props
    history.push('/search-results')
    this.setState({
      isLoading: apiStatus.inProgress,
    })
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      const updateData = data.posts.map(each => ({
        comments: each.comments,
        createdAt: each.created_at,
        likesCount: each.likes_count,
        caption: each.post_details.caption,
        imgUrl: each.post_details.image_url,
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        isLike: true,
      }))
      this.setState({
        searchList: updateData,
        isLoading: apiStatus.success,
      })
    } else {
      this.setState({
        isLoading: apiStatus.fail,
      })
    }
  }

  onLike = async id => {
    const {searchList} = this.state
    const index = searchList.findIndex(each => each.postId === id)
    const likeStatus = searchList[index].isLike
    const details = {like_status: likeStatus}
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify(details),
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (data.message !== 'Post has been liked') {
      this.setState(prevState => ({
        searchList: prevState.searchList.map(each => {
          if (each.postId === id) {
            return {
              ...each,
              isLike: !each.isLike,
              likesCount: each.likesCount - 1,
            }
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        searchList: prevState.searchList.map(each => {
          if (each.postId === id) {
            return {
              ...each,
              isLike: !each.isLike,
              likesCount: each.likesCount + 1,
            }
          }
          return each
        }),
      }))
    }
  }

  searchProfile = () => {
    this.onSearchValue()
  }

  searchValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput, searchList, isLoading} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          onSearch: this.onSearchValue,
          searchValue: this.searchValue,
          searchList,
          isLoading,
          searchProfile: this.searchProfile,
          onLike: this.onLike,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthenticateUser exact path="/" component={Home} />
          <AuthenticateUser exact path="/my-profile" component={MyProfile} />
          <AuthenticateUser exact path="/users/:id" component={UserProfile} />
          <AuthenticateUser
            exact
            path="/search-results"
            component={SearchResults}
          />
          <Route component={NotFound} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default withRouter(App)
