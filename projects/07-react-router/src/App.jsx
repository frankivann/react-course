import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import NotFound from './pages/NotFound'
import { lazy, Suspense } from 'react'
import { Router } from './components/Router'
import { Route } from './components/Route'

// lazy loading, para cargar imports dinámicos
// y sólo utilizarlos cuando se necesitan.
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const routes = [
  {
    path: '/search/:query',
    Component: SearchPage
  },
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={NotFound}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
