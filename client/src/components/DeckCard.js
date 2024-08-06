import Card from 'react-bootstrap/Card';
import DeleteDeck from './DeleteDeck';
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from 'date-fns';

function DeckCard({deck}) {
  const navigate = useNavigate();

  const formatDateTime = (dateString) =>{
    const date = parseISO(dateString)
    const distance = formatDistanceToNow(date, { addSuffix: true })
    return distance
  }

  const handleClick = (id) =>{
    navigate(`/deck/${id}`)
  }

  return (
    <Card
        style={{ cursor: 'pointer', backgroundColor: deck.color, height:'9rem'}}
        border="light"
        text={deck.textColor}
        >
            <div className="card-content" style={{ cursor: 'pointer' }} onClick={() => handleClick(deck._id)}>
          <Card.Header className='d-flex justify-content-between align-items-center' style={{borderBottom:'none'}}>
            <div onClick={() => handleClick(deck._id)} style={{ flex: 1 }}>
                <Card.Title className="mb-0">{deck.deckName}</Card.Title>
            </div>
            <DeleteDeck cardId={deck._id} />
          </Card.Header>

          <Card.Body onClick={() => handleClick(deck._id)} >
            <Card.Text style={{textSize:'0.5rem'}}>
                <br/>
                Last Active: {formatDateTime(deck.lastActive)}
            </Card.Text>
          </Card.Body>
          </div>
    </Card>
  )
}

export default DeckCard