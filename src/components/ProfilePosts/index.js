import './index.css'

const ProfilePosts = props => {
  const {list} = props
  return (
    <ul className="psts-list">
      {list.map(each => (
        <li className="pst-crd" key={each.id}>
          <img alt="user post" className="post-pic" src={each.image} />
        </li>
      ))}
    </ul>
  )
}

export default ProfilePosts
