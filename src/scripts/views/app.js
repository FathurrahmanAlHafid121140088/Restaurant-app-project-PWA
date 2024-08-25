/* eslint-disable no-underscore-dangle */
import DrawerInitiator from '../utils/drawer-initiator'
import UrlParser from '../routes/url-parser'
import routes from '../routes/routes'

class App {
  constructor ({
    hamburgerButton, dropdownMenu, hamburgerIcon, content
  }) {
    this._hamburgerButton = hamburgerButton
    this._dropdownMenu = dropdownMenu
    this._hamburgerIcon = hamburgerIcon
    this._content = content

    this._initialAppShell()
  }

  _initialAppShell () {
    DrawerInitiator.init({
      hamburgerButton: this._hamburgerButton,
      dropdownMenu: this._dropdownMenu,
      hamburgerIcon: this._hamburgerIcon,
      content: this._content
    })
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url]
    this._content.innerHTML = await page.render()
    await page.afterRender()

    const skipLinkElem = document.querySelector('.skip-content')
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault()
      document.querySelector('#mainContent').focus()
    })
  }
}

export default App
