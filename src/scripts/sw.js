/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

// Precache files
precacheAndRoute(self.__WB_MANIFEST)

// Register routes for API and images
registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api'
  })
)

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-large-api'
  })
)

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-medium-api'
  })
)

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-small-api'
  })
)

// Skip waiting on install
self.addEventListener('install', () => {
  console.log('Service Worker: Installed')
  self.skipWaiting()
})
