import React, { Component } from 'react'
import RegisterForm from './Components/Register'
import LoginForm from './Components/Login'
import "./App.css"

export default class App extends Component {
  render() {
    return (
      <div style={{display: "flex", justifyContent : "space-around", gap: "200px"}}>
        <RegisterForm />
        <LoginForm />
      </div>
    )
  }
}
