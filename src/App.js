import {Component} from 'react'

import {Route, Switch, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import SearchContext from './components/SearchContext'

import Home from './components/Home'

import Login from './components/Login'

import NotFound from './components/NotFound'

import MyProfile from './components/MyProfile'

import UserProfile from './components/UserProfile'

import SearchResults from './components/SearchResults'

import AuthenticateUser from './components/AuthenticateUser'

import './App.css'

class App extends Component {
  state = {searchInput: '', searchList: []}

  onSearch = async () => {
    const {history} = this.props
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
        isLike: false,
      }))
      this.setState({
        searchList: updateData,
      })
    }
    history.push('/search-results')
  }

  searchValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput, searchList} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          onSearch: this.onSearch,
          searchValue: this.searchValue,
          searchList,
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
