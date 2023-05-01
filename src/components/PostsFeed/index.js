import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import {FcLike} from 'react-icons/fc'

import './index.css'

const PostsFeed = props => {
  const {list, onLike} = props
  const liked = () => {
    onLike(list.postId)
  }
  return (
    <li className="pos-card">
      <div className="user-card">
        <img
          alt="post author profile"
          className="profile-icon"
          src={list.profilePic}
        />
        <p className="pro-name">
          <Link className="link" to={`/users/${list.userId}`}>
            {list.userName}
          </Link>
        </p>
      </div>
      <img alt="post" className="post-img" src={list.imgUrl} />
      <div className="comment-card">
        <div className="btns-card">
          {list.isLike === false ? (
            <button
              onClick={liked}
              className="like-btn"
              type="button"
              data-testid="unLikeIcon"
            >
              <FcLike size={23} />
            </button>
          ) : (
            <button
              onClick={liked}
              className="like-btn"
              type="button"
              data-testid="likeIcon"
            >
              <BsHeart size={23} />
            </button>
          )}
          <button className="like-btn" type="button" data-testid="commentIcon">
            <FaRegComment size={23} />
          </button>
          <button className="like-btn" type="button" data-testid="shareIcon">
            <BiShareAlt size={23} />
          </button>
        </div>
        <p className="like-cunt">{list.likesCount} likes</p>
        <p className="caption">{list.caption}</p>
        <ul className="comment-list">
          {list.comments.map(each => (
            <li key={each.user_id}>
              <p className="caption">
                <span className="like-cunt">{each.user_name}</span>{' '}
                {each.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="time">{list.createdAt}</p>
      </div>
    </li>
  )
}

export default PostsFeed
