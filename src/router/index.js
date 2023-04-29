import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { isUserLoggedIn } from "@/router/utils"
import { canNavigate } from "@layouts/plugins/casl"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => ({ name: 'sales-list' }),
    },
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(to => {
  const isLoggedIn = isUserLoggedIn()

  if (canNavigate(to)) {
    if (to.meta.redirectIfLoggedIn && isLoggedIn)
      return { name: 'dashboards-analytics' }
  }
  else {
    if (isLoggedIn)
      return { name: 'common-not-authorized' }
    else
      return { name: 'common-login', query: { to: to.name !== 'common-not-authorized' ? to.fullPath : undefined } }
  }
})
export default router
