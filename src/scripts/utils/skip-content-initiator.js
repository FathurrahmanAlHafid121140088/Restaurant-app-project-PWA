const skipContentInitiator = () => {
  const skipContent = document.querySelector('.skip')
  skipContent.innerHTML = ''
  skipContent.innerHTML +=
    "<a href='#mainContent' class='skip-content'>Skip To Content</a>"
}

export default skipContentInitiator
