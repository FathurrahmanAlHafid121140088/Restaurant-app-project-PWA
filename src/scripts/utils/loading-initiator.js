const showLoadingIndicator = () => {
  const indicator = document.querySelector('.loader')
  indicator.style.display = 'flex'
}

const hideLoadingIndicator = () => {
  const indicator = document.querySelector('.loader')
  setTimeout(() => {
    indicator.style.display = 'none'
  }, 1000)
}

export { showLoadingIndicator, hideLoadingIndicator }
