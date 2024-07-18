import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
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



  return (
    <Container className="mt-5">
      {loading && <SpinnerComponent />}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && (
        <>
        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center">
              <Card.Body>
                <Card.Title>42 cards due</Card.Title>

                <Button className="align-items-center" variant="primary">Review</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center">
              <Card.Body>
                <Card.Title>Create Card</Card.Title>

                <Button className="align-items-center" variant="primary" onClick={() => navigate('/create', { state: { deckid: id } })}>Create</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {data.deck.cards.map(card =>(
            <Col key={card._id} xs={12}  lg={6} xl={4} className="mb-3">
              <CardCard card={card} />
            </Col>
          ))}

        </Row>
        </>
      )}
    </Container>
  )
}

export default DeckPage