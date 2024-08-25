class Footer extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <footer>
      <p>About Us</p>

      <!--paragraph-->
      <p>Contact me through the Social Media below:</p>
      <!--social-->
      <div class="social-icons">
        <a href="08877246401"><i class="fa fa-whatsapp"></i></a>
        <a href="https://www.instagram.com/fathurr.ra/"
          ><i class="fa fa-instagram"></i
        ></a>
        <a href="https://www.linkedin.com/in/fathurrahman-al-hafid-a21a7a246/"
          ><i class="fa fa-linkedin"></i
        ></a>
        <a
          href="https://mobile.facebook.com/fathur.rahman.99?eav=AfbnUJluA5KNpgxe8BdZQ-LFK5xBt5Sx2W-FFYvYczT8Lrx7qMxeRL8lmubGwOCPPV0&paipv=0"
          ><i class="fa fa-facebook"></i
        ></a>
      </div>
      <!--copyright-->
      <p class="copyright">Copyright 2024 by Fathurrahman Al Hafid</p>
    </footer>
    `
  }
}

customElements.define('end-bar', Footer)
