import { createRouter, createWebHistory } from 'vue-router'
import {store} from '../vuex/store'
// import Home from "../views/Home";
const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home,
    //     meta: {
    //         layout: 'CafeLayout'
    //     },
    // },
    // {
    //     path: '/contacts',
    //     name: 'Contacts',
    //     component: () => import('../views/Contacts'),
    //     meta: {
    //         layout: 'CafeLayout'
    //     }
    // },
    {
        path: '/',
        name: 'CafeLayout',
        component: () => import('../layouts/CafeLayout'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/Home'),
            },
            {
                path: '/contacts',
                name: 'Contacts',
                component: () => import('../views/Contacts'),
            },
        ]
    },
    {
        path: '/auth',
        name: 'Login',
        component: () => import('../views/Login'),
        meta: {
            layout: 'LoginLayout'
        }
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: () => import('../layouts/AdminLayout'),
        meta: {
            requiresAuth: true
        },
        children:[
            {
                path: 'users',
                component: () => import('../components/UsersTable'),
            },
            {
                path: 'products',
                component: () => import('../components/ProductsTable'),
            },
            {
                path: 'sections',
                component: () => import('../components/SectionsTitleTable'),
            },
            {
                path: 'orders',
                component: () => import('../components/OrdersTable'),
            },
            {
                path: 'meals',
                component: () => import('../components/MealsTable'),
            },
        ]
    },
    // {
    //     path: '/admin',
    //     name: 'AdminPanel',
    //     component: () => import('../views/AdminPanel'),
    //     meta: {
    //         layout: 'AdminLayout'
    //     },
    // },
    // {
    //     path: '/admin/products',
    //     component: () => import('../components/ProductsTable'),
    //     meta: {
    //         layout: 'AdminLayout'
    //     },
    // },
    // {
    //     path: '/admin/sections',
    //     component: () => import('../components/SectionsTitleTable'),
    //     meta: {
    //         layout: 'AdminLayout'
    //     },
    // },
    // {
    //     path: '/admin/users',
    //     component: () => import('../components/UsersTable'),
    //     meta: {
    //         layout: 'AdminLayout'
    //     },
    // }
    ]




const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
   if(to.matched.some(record => record.meta.requiresAuth)) {
     if (store.getters.isLoggedIn) {
       next()
       return
     }
     next('/auth') 
   } else {
     next() 
   }
 })

export default router