import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userInput: '', pswdInput: '', isErr: false, errMssg: ''}

  onUser = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  onPswd = event => {
    this.setState({
      pswdInput: event.target.value,
    })
  }

  onLogin = async event => {
    const {userInput, pswdInput} = this.state
    event.preventDefault()
    const userDetails = {username: userInput, password: pswdInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFail(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 23})
    history.replace('/')
  }

  onFail = errMssg => {
    this.setState({
      isErr: true,
      errMssg,
    })
  }

  render() {
    const {userInput, pswdInput, isErr, errMssg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <img
          alt="website login"
          className="login-img"
          src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881947/Login-img_p680yf.png"
        />
        <form onSubmit={this.onLogin} className="login-form">
          <div className="logo-card">
            <img
              alt="website logo"
              className="logo"
              src="https://res.cloudinary.com/djwve85r0/image/upload/v1681881947/Logo_yf6yuz.png"
            />
            <h1 className="name">Insta Share</h1>
          </div>
          <div className="inp-card">
            <label className="label" htmlFor="input">
              USERNAME
            </label>
            <br />
            <input
              onChange={this.onUser}
              value={userInput}
              className="input"
              type="text"
              id="input"
            />
            <br />
          </div>
          <div className="inp-card">
            <label className="label" htmlFor="pswd">
              PASSWORD
            </label>
            <br />
            <input
              onChange={this.onPswd}
              value={pswdInput}
              className="input"
              type="password"
              id="pswd"
            />
            <br />
          </div>
          {isErr && <p className="err">{errMssg}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
