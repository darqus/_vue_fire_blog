import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
// import 'firebase/functions'
// import 'firebase/storage'
import db from '@/firebase/firebaseInit'
import router from '@/router'

import { validatePost } from '@/utils/validator'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    welcomePost: {
      id: 0,
      title: 'Welcome!',
      content: `Welcome to ${process.env.VUE_APP_NAME}. Good luck, have fun!`,
      image: 'coding',
      isWelcome: true,
    },
    blogPosts: [],
    blog: {
      title: '',
      content: '',
      date: '',
    },
    isEditedPost: false,
    profile: {
      id: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      initials: '...',
      admin: false,
      showMobileNav: false,
    },
    user: null,
    loading: false,
    modal: {
      message: '',
      active: false,
    },
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2)
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6)
    },
  },
  mutations: {
    toggleShowMobileNav(state, payload) {
      state.profile.showMobileNav = payload
    },
    setCurrentBlog(state, payload) {
      state.blog = payload
    },
    updateBlogTitle(state, payload) {
      state.blog.title = payload
      state.isEditedPost = true
    },
    updateBlogContent(state, payload) {
      state.blog.content = payload
      state.isEditedPost = true
    },
    clearPost(state) {
      state.blog.title = ''
      state.blog.content = ''
      state.blog.date = ''
      state.isEditedPost = false
    },
    filterBlogPosts(state, payload) {
      state.blogPosts = state.blogPosts.filter(({ id }) => id !== payload)
    },
    updateUser(state, payload) {
      state.user = payload
    },
    checkAdmin(state, payload) {
      const admin = process.env.VUE_APP_UIDS.includes(payload)
      state.profile.admin = admin
    },
    setProfileInfo(state, payload) {
      state.profile.id = payload.id
      state.profile.email = payload?.data().email
      state.profile.firstName = payload?.data().firstName
      state.profile.lastName = payload?.data().lastName
      state.profile.userName = payload?.data().userName
    },
    setProfileInitials(state, payload) {
      const profile = {
        firstName: payload?.data()?.firstName,
        lastName: payload?.data()?.lastName,
      }
      const checkTypes = profile.firstName && profile.lastName
      if (!checkTypes) return
      const initials = `${profile.firstName[0]}${profile.lastName[0]}`
      state.profile.initials = initials
    },
    clearModal(state) {
      state.modal.message = ''
      state.modal.active = false
    },
  },
  actions: {
    async getUser({ commit, state }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit('setProfileInfo', dbResults)
      commit('setProfileInitials', dbResults)
      const token = await state.user.getIdTokenResult()
      const { user_id } = token.claims
      commit('checkAdmin', user_id)
    },
    async userUpdate({ commit, state }, payload) {
      state.loading = true

      try {
        const dataBase = await db.collection('users').doc(state.profile.id)
        await dataBase.update({
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
        })
        const dbResults = await dataBase.get()
        commit('setProfileInitials', dbResults)
        state.modal.message = 'Changes were saved!'
        state.modal.active = true
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async userRegister({ state }, payload) {
      const firstName = payload.find(({ name }) => name === 'firstName').value
      const lastName = payload.find(({ name }) => name === 'lastName').value
      const userName = payload.find(({ name }) => name === 'userName').value
      const email = payload.find(({ name }) => name === 'email').value
      const password = payload.find(({ name }) => name === 'password').value

      state.loading = true

      try {
        const createUser = await firebase.auth()
          .createUserWithEmailAndPassword(email, password)
        const database = db
          .collection('users')
          .doc(createUser.user.uid)
        const formData = {
          firstName,
          lastName,
          userName,
          email,
        }

        await database.set(formData)

        router.push({ name: 'Home' })
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async userLogin({ state }, payload) {
      const email = payload.find(({ name }) => name === 'email').value
      const password = payload.find(({ name }) => name === 'password').value

      state.loading = true

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
        router.push({ name: 'Home' })
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async userLogout({ state }) {
      state.loading = true

      try {
        await firebase.auth().signOut()
        window.location.replace('/')
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async userResetPassword({ state }, payload) {
      const email = payload.find(({ name }) => name === 'email').value

      state.loading = true
      let modalMessage = ''

      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            modalMessage = 'If your account exist? you will receive a email'
            return ''
          })
      } catch (error) {
        modalMessage = error.message
      } finally {
        state.loading = false
      }

      state.modal.active = true
      state.modal.message = modalMessage
    },
    async userAddAdmin({ state }, payload) {
      state.loading = true

      try {
        // firebase.functions worked on pay account
        const addAdmin = firebase.functions().httpsCallable('addAdminRole')
        const result = await addAdmin({ email: payload })
        state.modal.message = result.data.message
        state.modal.active = true
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async blogCreate({ dispatch, state }) {
      const emptyBlog = validatePost(state.blog.title, state.blog.content)
      if (emptyBlog) {
        state.modal.message = 'All fields will be filled'
        state.modal.active = true
        return
      }

      state.loading = true

      try {
        const dataBase = await db.collection('blogPosts').doc()
        const { id } = dataBase
        await dataBase.set({
          id,
          title: state.blog.title,
          content: state.blog.content,
          profileId: state.profile.id,
          date: Date.now(),
        })
        await dispatch('getBlogs')
        await router.push({ name: 'PostView', params: { id } })
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = error
      } finally {
        state.loading = false
        state.isEditedPost = false
      }
    },
    async blogGetPost({ state, commit }, { id = '' }) {
      state.loading = true
      try {
        const dataBase = await db.collection('blogPosts').doc(id)
        const dbResults = await dataBase.get()
        const currentBlogPost = {
          id: dbResults.data().id,
          title: dbResults.data().title,
          content: dbResults.data().content,
          date: dbResults.data().date,
        }
        commit('setCurrentBlog', currentBlogPost)
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async getBlogs({ state }) {
      state.loading = true
      try {
        const dataBase = await db
          .collection('blogPosts')
          .orderBy('date', 'desc')
          .get()
        const blogPosts = []
        dataBase.forEach((doc) => {
          const blogPost = {
            id: doc.data().id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
          }
          blogPosts.push(blogPost)
        })
        state.blogPosts = blogPosts
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = true
      } finally {
        state.loading = false
      }
    },
    async blogUpdatePost({ dispatch, commit, state }, payload) {
      const emptyBlog = validatePost(state.blog.title, state.blog.content)
      if (emptyBlog) {
        state.modal.message = 'All fields will be filled'
        state.modal.active = true
        return
      }

      state.loading = true

      try {
        const dataBase = await db.collection('blogPosts').doc(payload)
        await dataBase.update({
          title: state.blog.title,
          content: state.blog.content,
          date: Date.now(),
        })
        commit('filterBlogPosts', payload)
        await dispatch('getBlogs')
        await router.push({ name: 'PostView', params: { id: payload } })
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = error
      } finally {
        state.loading = false
        state.isEditedPost = false
      }
    },
    async blogDeletePost({ commit, state }, payload) {
      state.loading = true

      try {
        const dataBase = await db.collection('blogPosts').doc(payload)
        await dataBase.delete()
        commit('filterBlogPosts', payload)
      } catch (error) {
        state.modal.message = error.message
        state.modal.active = error
      } finally {
        state.loading = false
      }
    },
  },
  modules: {
  },
})
