import { createStore } from 'vuex'
import axios from "axios";
//import {isReadonly} from "vue";

export const store = createStore({
    state:{
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        items: [],
        allItems: [],
        complexItems: [],
        isModalHidden: false,
        isCartHidden: false,
        isOrderHidden: false,
        cart: [],
        titles: [],
        users: [],
        orders: [],
    },
    mutations:{
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
        SET_ITEMS_TO_STATE: (state, items) => {
            state.items = items;
            // console.log(items)
        },
        SET_ALL_ITEMS: (state, allItems) => {
            allItems.forEach(i=>i.isReadonly = true)
            state.allItems = allItems;
            console.log(allItems)
        },
        SET_COMPLEX_ITEMS_TO_STATE: (state, complexItems) =>{
            state.complexItems = complexItems;
            // console.log(complexItems)
        },
        SET_PRODUCT_TO_STATE: (state, product) =>{
            product.isReadonly = true
            let cloneItem = {...product}
            console.log(cloneItem)
            state.allItems.push(cloneItem);
        },
        ATTR_TOGGLE_ITEM: (state, item) =>{

            item.isReadonly = !item.isReadonly;
            // console.log(item);
        },
        SET_TITLE_TO_STATE: (state, title) =>{
             state.titles.push(title);
        },
        SET_USER_TO_STATE: (state, user) =>{
            let cloneUser = Object.assign({}, user)
            state.users.push(cloneUser);
        },
        SET_ORDERS_TO_STATE: (state, orders) =>{
          state.orders = orders
        },
        REMOVE_PRODUCT_FROM_STATE: (state, id) =>{
            state.allItems = state.allItems.filter(i => i.id !== id)
        },
        UPDATE_PRODUCT_IN_STATE: (state, item) =>{
            const index = state.allItems.findIndex(i => i.id === item.id);
            if (index !== -1) {
                state.allItems[index] = item
            }
            // const { id } = resp;
            // const toUpdateIndex = state.allItems.findIndex(el => el.id === id)
            // if(toUpdateIndex === -1) return state;
            // state.allItems.splice(toUpdateIndex,1,resp);
        },
        SET_TITLES_TO_STATE: (state, titles) => {
            state.titles = titles;
        },
        SET_USERS_TO_STATE: (state, users) => {
            state.users = users;
        },
        SET_CART: (state, item) => {
            if (state.cart.length){
                let isItemExists = false;
                state.cart.map(function(product){
                    if(product.title === item.title){
                        isItemExists = true;
                        product.amount++
                    }
                })
                if(!isItemExists){
                    state.cart.push(item)
                }
            } else{
                state.cart.push(item)
            }

        },
        DELETE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        CHANGE_MODAL_VALUE: (state) => {
            state.isModalHidden = !state.isModalHidden;
        },
        CHANGE_CART_VALUE: (state) => {
            state.isCartHidden = !state.isCartHidden;
        },
        CHANGE_ORDER_VALUE: (state) => {
            state.isOrderHidden = !state.isOrderHidden;
        },
        INCREMENT: (state, index) => {
            state.cart[index].amount++
        },
        DECREMENT: (state, index) => {
            if(state.cart[index].amount > 1){
                state.cart[index].amount--
            }
        },
    },
    actions:{
        logUser({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://lm.perimeter.games/api/v1/login', data: user, method: 'POST' })
                    .then(resp => {
                        // console.log(resp)
                        const token = resp.data.access_token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        regUser({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://lm.perimeter.games/api/v1/registration', data: user, method: 'POST' })
                    .then(resp => {
                        // console.log(resp)
                        const token = resp.data.access_token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logOut({commit}){
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        GET_ITEMS_FROM_API({commit}){
            return axios('https://lm.perimeter.games/api/v1/database.getproducts', {
                method: "GET",
            })
                .then((items) =>{
                    const products= JSON.parse(items.data.products)
                    commit('SET_ITEMS_TO_STATE', products);
                    // console.log(products)
                    return items;
            })
                .catch((error) =>{
                    console.log(error)
                    return error;
                })
        },
        GET_ALL_ITEMS({commit}){
            return axios('https://lm.perimeter.games/api/v1/database.products', {
                method: "GET",
            })
                .then((allItems) =>{
                    const allProducts = allItems.data.sections
                    commit('SET_ALL_ITEMS', allProducts);
                    console.log(allProducts)
                    return allItems;
                })
                .catch((error) =>{
                    console.log(error)
                    return error;
                })
        },
        GET_COMPLEX_ITEMS_FROM_API({commit}){
            return axios('https://lm.perimeter.games/api/v1/database.complex', {
                method: "GET",
            })
                .then((complexItems) =>{                    
                    const complexProducts= JSON.parse(complexItems.data.products)
                    commit('SET_COMPLEX_ITEMS_TO_STATE', complexProducts);
                    return complexItems;
            })
                .catch((error) =>{
                    console.log(error)
                    return error;
                })
        },
        GET_TITLES_FROM_API({commit}){
            return axios('https://lm.perimeter.games/api/v1/database.getsections', {
                method: "GET",
            })
                .then((titles) =>{
                    commit('SET_TITLES_TO_STATE', titles.data.sections);
                    // console.log(titles.data.sections);
                    return titles;
                })
                .catch((error) =>{
                    console.log(error)
                    return error;
                })
        },
        GET_USERS_FROM_API({commit}){
            return axios(' http://localhost:3000/users', {
                method: "GET",
            })
                .then((users) =>{
                    commit('SET_USERS_TO_STATE', users.data)
                    return users;
                })
                .catch((error) =>{
                    console.log(error)
                    return error;
                })
        },
        GET_ORDERS({commit}){
            const token = localStorage.getItem('token');
            // const config = {
            //     headers: { Authorization: `Bearer ${token}` }
            // };
            return axios.request({
                url: 'https://lm.perimeter.games/api/v1/order.view',
                method: 'post',
                headers: { Authorization: `Bearer ${token}` }
            })
            // return axios.post('https://lm.perimeter.games/api/v1/order.view', config)
                .then((orders)=>{
                    commit('SET_ORDERS_TO_STATE', orders.data.orders)
                    console.log(orders.data.orders)
                    return orders;
                })
                .catch((error)=>{
                    console.log(error)
                    return error;
                })
        },
         ADD_TO_PRODUCTS({commit}, Item){
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            // console.log(token)
            return axios.post(`https://lm.perimeter.games/api/v1/product.create`, Item, config)
                .then((resp) => {
                    const product = JSON.parse(resp.data.product)
                    commit('SET_PRODUCT_TO_STATE', product)
                    if (resp.data.success){
                        alert('Товар успешно добавлен!')
                    } else {
                        alert('Товар не был добавлен! Проверьте все поля!')
                    }
                    // console.log(JSON.parse(resp.data.product));
                    return product;
                    })
                    .catch((error) => {
                      console.log(error);
                      alert('Данные заполнены неверно!')
                    });
              },
        ATTR_TOGGLE({commit}, item){
            commit('ATTR_TOGGLE_ITEM', item)
        },
        ADD_TO_TITLES({commit}, title){
            commit('SET_TITLE_TO_STATE', title)
        },
        ADD_TO_USERS({commit}, user){
            commit('SET_USER_TO_STATE', user)
        },
        REMOVE_PRODUCT({commit}, id){
            // const token = localStorage.getItem('token');
            // const config = {
            //     headers: { Authorization: `Bearer ${token}` }
            // };
            // return axios.delete(`https://lm.perimeter.games/api/v1/product.delete`, id, config)
            const token = localStorage.getItem('token');
            return axios.request({
                url: 'https://lm.perimeter.games/api/v1/product.delete',
                method: 'delete',
                data: {id:id},
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((resp)=>{
                    commit('REMOVE_PRODUCT_FROM_STATE', resp)
                    alert('Товар успешно удален! Для того, чтобы увидеть актуальные товары - обновите страницу!')
                    console.log(resp)
                    return resp;
                })
                .catch((error)=>{
                    console.log(error)
                    return error;
                })
        },
        UPDATE_PRODUCT({commit}, item){
            const token = localStorage.getItem('token');
            return axios.request({
                url: 'https://lm.perimeter.games/api/v1/product.update',
                method: 'put',
                data: item,
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((resp)=>{
                    commit('UPDATE_PRODUCT_IN_STATE', resp)
                    alert('Данные о товаре успешно изменены!')
                    console.log(resp)
                    return resp;
                })
                .catch((error)=>{
                    console.log(error)
                    return error;
                })
        },
        ADD_TO_CART({commit}, item){
            commit('SET_CART', item);
        },
        DECREMENT_CART_ITEM({commit}, index){
            commit('DECREMENT', index)
        },
        INCREMENT_CART_ITEM({commit}, index){
            commit('INCREMENT', index)
        },
        DELETE_FROM_CART({commit}, index){
            commit('DELETE_FROM_CART', index);
        },
        TOGGLE_MODAL_VALUE:({commit}) =>{
            commit('CHANGE_MODAL_VALUE');
        },
        TOGGLE_CART_VALUE:({commit}) =>{
            commit('CHANGE_CART_VALUE');
        },
        TOGGLE_ORDER_VALUE:({commit}) =>{
            commit('CHANGE_ORDER_VALUE');
        }
    },
    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        TITLES(state){
            return state.titles;
        },
        ITEMS(state){
            return state.items;
        },
        ALL_ITEMS(state){
            return state.allItems;
        },
        COMPLEX_ITEMS(state){
            return state.complexItems;
        },
        ORDERS(state){
            return state.orders;
        },
        Users(state){
            return state.users;
        },
        MODAL_VALUE(state){
            return state.isModalHidden;
        },
        CART_VALUE(state){
            return state.isCartHidden;
        },
        ORDER_VALUE(state){
            return state.isOrderHidden;
        },
        CART(state){
            return state.cart;
        },
        PRODUCT_MESSAGE(state){
            return state.productCreateMessage;
        }
    }
})