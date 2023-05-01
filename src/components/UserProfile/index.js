import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import ProfileStories from '../ProfileStories'

import ProfilePosts from '../ProfilePosts'

import './index.css'

const apiStatus = {
  initial: '',
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {isLoading: apiStatus.initial, profileList: {}}

  componentDidMount() {
    this.userProfile()
  }

  userProfile = async () => {
    this.setState({
      isLoading: apiStatus.inProgress,
    })
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      const updateData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }
      this.setState({
        isLoading: apiStatus.success,
        profileList: updateData,
      })
    } else {
      this.setState({
        isLoading: apiStatus.fail,
      })
    }
  }

  retryUser = () => {
    this.userProfile()
  }

  profileData = () => {
    const {isLoading, profileList} = this.state
    switch (isLoading) {
      case apiStatus.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatus.success:
        return (
          <div className="userpro-card">
            <div className="bio-card">
              <h1 className="usr-nmes">{profileList.userName}</h1>
              <div className="mob-count">
                <img
                  alt="user profile"
                  className="dis-pic"
                  src={profileList.profilePic}
                />
                <div className="follow-mob-cunt">
                  <div className="count-card">
                    <p className="count">{profileList.postsCount}</p>
                    <p className="pra">posts</p>
                  </div>
                  <div className="count-card">
                    <p className="count">{profileList.followersCount}</p>
                    <p className="pra">followers</p>
                  </div>
                  <div className="count-card">
                    <p className="count">{profileList.followingCount}</p>
                    <p className="pra">following</p>
                  </div>
                </div>
              </div>
              <div className="bio">
                <h1 className="usr-nme">{profileList.userName}</h1>
                <div className="follow-cunt">
                  <div className="count-card">
                    <p className="count">{profileList.postsCount}</p>
                    <p className="pra">posts</p>
                  </div>
                  <div className="count-card">
                    <p className="count">{profileList.followersCount}</p>
                    <p className="pra">followers</p>
                  </div>
                  <div className="count-card">
                    <p className="count">{profileList.followingCount}</p>
                    <p className="pra">following</p>
                  </div>
                </div>
                <p className="userId">{profileList.userId}</p>
                <p className="userBio">{profileList.userBio}</p>
              </div>
            </div>
            <ProfileStories list={profileList.stories} />
            <hr className="pro-line" />
            <div className="prof-posts">
              <div className="grid-card">
                <BsGrid3X3 size={17} />
                <h1 className="psts">Posts</h1>
              </div>
              {profileList.posts.length === 0 ? (
                <div className="no-post">
                  <div className="camera">
                    <BiCamera />
                  </div>
                  <h1 className="no-psts">No Posts Yet</h1>
                </div>
              ) : (
                <ProfilePosts list={profileList.posts} />
              )}
            </div>
          </div>
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
              onClick={this.retryUser}
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
  }

  render() {
    const {isLoading} = this.state
    const height = isLoading !== apiStatus.success ? 'height' : null
    return (
      <>
        <Header />
        <div className={`user-bg ${height}`}>{this.profileData()}</div>
      </>
    )
  }
}

export default UserProfile
