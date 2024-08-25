import logo from '../../public/milkyway.png'

class NavBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <header>
      <nav>
        <div class="loader-box">
            <a href="index.html">
              <img src="${logo}" alt="logo" class="logo" />
            </a>
          <div class="loader"></div>
        </div>
      
        <button class="hamburger-menu" aria-label="buka menu">
          <i class="bx bx-menu bx-md"></i>
        </button>

        <div class="nav-menu">
          <a href="#/main">Home</a>
          <a href="#/favorite">Favorite</a>
          <a href="https://github.com/FathurrahmanAlHafid121140088" target="_blank">About Us</a>
        </div>


        <div class="dropdown-menu">
          <a href="#/main">Home</a>
          <a href="#/favorite">Favorite</a>
          <a href="https://github.com/FathurrahmanAlHafid121140088" target="_blank">About Us</a>

        </div>
      </nav>
    </header>
    `
  }
}

customElements.define('nav-bar', NavBar)
