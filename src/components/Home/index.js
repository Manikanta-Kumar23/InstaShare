import {Component} from 'react'

import Cookies from 'js-cookie'

import {TiWarning} from 'react-icons/ti'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import StoriesFeed from '../StoriesFeed'

import PostsFeed from '../PostsFeed'

import './index.css'

const apiStatus = {
  initial: '',
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isLoading: apiStatus.initial,
    stryList: [],
    isProLoading: apiStatus.initial,
    postList: [],
  }

  componentDidMount() {
    this.storiesApi()
    this.postsApi()
  }

  storiesApi = async () => {
    this.setState({
      isLoading: apiStatus.inProgress,
    })
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      const updateList = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        isLoading: apiStatus.success,
        stryList: updateList,
      })
    } else {
      this.setState({
        isLoading: apiStatus.fail,
      })
    }
  }

  postsApi = async () => {
    this.setState({
      isProLoading: apiStatus.inProgress,
    })
    const url = 'https://apis.ccbp.in/insta-share/posts'
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
        postList: updateData,
        isProLoading: apiStatus.success,
      })
    } else {
      this.setState({
        isProLoading: apiStatus.fail,
      })
    }
  }

  onLike = async id => {
    const {postList} = this.state
    const index = postList.findIndex(each => each.postId === id)
    const likeStatus = postList[index].isLike
    const details = {like_status: !likeStatus}
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify(details),
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (data.message === 'Post has been liked') {
      this.setState(prevState => ({
        postList: prevState.postList.map(each => {
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
    } else {
      this.setState(prevState => ({
        postList: prevState.postList.map(each => {
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
    }
  }

  retryPost = () => {
    this.postsApi()
  }

  retryStry = () => {
    this.storiesApi()
  }

  storyFeed = () => {
    const {isLoading, stryList} = this.state
    switch (isLoading) {
      case apiStatus.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatus.success:
        return <StoriesFeed list={stryList} />
      case apiStatus.fail:
        return (
          <div className="story-fail">
            <div className="stry-warn">
              <TiWarning size={22} />
            </div>
            <p className="fail-pra">Something went wrong. Please try again</p>
            <button onClick={this.retryStry} className="rty-btn" type="button">
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  postFeed = () => {
    const {isProLoading, postList} = this.state
    switch (isProLoading) {
      case apiStatus.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatus.success:
        return (
          <ul className="posts-list">
            {postList.map(each => (
              <PostsFeed list={each} onLike={this.onLike} key={each.postId} />
            ))}
          </ul>
        )
      case apiStatus.fail:
        return (
          <div className="home-fail">
            <div className="warn">
              <TiWarning size={44} />
            </div>
            <p className="fail-para">Something went wrong. Please try again</p>
            <button
              onClick={this.retryPost}
              className="retry-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {isProLoading} = this.state
    const height = isProLoading !== apiStatus.success ? 'height' : null
    const styles = isProLoading !== apiStatus.success ? 'fail' : null
    return (
      <>
        <Header />
        <div className={`BG ${height}`}>
          <div className="stry-card">{this.storyFeed()}</div>
          <hr className="home-line" />
          <div className={`post-card ${styles} ${height}`}>
            {this.postFeed()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
