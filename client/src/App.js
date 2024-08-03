import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Header from './components/Header'
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage'
import DeckPage from './components/DeckPage'
import CreateCardPage from './components/CreateCardPage'
import ReviewPage from './components/ReviewPage'

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
          <div className="container-fluid d-flex" style={{ backgroundColor: '#27292b', minHeight: '92vh' }}>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/deck/:id' element={<DeckPage/>}/>
              <Route path='/review/:deckid' element={<ReviewPage/>}/>
              <Route path='/create' element={<CreateCardPage/>}/>
              <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
