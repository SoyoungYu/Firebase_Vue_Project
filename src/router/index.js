import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import BoardList from '@/components/BoardList'
import BoardCreate from '@/components/BoardCreate'
import BoardRead from '@/components/BoardRead'
import BoardUpdate from '@/components/BoardUpdate'

Vue.use(Router)  

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/list',
            name: 'BoardList',
            component: BoardList
        },
        {
            path: '/create',
            name: 'BoardCreate',
            component: BoardCreate,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/read/:id',
            name: 'BoardRead',
            component: BoardRead,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/update/:id',
            name: 'BoardUpdate',
            component: BoardUpdate,
            meta: {
                requiresAuth: true
            }
        }
    ]
})