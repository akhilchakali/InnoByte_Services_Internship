import { Component } from "react"
import withNavigate from "./withNavigate"
import "./home.css"
class Home extends Component {
    onLogout = () => {
        this.props.navigate("/login")
    }
    render(){
    return(
        /*<div>
            <div>
                <button onClick={this.onLogout}>Logout</button>
            </div>
            <div>
            <h1>Hi Dear</h1>
            <p>Every day is a new beginning. Take a deep breath, smile, and start again.</p>
            </div>
        </div>*/
        /*<div className="user-content-container">
        <div className="user-actions">
          <button onClick={this.onLogout} className="logout-btn">Logout</button>
        </div>
        <div className="user-greeting">
          <h1>Welcome Back!</h1>
          <p>Hey there! It's great to see you again. Remember, every day is a new beginning. Take a deep breath, smile, and start fresh. We're here to support you.</p>
        </div>
      </div>*/
      <div className="user-content-container">
        <button onClick={this.onLogout} className="logout-btn">Logout</button>
        <div className="user-greeting">
          <h1>Welcome Back!</h1>
          <p>Hey there! It's great to see you again. Remember, every day is a new beginning. Take a deep breath, smile, and start fresh. We're here to support you.</p>
        </div>
      </div>

    )
}
}

export default withNavigate(Home)