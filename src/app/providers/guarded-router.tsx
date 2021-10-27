import { Route, Redirect } from "react-router-dom"

export const GuardedRoute = ({ ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('currentUser')
  return (
    isAuthenticated ? <Route { ...rest } /> : <Redirect to={'/auth'} />
  )
}
