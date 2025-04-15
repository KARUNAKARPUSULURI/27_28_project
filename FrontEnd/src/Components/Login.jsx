import { Component } from "react";
import Home from "./Home";

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      token: ""
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleLogin = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
      this.setState({ token: data.data.token })
      localStorage.setItem("token", data.data.token ? "TRUE" : "FALSE")
      //data.data.token lo value vundi ante localStorage lo store cheyyali
      //data.data.token lo value ledu ante localStorage lo store cheyyakoodadu
      //now you can show dashboard based on token, 
      //like if token is available in localstorage then only take user to dashboard page
      if (data.status == 200) {
        console.log("hello")
      } else {
        console.log(err)
      }
    })
  }
  render() {
    return (
      <>
        <Home token={this.state.token} />
        <div className="form-container">
          <h1 className="form-title">Login</h1>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                onChange={this.handleChange}
                required
              />
            </div>
            <button className="form-submit" type="submit">Login</button>
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm