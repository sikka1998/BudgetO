import React from 'react'
import Sidebar from './Sidebar.jsx'

function Layout({ children }) {
  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-grow p-8">
        {console.log(children)}
        {children}
    </div>
    </div>
  )
}

export default Layout
