import Dropdown from 'react-bootstrap/Dropdown';
import { FaTrash } from "react-icons/fa";
import { useMutation } from '@apollo/client'
import { GET_DECKS } from '../queries/deckQueries'
import { DELETE_DECK, UPDATE_DECK } from '../mutations/deckMutations'
import { Button } from 'react-bootstrap';

function DeleteDeck({cardId}) {
  const [deleteDeck] = useMutation(DELETE_DECK,{
    variables: { _id: cardId },
    // refetchQueries: [{query: GET_DECKS}]
    update(cache, {data:{deleteDeck}}) {
      const {decks} = cache.readQuery({query:GET_DECKS})
      cache.writeQuery({
        query: GET_DECKS,
        data: {decks: decks.filter(deck => deck._id !== deleteDeck._id)}
      })
    }
  })

  const handleDelete = (e) =>{
    e.stopPropagation()
    try {
      deleteDeck()
    } catch (error) {
      console.log('Error on deck delete: ', error)
    }
  }


  return (  
    <Button onClick={(e) => handleDelete(e)} variant="outline-warning">
      <FaTrash />
    </Button>
  )
}

export default DeleteDeck