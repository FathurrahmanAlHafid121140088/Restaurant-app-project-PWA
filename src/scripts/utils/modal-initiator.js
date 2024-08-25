/* eslint-disable no-underscore-dangle */
const ModalInitiator = {
  init ({
    // eslint-disable-next-line max-len
    buttonCloseImage, buttonTriggerImage, modalImage, buttonCloseReview, buttonTriggerReview, modalReview
  }) {
    buttonTriggerImage.addEventListener('click', (event) => {
      this._toggleDrawerImage(event, modalImage)
    })

    buttonCloseImage.addEventListener('click', (event) => {
      this._closeDrawerImage(event, modalImage, buttonTriggerImage)
    })

    buttonTriggerReview.addEventListener('click', (event) => {
      this._toggleDrawerReview(event, modalReview)
    })

    buttonCloseReview.addEventListener('click', (event) => {
      this._closeDrawerReview(event, modalReview, buttonTriggerReview)
    })
  },

  _toggleDrawerImage (event, modalImage) {
    event.stopPropagation()

    modalImage.classList.add('active')
    modalImage.focus()
  },

  _closeDrawerImage (event, modalImage, buttonTriggerImage) {
    event.stopPropagation()

    modalImage.classList.remove('active')
    buttonTriggerImage.focus()
  },

  _toggleDrawerReview (event, modalReview) {
    event.stopPropagation()

    modalReview.classList.add('active')
    modalReview.focus()
  },

  _closeDrawerReview (event, modalReview, buttonTriggerReview) {
    event.stopPropagation()

    modalReview.classList.remove('active')
    buttonTriggerReview.focus()
  }
}

export default ModalInitiator
