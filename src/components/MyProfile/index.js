import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'

import MyStories from '../MyStories'

const apiStatus = {
  initial: '',
  success: 'SUCCESS',
  fail: 'FAIL',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {isLoading: apiStatus.initial, profileList: {}}

  componentDidMount() {
    this.myProfile()
  }

  myProfile = async () => {
    this.setState({
      isLoading: apiStatus.inProgress,
    })
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      const updateData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
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

  retryProfile = () => {
    this.myProfile()
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
                  alt="my profile"
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
            <MyStories list={profileList.stories} />
            <hr className="pro-line" />
            <div className="prof-posts">
              <div className="grid-card">
                <BsGrid3X3 size={17} />
                <p className="psts">Posts</p>
              </div>
              <ul className="psts-list">
                {profileList.posts.map(each => (
                  <li className="pst-crd" key={each.id}>
                    <img alt="my post" className="post-pic" src={each.image} />
                  </li>
                ))}
              </ul>
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
              onClick={this.retryProfile}
              className="retry-button"
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

export default MyProfile
