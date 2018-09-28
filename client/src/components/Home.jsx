import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
    <div>
        <h1>HOMEPAGE</h1>
        <Link to="/signin">Sign In</Link>
    </div>
)

export default Home