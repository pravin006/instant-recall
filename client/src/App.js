import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import DecksPage from './components/DecksPage'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
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
