import { EVENTS } from '../constants'

export function navigate (href) {
  window.history.pushState({}, '', href)

  // crear evento pushstate.
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleOnClick = event => {
    // controlar posibles eventos (shortcuts)
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleOnClick} href={to} target={target} {...props} />
}
