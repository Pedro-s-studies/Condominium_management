import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Logout = React.lazy(() => import('./views/Logout'))
const Wall = React.lazy(() => import('./views/Wall'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/logout', name: 'Logout', element: Logout },

  { path: '/wall', name: 'Wall', element: Wall },
]

export default routes
