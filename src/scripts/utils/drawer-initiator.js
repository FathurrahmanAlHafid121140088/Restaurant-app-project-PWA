/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const DrawerInitiator = {
  init ({
    hamburgerButton, dropdownMenu, hamburgerIcon, content
  }) {
    hamburgerButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, dropdownMenu, hamburgerIcon)
    })

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, hamburgerButton, dropdownMenu, hamburgerIcon)
    })
  },

  _toggleDrawer (event, dropdownMenu, hamburgerIcon) {
    event.stopPropagation()

    dropdownMenu.classList.toggle('active')

    const isActive = dropdownMenu.classList.contains('active')
    hamburgerIcon.classList = isActive ? 'bx bx-x bx-md' : 'bx bx-menu bx-md'
  },

  _closeDrawer (event, hamburgerButton, dropdownMenu, hamburgerIcon) {
    event.stopPropagation()

    if (!dropdownMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
      dropdownMenu.classList.remove('active')
      hamburgerIcon.classList = 'bx bx-menu bx-md'
    }
  }
}

export default DrawerInitiator
