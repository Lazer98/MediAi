import Vue from 'vue'
import VueRouter from 'vue-router'
 
Vue.use(VueRouter)
 
  const routes = [
  {
    path: '/',
    name: 'registration',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/chat-bot',
    name: 'chat-bot',
    component: () => import('../components/ChatBot.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/profil-doctor',
    name: 'profil-doctor',
    component: () => import('../components/ProfilDoctor.vue')
  },
  {
    path: '/messages-to-doctor',
    name: 'messages-to-doctor',
    component: () => import('../components/MessagesToDoctor.vue')
  },
  {
    path: '/search-for-patient',
    name: 'search-for-patient',
    component: () => import('../components/SearchForPatientPage.vue')
  },
  {
    path: '/profil-patient',
    name: 'profil-patient',
    component: () => import('../components/ProfilPatient.vue')
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: () => import('../components/ShowInquiry.vue')
  },
  
  {
    path: '/search-for-patient',
    name: 'search-for-patient',
    component: () => import('../components/SearchForPatientPage.vue')
  }
]
 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 
export default router