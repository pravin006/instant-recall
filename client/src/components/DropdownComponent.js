import Dropdown from 'react-bootstrap/Dropdown';
import { SlOptionsVertical } from "react-icons/sl";
import { useMutation } from '@apollo/client'
import { GET_DECKS } from '../queries/deckQueries'
import { DELETE_DECK } from '../mutations/deckMutations'

function DropdownComponent({cardId}) {
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


  return (
    <Dropdown onClick={(e)=> e.stopPropagation()} >
        <Dropdown.Toggle variant="secondary" className="btn-no-caret">
            <SlOptionsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu variant="secondary">
            <Dropdown.Item onClick={deleteDeck}>Delete Deck</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>   
  )
}

export default DropdownComponent