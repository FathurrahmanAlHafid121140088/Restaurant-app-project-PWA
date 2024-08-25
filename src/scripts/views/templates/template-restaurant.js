import CONFIG from '../../globals/config'
import defaultProfile from '../../../public/defaultprofile.png'

const createRestaurantListTemplate = (restaurant) => `
        <a href="#/detail/${restaurant.id}" class="card">
            <img class="card_thumb" src="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}" alt="Foto restaurant ${restaurant.name}.">
            <div class="city">
                <h6 aria-label="Lokasi: ${restaurant.city}.">${restaurant.city}</h6>
            </div>
            <div class="card-rating">
                <p class="card-rating-value" aria-label="Rating: ${restaurant.rating}.">Rating: ${restaurant.rating}</p>
            </div>
            <div class="card-content">
                <h3 class="card-title" aria-label="Nama Restaurant: ${restaurant.name}.">${restaurant.name}</h3>
                <p class="card-desc" aria-label="Description Restaurant: ${restaurant.description}./">${restaurant.description}</p>
            </div>
        </a>
`

const createDetailRestaurantTemplate = (restaurant) => `
        <div class="detail-box">
            <div class="detail-overlay">
                <div class="detail-content-image">
                    <img src="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}" alt="Foto restaurant ${restaurant.name}." tabindex="0"/>
                </div>
                <div class="detail-address-box">
                <div class="detail-address">
                    <p tabindex="0" aria-label="Alamat: ${restaurant.address}, ${restaurant.city}.">Alamat: ${restaurant.address}, ${restaurant.city}</p>
                </div>
                <hr />
                <div class="detail-address">
                    <p class="rating" tabindex="0" aria-label="Rating: ${restaurant.rating}.">Rating: ${restaurant.rating}</p>
                </div>
            </div>
                <div class="detail-button-favorit">
                    <div class="favorite-box">

                    </div>
                    <button id="button-image-trigger" class="button-icon" type="submit" title="Detail foto">
                        <i class="fa-solid fa-circle-info" type="submit"></i>
                    </button>
                </div>
                <div class="detail-content">
                    <div class="detail-title">
                        <button class="detail-button-back" onclick="window.history.go(-1)" title="Kembali ke halaman sebelumnya.">
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                        <h2 tabindex="0" aria-label="Nama restaurant: ${restaurant.name}.">${restaurant.name}</h2>
                    </div>
                    <h6 tabindex="0" aria-label="Kategori: ${restaurant.categories.map((category) => category.name).join(', ')}.">
                        ${restaurant.categories.map((category) => category.name).join(', ')}
                    </h6>
                        <p class="detail-description" tabindex="0" aria-label="Deskripsi: ${restaurant.description}".>${restaurant.description}</p>
                </div>
            </div>
        </div>

        <div class="menu-box">
            <h2 tabindex="0">Daftar Menu</h2>
            <div class="menu-content">
                <div class="food">
                    <div class="menu-title">
                        <h3 tabindex="0">Makanan</h3>
                        <i class="fa-solid fa-bowl-food"></i>
                    </div>
                    <p tabindex="0" aria-label="Menu makanan: ${restaurant.menus.foods.map((food) => food.name).join(', ')}">Kami menyediakan ${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
                </div>
                <div class="food">
                    <div class="menu-title">
                        <h3 tabindex="0">Minuman</h3> 
                        <i class="fa-solid fa-martini-glass-citrus"></i>
                    </div>
                    <p tabindex="0" aria-label="Menu minuman: ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}">Kami menyediakan ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
                </div>
            </div>
        </div>

        <div class="review-box">
            <h2 tabindex="0">Ulasan</h2>
            <div class="review-content">
                <div class="review-header">
                <div class="review-overal">
                    <h3 tabindex="0">Overal Rating</h3>
                    <div class="review-rating">
                        <h4 tabindex="0" aria-label="Rating: ${restaurant.rating}.">${restaurant.rating}</h4>
                        <i class="fa-solid fa-star"></i>
                        <p tabindex="0" aria-label="Jumlah ulasan: ${restaurant.customerReviews.length} ulasan.">(${restaurant.customerReviews.length} ulasan)</p>
                    </div>
                </div>
                <button class="button" id="button-review-trigger" type="submit">
                    Tulis Ulasan
                </button>
                </div>
                <div class="review-body">
                    <div id="review-customer-temp" style="display: flex; flex-direction: column; gap: 1.5rem;">

                    </div>
                ${restaurant.customerReviews.slice().reverse().map((customerReview) => `
                    <div class="review-customer">
                        <div class="review-customer-header">
                        <img src="${defaultProfile}" alt="Foto profil pengulas" tabindex="0"/>
                        <div class="review-name">
                            <h4 tabindex="0" aria-label="Nama customer: ${customerReview.name}">${customerReview.name}</h4>
                            <p tabindex="0" aria-label="Tanggal ulasan: ${customerReview.date}">${customerReview.date}</p>
                        </div>
                        </div>
                        <div class="review-customer-body">
                            <p tabindex="0" aria-label="Ulasan: ${customerReview.review}">${customerReview.review}</p>
                        </div>
                    </div>
                `).join('')}
                </div>
            </div>
        </div>

        <div id="modal-image" class="modal-box" tabindex="0" aria-label="Modal detail foto">
            <div class="modal-image">
                <img src="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}" alt="Foto restaurant ${restaurant.name}" tabindex="0"/>
                <button class="button-icon button-close" id="close-modal-image" aria-label="Tombol untuk menutup detail foto">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>

        <div id="modal-review" class="modal-box" tabindex="0" aria-label="Modal ulasan">
            <div class="modal-review">
                <h3 tabindex="0">Write your review</h3>
                <form class="form-review">
                    <input id="id-input" name="id" type="hidden" value="${restaurant.id}" />
                    <input
                        id="name-input"
                        class="form-control"
                        placeholder="Input your name..."
                        type="text"
                        required
                    />
                    <textarea
                        id="review-input"
                        name="review"
                        class="form-control"
                        rows="10"
                        cols="50"
                        style="resize: none"
                        placeholder="Input your review here..."
                        required
                    ></textarea>
                    <button class="button button-review" id="button-review" type="submit">
                        Submit
                    </button>
                    <button class="button-icon button-close" id="close-modal-review" title="Tombol untuk menutup penulisan ulasan.">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </form>
            </div>
        </div>
`

const createLikeButtonTemplate = () => `
  <button aria-label="Tambahkan ke favorit" id="likeButton" class="button-icon" aria-label="Tambahkan ke favorit" >
    <i class="fa-regular fa-heart" type="submit"></i>
  </button>
`

const createLikedButtonTemplate = () => `
  <button aria-label="Hapus dari favorit" id="likeButton" class="button-icon" aria-label="Hapus dari favorit" >
    <i class="fa-solid fa-heart"></i>
  </button>
`

export {
  createRestaurantListTemplate,
  createDetailRestaurantTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate
}
