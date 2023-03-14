import { Link } from '../components/Link'

const i18n = {
  es: {
    title: 'Sobre Nosotros',
    description: 'Esta es la página de sobre nosotros',
    button: 'Ir a la home'
  },
  en: {
    title: 'About us',
    description: 'This page is about us',
    button: 'Go to home'
  }
}

export default function AboutPage ({ routeParams }) {
  const lang = i18n[routeParams.lang ?? 'en']

  return (
    <>
      <h1>{lang.title}</h1>
      <div>
        <p>{lang.description}</p>
        <img src='https://avatars.githubusercontent.com/u/1561955?v=4' alt='Foto de midudev' />
      </div>
      <Link to='/'>{lang.button}</Link>
    </>

  )
}
