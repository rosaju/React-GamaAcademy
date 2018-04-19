export const carrega = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`) 
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetProntoDoServer) => {
                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetProntoDoServer })
            })
    }
    
}

export const adiciona = (novoTweet) => {
    return(dispatch) => {
        if(novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method:'POST',
                body: JSON.stringify({ conteudo: novoTweet})
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetProntoDoServer) => {
                dispatch({ type: 'ADICIONA_TWEET', tweet: tweetProntoDoServer })
            })
        }
    }

}

export const remove = (idDoTweet) => {
    return(dispatch) => {
        fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then((data) => data.json())
        .then((response) => {
            dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweet })
            dispatch({ type: 'REMOVE_TWEET_ATIVO' })
        /*  const tweetsAtualizados = this
            .state.tweets.filter((tweetAtual) => tweetAtual._id !== idDoTweet)
            this.setState({
                tweets: tweetsAtualizados
            }) */
        }) 
    }
}

export const like = (idDoTweet) => {
    return (dispatch) => {
        dispatch({ type: 'LIKE', idDoTweet })
        dispatch({ type: 'ADD_NOTIFICACAO', msg: 'Acho que foi, hein?!'})
        /* setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICACAO'})
        }, 5000) */
    }
}