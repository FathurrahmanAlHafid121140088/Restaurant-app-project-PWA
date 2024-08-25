import Main from '../views/pages/main'
import Favorite from '../views/pages/favorite'
import Detail from '../views/pages/detail'
import Search from '../views/pages/search'

const routes = {
  '/': Main, // default page
  '/main': Main,
  '/favorite': Favorite,
  '/detail/:id': Detail,
  '/search/:id': Search
}

export default routes
