export default function Search ({ routeParams }) {
  return (
    <h1>You searching for {routeParams?.query}</h1>
  )
}
