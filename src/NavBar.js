import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavBar extends Component {

  render() {
    const username = this.props.username
    return (
<nav className="navbar navbar-expand-md navbar-dark bg-blue fixed-top">
<Link className="navbar-brand" to="/">Blockstack To-do List</Link>


<ul className="navbar-nav mr-auto">
  <li className="nav-item">
    <Link className="nav-link" to='/'>{username}</Link>
  </li>
</ul>
<button
  className="btn btn-primary"
  onClick={this.props.signOut.bind(this)}
>Sign out
</button>
</nav>
)
}
}

export default NavBar
