import { Children, useEffect, useState } from 'react'
import { match } from 'path-to-regexp'
import { EVENTS } from '../constants'
import { getCurrentPath } from '../utils'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(function () {
    const onLocationchange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationchange)
    window.addEventListener(EVENTS.POPSTATE, onLocationchange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationchange)
      window.removeEventListener('popstate', onLocationchange)
    }
  }, [])

  let routeParams = {}

  // agregar rutas que vienen del children <Route />
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // path-to-regexp para detectar rutas dinámicas
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // guardar los parámetros de la url que eran dinámicos.
    routeParams = matched.params // { query: 'javascript' }
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
