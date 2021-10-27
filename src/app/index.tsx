// Entry point (App.tsx in past)

import { withProviders } from "./providers"
import { Routing } from "pages"
import { hot } from 'react-hot-loader/root'
import { Header } from 'app/header'
import './index.scss'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routing />
    </div>
  )
}

export default hot(withProviders(App))
