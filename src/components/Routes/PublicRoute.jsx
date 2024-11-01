import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const token = useSelector((state) => state.user?.user?.token)
  return token ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoute
