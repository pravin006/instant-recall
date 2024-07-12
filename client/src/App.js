import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import DecksPage from './components/DecksPage'

const cache = new InMemoryCache({
  typePolicies:{
    query:{
      fields:{
        decks:{
          merge(existing,incoming){
            return incoming
          }
        },

        cards:{
          merge(existing,incoming){
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <div className="container">
          <DecksPage/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
