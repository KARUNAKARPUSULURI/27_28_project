import { Component } from "react";

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      age: 0,
      gender: "",
      email: "",
      password: "",
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleRegister = (e) => {
    e.preventDefault()
    const { username, age, gender, email, password } = this.state;
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, age, gender, email, password })
    }).then(res=>console.log(res))
  }
  render() {
    return (
      <div className="form-container">
        <h1 className="form-title">Register</h1>
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              id="username" 
              name="username" 
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              placeholder="Enter your age" 
              id="age" 
              name="age" 
              onChange={this.handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select 
              name="gender" 
              onChange={this.handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
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
          <button className="form-submit" type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterForm