import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const token = useSelector((state) => state.user?.user?.token)
  return token ? <Navigate to="/successful-message" replace state={{ from: 'sign-in' }} /> : <Outlet />
}

export default PublicRoute
