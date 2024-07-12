import Card from 'react-bootstrap/Card';
import DropdownComponent from './DropdownComponent';

function DeckCard({deck}) {
    const handleClick = (id) =>{
        console.log(`${id} clicked`)
    }

  return (
    <Card
        
        style={{ cursor: 'pointer' }}
        bg='secondary'
        border="success"
        //   key={variant}
        //   text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        >
            <div className="card-content" style={{ cursor: 'pointer' }} onClick={() => handleClick(deck._id)}>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <div onClick={() => handleClick(deck._id)} style={{ flex: 1 }}>
                <Card.Title className="mb-0">{deck.deckName}</Card.Title>
            </div>
            <DropdownComponent cardId={deck._id}/>   
          </Card.Header>

          <Card.Body onClick={() => handleClick(deck._id)}>
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