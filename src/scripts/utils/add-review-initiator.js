/* eslint-disable no-underscore-dangle */
import { createToast } from './notification-initiator'
import RestaurantSource from '../data/restaurant-source'
import defaultProfile from '../../public/defaultprofile.png'

const AddReviewInitiator = {
  async init (id) {
    this._id = id

    await this._postReview()
  },

  async _postReview () {
    const reviewForm = document.querySelector('.form-review')
    const modalReview = document.getElementById('modal-review')

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const currentDate = new Date().toLocaleDateString('id-ID', options)
      const nameValueInput = document.getElementById('name-input').value
      const reviewValueInput = document.getElementById('review-input').value
      const reviewTemp = document.getElementById('review-customer-temp')

      const response = await RestaurantSource.addReview({
        id: this._id,
        name: nameValueInput,
        review: reviewValueInput
      })

      modalReview.classList.remove('active')

      if (response.error) {
        createToast('error', 'An error occurred while adding the review')
      } else {
        reviewTemp.innerHTML += `
            <div class="review-customer">
                <div class="review-customer-header">
                    <img src="${defaultProfile}" alt="" />
                    <div class="review-name">
                        <h4>${nameValueInput}</h4>
                        <p>${currentDate}</p>
                    </div>
                </div>
                <div class="review-customer-body">
                    <p>${reviewValueInput}</p>
                </div>
            </div>
          `
        createToast('success', 'Review successfully added.')
      }

      document.getElementById('name-input').value = ''
      document.getElementById('review-input').value = ''
    })
  }
}

export default AddReviewInitiator
