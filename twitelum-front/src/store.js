import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'


function tweetsReducer(estadoInicial = { lista: [], tweetAtivo: {} }, action = {}) {
    if(action.type === 'CARREGA_TWEETS') {
        const novoEstado = {
            ...estadoInicial,
            lista: action.tweets
        }
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET') {
        const novoEstado = {
            ...estadoInicial,
            lista: [action.tweet, ...estadoInicial.lista]
        }
        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET') {
        const listaDeTweets = estadoInicial.lista.filter((tweetAtual) => tweetAtual._id !== action.idDoTweet)
        const tweetsAtualizados = {
            ...estadoInicial,
            lista: listaDeTweets,
            tweetAtivo: {}
        }
        return tweetsAtualizados
    }

    if(action.type === 'ADD_TWEET_ATIVO') {
        const tweetAtivo = estadoInicial.lista
            .find((tweetAtual) => tweetAtual._id === action.idDoTweetQueVaiNoModal)
        
        const novoEstado = {
            ...estadoInicial,
            tweetAtivo: tweetAtivo
        }

        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...estadoInicial,
            tweetAtivo: {}
        }
    }

    if(action.type === 'LIKE') {
        const tweetsAtualizados = estadoInicial.lista.map((tweetAtual) => {

            if(tweetAtual._id === action.idDoTweet) {
                const { likeado, totalLikes } = tweetAtual
                    tweetAtual.likeado = !likeado
                    tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes +1
            } 
            
            return tweetAtual
        })

        return {
            ...estadoInicial,
            lista: tweetsAtualizados
        }
    }

    return estadoInicial

}

function notificacoesReducer(estadoInicial = '', action = {}) {
    if(action.type === 'ADD_NOTIFICACAO') {
        const novoEstado = action.msg
        return novoEstado
    }

    if(action.type === 'REMOVE_NOTIFICACAO') {
        const novoEstado = ''
        return novoEstado
    }

    return estadoInicial
}

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacoesReducer
    }),
    applyMiddleware(thunk))

export default store;
