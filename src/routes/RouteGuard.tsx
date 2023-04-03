import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
  const user = localStorage.getItem('user')

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
