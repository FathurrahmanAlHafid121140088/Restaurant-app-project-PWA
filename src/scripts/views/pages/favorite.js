import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import { createRestaurantListTemplate } from '../templates/template-restaurant'
import { showLoadingIndicator, hideLoadingIndicator } from '../../utils/loading-initiator'

const Favorite = {
  async render () {
    return `
    <section class="restaurant-list" id="content">
        <h2 tabindex="0">Favorite Restaurants</h2>
        <div class="cards-box"></div>
        <div class="cards-box-null"></div>
      </section>
    `
  },

  async afterRender () {
    showLoadingIndicator()
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants()
    hideLoadingIndicator()
    const restaurantContainer = document.querySelector('.cards-box')
    const restaurantContainerNull = document.querySelector('.cards-box-null')

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantListTemplate(restaurant)
      })
    } else {
      restaurantContainerNull.innerHTML = '<p>There are no restaurants added to favorites yet.</p>'
    }
  }
}

export default Favorite
