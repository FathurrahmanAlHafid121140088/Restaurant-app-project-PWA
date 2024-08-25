/* eslint-disable no-underscore-dangle */
import { createToast } from './notification-initiator'
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb'
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate
} from '../views/templates/template-restaurant'

const LikeButtonInitiator = {
  async init ({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer
    this._restaurant = restaurant

    await this._renderButton()
  },

  async _renderButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant)
      this._renderButton()
      createToast('success', `Added ${this._restaurant.name} to Favorites`)
    })
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id)
      this._renderButton()
      createToast('success', `Removed ${this._restaurant.name} from Favorites`)
    })
  }
}

export default LikeButtonInitiator
