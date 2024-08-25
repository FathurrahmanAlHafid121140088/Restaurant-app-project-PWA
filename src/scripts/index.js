import 'regenerator-runtime'
import '../styles/style.css'
import '../styles/notification.css'
import '../styles/responsive.css'
import 'boxicons'
import 'boxicons/css/boxicons.min.css'
import './components/navbar'
import './components/footer'
import './components/jumbotron'
import skipContentInitiator from './utils/skip-content-initiator'
import { removeToast } from './utils/notification-initiator'
import App from './views/app'
import swRegister from './utils/sw-register'

const app = new App({
  hamburgerButton: document.querySelector('.hamburger-menu'),
  dropdownMenu: document.querySelector('.dropdown-menu'),
  hamburgerIcon: document.querySelector('.hamburger-menu i'),
  content: document.querySelector('#mainContent')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  skipContentInitiator()
  app.renderPage()
  swRegister()

  const notifications = document.querySelector('.notifications')
  notifications.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      removeToast(event.target.parentElement)
    }
  })
})
