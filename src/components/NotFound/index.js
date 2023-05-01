import {withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notfound-card">
      <img
        alt="page not found"
        className="notfound-icon"
        src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881948/not-found_q40rsb.png"
      />
      <h1 className="notfound-head">Page Not Found</h1>
      <p className="notfound-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button className="notfound-button" onClick={onHome} type="button">
        Home Page
      </button>
    </div>
  )
}

export default withRouter(NotFound)
