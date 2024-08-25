import UrlParser from '../../routes/url-parser'
import RestaurantSource from '../../data/restaurant-source'
import { createDetailRestaurantTemplate } from '../templates/template-restaurant'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import ModalInitiator from '../../utils/modal-initiator'
import AddReviewInitiator from '../../utils/add-review-initiator'

const Detail = {
  async render () {
    return `
      <section class="detail-restaurant"></section>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await RestaurantSource.detailRestaurant(url.id)
    const detailContainer = document.querySelector('.detail-restaurant')
    detailContainer.innerHTML = createDetailRestaurantTemplate(restaurant)

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('.favorite-box'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        address: restaurant.address,
        city: restaurant.city,
        rating: restaurant.rating
      }
    })

    ModalInitiator.init({
      buttonCloseImage: document.getElementById('close-modal-image'),
      buttonTriggerImage: document.getElementById('button-image-trigger'),
      modalImage: document.getElementById('modal-image'),
      buttonCloseReview: document.getElementById('close-modal-review'),
      buttonTriggerReview: document.getElementById('button-review-trigger'),
      modalReview: document.getElementById('modal-review')
    })

    AddReviewInitiator.init(restaurant.id)
  }
}

export default Detail
