import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ViewCard from './ViewCard';


function CardCard({card}) {
    const [modalShow, setModalShow] = useState(false);
    

  return (
    <>
    <Card onClick={() => setModalShow(true)}>
        <Card.Header className='m-3'>{card.question}</Card.Header>
        <Card.Body className="m-3">
            <Card.Text>{card.answer}</Card.Text>
        </Card.Body>
    </Card>

    <ViewCard show={modalShow} onHide={() => setModalShow(false)} card={card}/>
    </>
  )
}

export default CardCard