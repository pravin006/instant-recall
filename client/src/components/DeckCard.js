import Card from 'react-bootstrap/Card';
import DeleteDeck from './DeleteDeck';
import { useNavigate } from "react-router-dom";

function DeckCard({deck}) {
  const navigate = useNavigate();

  const handleClick = (id) =>{
    navigate(`/deck/${id}`)
  }

  return (
    <Card
        style={{ cursor: 'pointer', backgroundColor: deck.color}}
        border="light"
        text={deck.textColor}
        >
            <div className="card-content" style={{ cursor: 'pointer' }} onClick={() => handleClick(deck._id)}>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <div onClick={() => handleClick(deck._id)} style={{ flex: 1 }}>
                <Card.Title className="mb-0">{deck.deckName}</Card.Title>
            </div>
            <DeleteDeck cardId={deck._id} />
          </Card.Header>

          <Card.Body onClick={() => handleClick(deck._id)} >
            <Card.Text className='m-1'>
                <br/>
                Last Active: {deck.lastActive}
            </Card.Text>
          </Card.Body>
          </div>
    </Card>
  )
}

export default DeckCard