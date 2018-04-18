import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetsAPI from '../apis/TweetsAPI'


const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
        }
    }
}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer;

// # Connect padrão sem ajuda da lib
/* class TweetPadrao extends Comment {
    removeHandler () { store.dispatch(TweetsAPI.remove()) }
        render() {
            return (
                <Tweet removeHandler={ this.removeHandler } />
            )
        }
} */