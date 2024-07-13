import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import DecksPage from './components/DecksPage'
import NotFoundPage from './components/NotFoundPage'
import DeckPage from './components/DeckPage'
import EditCardPage from './components/EditCardPage'

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
        <Router>
          <Header/>
          <div className="container">
            <Routes>
              <Route path='/' element={<DecksPage/>}/>
              <Route path='/deck/:id' element={<DeckPage/>}/>
              <Route path='/create' element={<EditCardPage/>}/>
              <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
