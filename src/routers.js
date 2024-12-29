import HomePage from './components/HomePage.vue'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import Update from './components/Update.vue'
import Add from './components/Add.vue'
import Share from './components/Share.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/',
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
    }, {
        name: 'LogIn',
        component: LogIn,
        path: '/log-in',
     }, {
        name: 'Add',
        component: Add,
        path: '/add',
     }, {
        name: 'Update',
        component: Update,
        path: '/update/:id',
     },{
        name: 'Share',
        component: Share,
        path: '/share/:id',
     },
    

];



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
