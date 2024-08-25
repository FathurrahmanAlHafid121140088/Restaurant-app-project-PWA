import heroImage from '../../public/hero-image_2.jpg'

class Jumbotron extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <section id="jumbotron" tabindex="0" aria-label="jumbotron">
        <div
          class="jumbotron"
          style="background-image: url('${heroImage}')"
        >
          <div class="jumbotron-overlay">
            <h1 class="jumbotron-title" tabindex="0">MilkyWay Apps</h1>
            <p class="jumbotron-subtitle" tabindex="0">
              Situs Rekomendasi Restaurant Terkemuka di Indonesia.
            </p>
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('jumbotron-section', Jumbotron)
