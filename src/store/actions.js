import { fetchPosts, login, fetchAdresses, fetchRequests, addRequest, fetchProducts, fetchOrders, addAddress, addUser, buyProduct, fetchNewRequests, startDelivery, searchCollector, deliver } from './fetch';
import { AsyncStorage } from 'react-native';

// ensure data for rendering given list type
export function FETCH_LIST_DATA({ commit, dispatch }, { type }) {
    commit('FETCHING_LISTS');
    return fetchPosts(type)
        .then(posts => {
            return commit('SET_POSTS', { posts })
        });
}

export function LOGIN({ commit, dispatch }, { userObj, navigate }) {
    commit('LOGGING_IN', true)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            login(userObj)
                .then(res => {
                    let user = res.driver
                    if (user.id) {
                        commit('LOGIN_SUCCESFULL', user);
                        AsyncStorage.setItem('email', user.email);
                        dispatch('GET_NEW_REQUESTS');
                        navigate('Home');
                        resolve();
                    }
                    else {
                        commit('LOGIN_FAILED')
                    }
                });
        }, 1000)
    })
}

export function SET_USER({ commit, state }, { userObj }) {
    return commit('LOGIN_SUCCESFULL', { userObj })
}

export function LOGOUT({ commit, state }, callback) {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem('email').then(() => {
            callback();
            resolve();
        })
    })
}

export function GET_USER_ADRESSES({ commit, dispatch }, id) {
    return fetchAdresses(id)
        .then(adresses => {
            return commit('SET_ADRESSES', adresses)
        });
}

export function SET_ADDRESS({ commit, state }, address) {
    return commit('SET_ADDRESS', address)
}

export function GET_USER_REQUESTS({ commit, dispatch }, id) {
    commit('FETCHING_REQUESTS', true)
    return fetchRequests(id)
        .then(requests => {
            return commit('SET_REQUESTS', requests)
        });
}

export function SET_REQUEST({ commit, state }, request) {
    return commit('SET_REQUEST', request)
}

export function START_REQUEST({ commit, state }, id) {
    return addRequest(id)
        .then(res => {
            console.log(res)
        });
}

export function FETCH_PRODUCTS({ commit, dispatch }, id) {
    commit('FETCHING_PRODUCTS', true)
    return fetchProducts()
        .then(products => {
            return commit('SET_PRODUCTS', products)
        });
}

export function GET_USER_ORDERS({ commit, dispatch }, id) {
    commit('FETCHING_ORDERS', true)
    return fetchOrders(id)
        .then(orders => {
            return commit('SET_ORDERS', orders)
        });
}

export function ADD_ADDRESS({ commit, state }, address) {
    return addAddress(address)
        .then(res => {
            console.log(res)
        });
}

export function ADD_USER({ commit, state }, user) {
    return addUser(user)
        .then(res => {
            console.log(res)
        });
}

export function BUY_PRODUCT({ commit, state }, payload) {
    return buyProduct(payload)
        .then(res => {
            return commit('REDUCE_POINTS', payload.price)
        });
}

export function GET_NEW_REQUESTS({ commit, dispatch }) {
    commit('FETCHING_NEW_REQUESTS', true)
    return fetchNewRequests()
        .then(requests => {
            return commit('SET_NEW_REQUESTS', requests)
        });
}

export function SET_SELECTED_REQUEST({ commit, state }, request) {
    return commit('SET_SELECTED_REQUEST', request)
}


export function START_DELIVERY({ commit, dispatch }, delivery) {
    return startDelivery(delivery)
        .then(res => {
            dispatch('GET_NEW_REQUESTS');
            return commit('SET_CURRENT_DELIVERY', delivery)
        });
}

export function SEARCH_COLLECTOR({ commit, dispatch }, delivery_code) {
    return searchCollector(delivery_code)
        .then(collector => {
            return commit('SET_CURRENT_COLLECTOR', collector)
        });
}

export function DELIVER({ commit, dispatch }, payload) {
    return deliver(payload)
        .then(res => {
            return commit('SET_CURRENT_DELIVERY', {})
        });
}