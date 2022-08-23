import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div class="navbar bg-base-100">
  <Link to="/" class="btn btn-ghost normal-case text-xl">
    <h2>Home</h2>
    </Link>
    <Link to="/admin" class="btn btn-ghost normal-case text-xl">
    <h2>Admin</h2>
    </Link>
</div>
  )
}

export default Navbar