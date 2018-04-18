import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


function tweetsReducer(estadoInicial = [], action = {}) {
    console.log(action)
    if(action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET') {
        console.warn('Acao que tá acontecendo agora', action.type, estadoInicial)
        const novoEstado = [action.tweet, ...estadoInicial]
        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET') {
        console.log(estadoInicial)
        const tweetsAtualizados = estadoInicial.filter((tweetAtual) => tweetAtual._id !== action.idDoTweet)

        estadoInicial = tweetsAtualizados
    }

    return estadoInicial

}

const store = createStore(
    tweetsReducer,
    applyMiddleware(thunk))

export default store;
