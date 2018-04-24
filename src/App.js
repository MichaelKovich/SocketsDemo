import React, { Component } from "react"
import logo from "./logo.svg"
import socketIOClient from "socket.io-client"
import axios from "axios"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      endpoint: "http://172.31.99.237:1738",
      cat: [],
      messages: [],
      text: "",
      user: ""
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)

    socket.on("Message", data => this.setState({ messages: data }))
  }

  sendIt(e) {
    e.preventDefault()
    axios.post("/api/sendpost", {
      user: this.state.user,
      text: this.state.text
    })
  }

  textChangeHandler(e) {
    this.setState({ text: e.target.value })
  }

  nameTypage(e) {
    this.setState({ user: e.target.value })
  }

  render() {
    const messages = this.state.messages.map(item => (
      <p>
        {item.user}:{item.text}
      </p>
    ))

    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={e => this.sendIt(e)}>
          <input
            onChange={e => this.textChangeHandler(e)}
            type="text"
            placeholder="type somethign here"
          />
          <input type="submit" text="Submitoooo" />
        </form>
        <p className="App-intro">
          <input
            onChange={e => this.nameTypage(e)}
            placeholder="Type name here"
          />
          Hi:
          {messages}
        </p>
      </div>
    )
  }
}

export default App
