import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ViewEditCardModal from './ViewEditCardModal';


function CardCard({card, color}) {
    const [modalShow, setModalShow] = useState(false);
    

  return (
    <>
    <Card onClick={() => setModalShow(true)} bg='#49464e' text='white' style={{ cursor: 'pointer', backgroundColor:'#49464e', borderColor: color, borderWidth: '2px', height: '10rem' }}>
        <Card.Header style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '1rem', marginRight: '1rem' }}>{card.question}</Card.Header>
        <Card.Body  style={{  overflow: 'hidden',marginLeft: '1rem', marginRight: '1rem'}}>
            <Card.Text style={{ overflow: 'hidden',display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4}}>{card.answer}</Card.Text>
        </Card.Body>
    </Card>

    <ViewEditCardModal show={modalShow} onHide={() => setModalShow(false)} card={card}/>
    </>
  )
}

export default CardCard