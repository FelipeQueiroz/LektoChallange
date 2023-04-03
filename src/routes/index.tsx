import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { Home } from '../pages/Home'
import PrivateRoute from './RouteGuard'
import { UpdateProfile } from '../pages/UpdateProfile'

export const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/edit-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
