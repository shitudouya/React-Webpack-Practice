import React, { Component } from 'react'
export default class App extends Component {
  componentDidMount() {
    console.log(Array.from(new Set([1,5,5,2,1,6,8])).sort((a,b)=>a-b))
  }
  render() {
    return (
      <div>
        <p>Hello World</p>
      </div>
    )
  }
}
