import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'

import PropTypes from 'prop-types'
import * as TweetsAPI from '../../apis/TweetsAPI'


class Home extends Component {

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            login: '',
            tweetAtivo: {}
        }

        this.adicionaTweet = this.adicionaTweet.bind(this)

    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            this.setState({
                tweets: this.context.store.getState()
            })
        })
    }

    componentDidMount() {
        this.context.store.dispatch(TweetsAPI.carrega())
    }

    adicionaTweet(infosDoEvento) {
        infosDoEvento.preventDefault()
        const novoTweet = this.state.novoTweet
        
        this.context.store.dispatch(TweetsAPI.adiciona(novoTweet))

        this.setState({
            novoTweet: ''
        })
    }

    
    removeTweet = (idDoTweet) => {
        this.context.store.dispatch(TweetsAPI.remove(idDoTweet))
        
    }

    abreModalDoTweet = (idDoTweetQueVaiNoModal, event) => {
        const ignoraModal = event.target.closest('.ignoraModal')

        if(!ignoraModal) {
            const tweetAtivo = this.state
                                    .tweets
                                    .find((tweetAtual) => tweetAtual._id === idDoTweetQueVaiNoModal)
            console.log(idDoTweetQueVaiNoModal)
            this.setState({
                tweetAtivo: tweetAtivo
            })
        }
    }

    fechaModal = (event) => {
        const isModal = event.target.classList.contains('modal')
        if(isModal) {
            this.setState({
                tweetAtivo: {}
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
                        { this.state.tweets.length && this.state.tweets.map((tweetInfo, index) =>
                                <Tweet 
                                    key={tweetInfo._id} 
                                    removeHandler={() => this.removeTweet(tweetInfo._id)}
                                    texto={tweetInfo.conteudo} 
                                    tweetInfo={tweetInfo}
                                    handleModal={(event) => this.abreModalDoTweet(tweetInfo._id, event)}/>
                            )  
                        }                      
                    </div>
                </Widget>
            </Dashboard>
        </div>
        
            
        <Modal isAberto={ this.state.tweetAtivo._id }  fechaModal={ this.fechaModal }>
            <Widget>
                <Tweet
                    removeHandler={() => this.removeTweet(this.state.tweetAtivo._id)} 
                    texto={this.state.tweetAtivo.conteudo || ''}
                    tweetInfo={this.state.tweetAtivo} />
            </Widget>
        </Modal>

      </Fragment>
    );
    }
}

//Home.contextTypes = {
    //store: PropTypes.object.isRequired
//}

export default Home;
