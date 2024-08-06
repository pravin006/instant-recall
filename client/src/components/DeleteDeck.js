import { FaTrash } from "react-icons/fa";
import { useMutation } from '@apollo/client'
import { GET_DECKS } from '../queries/deckQueries'
import { DELETE_DECK } from '../mutations/deckMutations'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function DeleteDeck({cardId}) {
  const [deleteDeck] = useMutation(DELETE_DECK,{
    // refetchQueries: [{query: GET_DECKS}]
    update(cache, {data:{deleteDeck}}) {
      const {decks} = cache.readQuery({query:GET_DECKS})
      cache.writeQuery({
        query: GET_DECKS,
        data: {decks: decks.filter(deck => deck._id !== deleteDeck._id)}
      })
    }
  })

  const handleDelete = async (e) =>{
    const promise = deleteDeck({variables: { _id: cardId }})

    toast.promise(
        promise,
        {
            pending:"Deleting...",
            success:'Deck deleted successfully!',
            error:'Error deleting deck. Please try again.'
        }
    )

    e.stopPropagation()
    try {
      await promise
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