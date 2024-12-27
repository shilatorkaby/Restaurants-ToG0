import HomePage from './components/HomePage.vue'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import Update from './components/Update.vue'
import Add from './components/Add.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/',
        // meta: { requiresAuth: true }
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
        // meta: { requiresAuth: true }

    }, {
        name: 'LogIn',
        component: LogIn,
        path: '/log-in',
     }, {
        name: 'Add',
        component: Add,
        path: '/add',
        // meta: { requiresAuth: true }

     }, {
        name: 'Update',
        component: Update,
        path: '/update/:id',
        // meta: { requiresAuth: true }

     },
    

];



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
