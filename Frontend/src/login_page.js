import { Component } from "react"
import withNavigate from './withNavigate'
import './login_page.css'


class Loginpage extends Component {
    state={email:"", password:'', errormessage:""}

    handleEmail = (e) => {
      this.setState({email:e.target.value})
    }

    handlePassword = (e) => {
      this.setState({password:e.target.value})
    }

    submitForm = async event => {
      event.preventDefault()
      const {email, password} = this.state
      const userDetails = {email, password}
      const url = 'http://localhost:3300/login'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      //const data = await response.json()
      if (response.ok === true) {
        this.props.navigate('/home');
      } else {
        this.setState({errormessage:"* Wrong User Credentials"})
      }
    }


    registerUser = () => {
        this.props.navigate('/userregister');
      }

  render(){
    const { email, password, errormessage} = this.state

    return(
      <div className="total-cont">
      <div className="login-form">
        <p className="error-message">{errormessage}</p>
        <label>Enter Your Email Address</label>
        <br/>
        <input className="input-field" type="email" value={email} placeholder="Enter Email" onChange={this.handleEmail} />
        <br/>
        <label>Enter Your Password</label>
        <br/>
        <input className="input-field" type="password" value={password} placeholder="Enter Password" onChange={this.handlePassword}/>
        <br/>
        <button className="login-btn" onClick={this.submitForm}>Login</button>
        <br/>
        <button className="register-btn" onClick={this.registerUser}>Create an Account</button>
      </div>
      </div>
    )
  }
}

export default withNavigate(Loginpage)

//export default Loginpage