import '@picocss/pico'
import { render } from 'preact'
import { LocationProvider, Router, Route } from 'preact-iso'

import { SCOPE, scopedPath } from './components/Link.jsx'
import { Home } from './home.jsx'

export function App() {
  return (
    <LocationProvider scope={SCOPE}>
      <main class="container">
        <Router>
          <Route path={scopedPath('/')} component={Home} />
          <Route path={scopedPath('/what')} component={What} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  )
}

function What() {
  return <h1>Hwat</h1>
}

function NotFound() {
  return <h1>Not found</h1>
}

render(<App />, document.getElementById('app'))
