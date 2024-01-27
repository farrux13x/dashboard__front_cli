import axios from "axios"

const customers = {
    state: () => ({
        customers:[],
        url: 'http://localhost:3100'
    }),
    getters: {
        getCustomers(state) {
            return state.customers
        },
        getUrl(state){
            return state.url
        }
    },
    mutations: {
        setCustomers(state, payload) {
            state.customers = payload
        },
        setAddCustomers(state, payload) {
            state.customers.push(payload)
        }
    },
    actions:{
        apiCustomers(context){
            axios.get(`${context.getters.getUrl}/api/customers`)
            .then(res => {
                context.commit('setCustomers', res.data)
                // console.log(res.data);
            })
        },
        apiAddCustomer(context,payload){
            axios.post(`${context.getters.getUrl}/api/customers`,payload)
            .then(res => {
                context.commit('setAddCustomers', res.data)
            })
            .catch(err => {
                console.log(err);
            })
        },
        apiSearchCustomers(context, payload){
            axios.get(`${context.getters.getUrl}/api/customers/search?text=${payload}`)
            .then(res =>{
                console.log(res.data);
            })
        },
        apiUpdataCustomers(context, payload) {
            axios.post(`${context.getters.getUrl}/api/customers/${payload._id}`, payload)
            .then(res => {
                console.log(res.data);
            })
        }
    }
}

export default customers