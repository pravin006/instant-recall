import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ViewEditCardModal from './ViewEditCardModal';
import { formatDistanceToNow, parseISO } from 'date-fns';


function CardCard({card, color, dueForReview}) {
  const [modalShow, setModalShow] = useState(false);
  
  const formatDateTime = (dateString) =>{
    const date = parseISO(dateString)
    if (date < Date.now()){
      return 'Overdue'
    }

    const distance = formatDistanceToNow(date, { addSuffix: true })
    return `Due ${distance}`
  }

  return (
    <>
    <Card className='card-card' onClick={() => setModalShow(true)} bg='#49464e' text='white' style={{ cursor: 'pointer', backgroundColor:'#49464e', borderColor: color, borderWidth: '2px', height: '10rem' }}>
        <Card.Header style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '1rem', marginRight: '1rem' }}>{card.question}</Card.Header>
        <Card.Body  style={{  overflow: 'hidden',marginLeft: '1rem', marginRight: '1rem'}}>
            <Card.Text style={{ overflow: 'hidden',display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}}>{card.answer}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ borderTop: 'none', color:'#bbbbbb', fontSize: '0.8rem'}}>{formatDateTime(dueForReview)}</Card.Footer>
    </Card>

    <ViewEditCardModal show={modalShow} onHide={() => setModalShow(false)} card={card}/>
    </>
  )
}

export default CardCard