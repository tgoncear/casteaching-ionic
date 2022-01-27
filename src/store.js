export default {
    user:{
      name: 'Pepe'
    },
    get(state){
        return this[state]
    }
}