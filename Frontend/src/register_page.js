import {Component} from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from './firebase'
import "./register_page.css"
import withNavigate from './withNavigate'


class UserRegister extends Component {

  state={mobileNumber:"", otp:"", name:"", email:"", password:"", otp_text:""}

  handleName =(e) => {
this.setState({name:e.target.value})
  }

  handleEmail =(e) => {
    this.setState({email:e.target.value})
      }

  handleMobileNumber = (e) => {
      this.setState({mobileNumber:e.target.value})
  }

  handleOtpNumber = (e)=>{
    this.setState({otp:e.target.value})
  }

  handlePassword = (e) => {
    this.setState({password:e.target.value})
  }

  configureCaptcha = () =>{
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      }
    });
  } 


  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()

    const phoneNumber = "+91" + this.state.mobileNumber
    const appVerifier = window.recaptchaVerifier;
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          console.log("OTP has been sent")
          this.setState({otp_text:`Otp sent to ${phoneNumber}`})
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });

  }

  registerUserDetails = async () =>{
    const {name, email, mobileNumber, password} = this.state
      const userDetails = {name, email, mobileNumber, password}
      const url = "http://localhost:3300/registerUser"
      const options={
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
      },
        body:JSON.stringify(userDetails)
      }
      const response = await fetch(url, options)
      //const data = await response.json()
      if (response.ok===true){
      alert("user details saved please login")
      this.props.navigate("/login")  
      }
  }


  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))

      this.registerUserDetails()

      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log("Invalid Otp")
      alert("Invalid otp")
    });
  }


  render() {
    const {otp_text} = this.state
    return (
     /* <div>
      <div>
        <label>Enter Your Name</label>
        <br/>
        <input type="text" name="name" placeholder="Enter Name" onChange={this.handleName}/>
        <br/>
        <label >Enter Your Email</label>
        <br/>
        <input type="text" name="email" placeholder="Enter Email" onChange={this.handleEmail}/>
        <br/>
        <label>Set password</label>
        <br/>
        <input type='password' name='password' placeholder='Set password' onChange={this.handlePassword}/>      
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <label >Enter Your Mobile Number</label>
          <br/>
          <input type="number" name="mobile" placeholder="Mobile number" onChange={this.handleMobileNumber}/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <form onSubmit={this.onSubmitOTP}>
        <label >Enter Your Otp</label>
        <br/>
          <input type="number" name="otp" placeholder="OTP Number" onChange={this.handleOtpNumber}/>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
      </div> */
      <div className="signup-container">
        <div className="signup-form">
          <label>Enter Your Name</label>
          <br/>
          <input type="text" name="name" placeholder="Enter Name" onChange={this.handleName}  className="form-input"/>
          <br/>
          <label>Enter Your Email</label>
          <br/>
          <input type="text" name="email" placeholder="Enter Email" onChange={this.handleEmail} className="form-input"/>
          <br/>
          <label>Set Password</label>
          <br/>
          <input type="password" name="password" placeholder="Set Password" onChange={this.handlePassword} className="form-input"/>
          <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
            <label>Enter Your Mobile Number</label>
            <br/>
            <input type="number" name="mobile" placeholder="Mobile Number" onChange={this.handleMobileNumber} className="form-input"/>
            <br/>
            <button type="submit" className="form-btn">Send OTP</button>
          </form>
          <p className='otp-text'>{otp_text}</p>
          <form onSubmit={this.onSubmitOTP}>
            <label>Enter Your OTP</label>
            <br/>
            <input type="number" name="otp" placeholder="OTP Number" onChange={this.handleOtpNumber} className="form-input"/>
            <br/>
            <button type="submit" className="form-btn">Submit OTP</button>
          </form>
        </div>
      </div>
    )
  }
}
export default withNavigate(UserRegister)