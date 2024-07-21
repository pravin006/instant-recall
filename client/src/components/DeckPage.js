import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useQuery} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { GET_DECK } from '../queries/deckQueries';
import CardCard from './CardCard'
import SpinnerComponent from './SpinnerComponent';


function DeckPage() {
  const {id} = useParams()
  const {data,loading,error} = useQuery(GET_DECK,{
    variables:{_id:id}
  })  
  
  const navigate = useNavigate()

  const [overdueCards, setOverdueCards] = useState([])
  const [effectLoading, setEffectLoading] = useState(true);

  useEffect(()=>{
    setEffectLoading(true);
    if (data && data.deck && data.deck.cards) {
      const currentDate = new Date()
      setOverdueCards(data.deck.cards.filter(card => new Date(card.dueForReview) < currentDate))
    }
    setEffectLoading(false);
  },[data])

  return (
    <Container className="mt-3">
      {effectLoading && <SpinnerComponent />}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && (
        <>
        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center " style={{backgroundColor:'#b1b7bd'}}>
              <Card.Body >
                <Card.Title>{overdueCards.length} cards due</Card.Title>
                <div className="d-flex justify-content-center">
                  <Button variant="outline-dark" onClick={() => navigate(`/review/${id}`)}>Review</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center" style={{cursor:'pointer', backgroundColor:data.deck.color}} onClick={() => navigate('/create', { state: { deckid: id } })}>
              <Card.Body>
                <Card.Title>Create Card</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3 justify-content-center">
          {data.deck.cards.slice().reverse().map(card =>(
            <Col key={card._id} xs={12}  lg={6} xl={4} className="mb-3">
              <CardCard card={card} color={data.deck.color}/>
            </Col>
          ))}

        </Row>
        </>
      )}
    </Container>
  )
}

export default DeckPage