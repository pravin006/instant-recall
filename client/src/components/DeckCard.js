import Card from 'react-bootstrap/Card';
import DropdownComponent from './DropdownComponent';
import { useNavigate } from "react-router-dom";

function DeckCard({deck}) {
  const navigate = useNavigate();

  const handleClick = (id) =>{
    navigate(`/deck/${id}`)
  }

  return (
    <Card
        style={{ cursor: 'pointer', backgroundColor: deck.color}}
        border="success"
        //   key={variant}
        text={deck.textColor}
        >
            <div className="card-content" style={{ cursor: 'pointer' }} onClick={() => handleClick(deck._id)}>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <div onClick={() => handleClick(deck._id)} style={{ flex: 1 }}>
                <Card.Title className="mb-0">{deck.deckName}</Card.Title>
            </div>
            <DropdownComponent cardId={deck._id} bgColor={deck.color}/>   
          </Card.Header>

          <Card.Body onClick={() => handleClick(deck._id)} >
            <Card.Text>
                {deck.isActive ? 'Active' : 'Inactive'}
                <br/>
                Last Active: {deck.lastActive}
            </Card.Text>
          </Card.Body>
          </div>
    </Card>
  )
}

export default DeckCard