import React, { Component } from 'react'
import RegisterForm from './Components/Register'
import LoginForm from './Components/Login'
import "./App.css"
import Home from './Components/Home'

export default class App extends Component {
  render() {
    return (
      <div>
        <RegisterForm />
        <LoginForm />
      </div>
    )
  }
}
