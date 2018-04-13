import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            login: ''
        
        }

        this.adicionaTweet = this.adicionaTweet.bind(this)

    }

    componentDidMount() {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`) 
            .then((respostaDoServer) => respostaDoServer.json())
            .then((tweetProntoDoServer) => {
                this.setState({
                    tweets: tweetProntoDoServer,
                    login: localStorage.getItem('LOGIN')
                })
            })
    }

    adicionaTweet(infosDoEvento) {
        infosDoEvento.preventDefault()
        const novoTweet = this.state.novoTweet
        
        if(novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method:'POST',
                body: JSON.stringify({ conteudo: novoTweet})
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetProntoDoServer) => {
                this.setState({
                    tweets: [tweetProntoDoServer, ...this.state.tweets]
                })
            })
        }
    }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario={ `@ ${this.state.login}` } />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                        <div className="novoTweet__editorArea">                            
                            <span 
                                className={`
                                    novoTweet__status
                                    ${ this.state.novoTweet.length > 140
                                        ? 'novoTweet__status--invalido' : '' }
                                `}>
                                { this.state.novoTweet.length }/140                            
                            </span>
                            <textarea 
                                className="novoTweet__editor" 
                                value={ this.state.novoTweet }
                                onInput={ (event) => this.setState({ novoTweet: event.target.value}) }
                                placeholder="O que está acontecendo?">
                            </textarea>
                        </div>
                        <button className="novoTweet__envia"
                                disabled={ this.state.novoTweet.length > 140 ? true : false }
                                type="submit" >
                            Tweetar
                        </button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { this.state.tweets.map(
                            (tweetInfo, index) =>
                                <Tweet key={tweetInfo._id} texto={tweetInfo.conteudo} tweetInfo={tweetInfo}/>
                            )  
                        }                      
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
