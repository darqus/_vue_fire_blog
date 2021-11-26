import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Blogs from '@/views/Blogs.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Profile from '@/views/Profile.vue'
// import AddAdmin from '@/views/AddAdmin.vue'
import PostCreate from '@/views/PostCreate.vue'
import PostPreview from '@/views/PostPreview.vue'
import PostView from '@/views/PostView.vue'
import PostEdit from '@/views/PostEdit.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

Vue.use(VueRouter)

export const MAIN_ROUTE = {
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: 'Home',
    requiresAuth: false,
  },
}

export const OVER_ROUTES = [
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false,
    },
  },
  {
    path: '/post-create',
    name: 'PostCreate',
    component: PostCreate,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/post-preview',
    name: 'PostPreviewCreate',
    component: PostPreview,
    meta: {
      title: 'Preview Create Blog Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/post-preview/:id',
    name: 'PostPreviewUpdate',
    component: PostPreview,
    meta: {
      title: 'Preview Update Blog Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/post-view/:id',
    name: 'PostView',
    component: PostView,
    meta: {
      title: 'View Blog Post',
      requiresAuth: false,
    },
  },
  {
    path: '/post-edit/:id',
    name: 'PostEdit',
    component: PostEdit,
    meta: {
      title: 'Edit Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
]

export const PROFILE_ROUTES = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: false,
    },
  },
  /* {
    path: '/admin',
    name: 'Admin',
    component: AddAdmin,
    meta: {
      title: 'Add Admin',
      requiresAuth: true,
      requiresAdmin: true,
    },
  }, */
]

const routes = [
  MAIN_ROUTE,
  ...OVER_ROUTES,
  ...PROFILE_ROUTES,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_NAME} | ${to.meta?.title}`
  next()
})

router.beforeEach(async (to, from, next) => {
  const user = firebase.auth().currentUser
  let admin = null
  if (user) {
    const token = await user.getIdTokenResult()
    const { user_id } = token.claims
    admin = process.env.VUE_APP_UIDS.includes(user_id)
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next()
        }
        return next({ name: 'Home' })
      }
      return next()
    }
    return next({ name: 'Home' })
  }
  return next()
})

export default router
