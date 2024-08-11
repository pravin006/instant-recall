import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useMutation, useQuery} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, FormControl, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { GET_DECK } from '../queries/deckQueries';
import CardCard from './CardCard'
import SpinnerComponent from './SpinnerComponent';
import CreateEditDeckModal from './CreateEditDeckModal';
import { UPDATE_DECK } from '../mutations/deckMutations';


function DeckPage() {
  const {id} = useParams()
  const {data,loading,error} = useQuery(GET_DECK,{
    variables:{_id:id}
  })  
  
  const [updateLastReview] = useMutation(UPDATE_DECK)

  const navigate = useNavigate()

  const [overdueCards, setOverdueCards] = useState([])
  const [effectLoading, setEffectLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredCards, setFilteredCards] = useState([])
  const [selectedTime, setSelectedTime] = useState(5)

  const reviewButton = async () =>{
    await updateLastReview({ variables: { id, lastActive: new Date() } })
    navigate(`/review/${id}`, { state: { selectedTime:selectedTime } })
  }

  useEffect(()=>{
    setEffectLoading(true);
    if (data?.deck?.cards) {
      const currentDate = new Date()
      setOverdueCards(data.deck.cards.filter(card => new Date(card.dueForReview) < currentDate))
      setFilteredCards(data.deck.cards)
    }
    setEffectLoading(false);
  },[data])

  useEffect(()=>{
    if (data?.deck?.cards) {
      const filtered = data.deck.cards.filter(card =>
        card.question.toLowerCase().includes(searchKeyword.toLowerCase()) || card.answer.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      setFilteredCards(filtered)
    }
  },[searchKeyword,data])

  return (
    <Container className="mt-3">
      {effectLoading && <SpinnerComponent />}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && (
        <>
        <Row className='mb-3'>
            <h3 style={{color:'#ffffff'}}>
              {data.deck.deckName}
              <CreateEditDeckModal existingName={data.deck.deckName} existingColor={data.deck.color} id={id}/>
            </h3>
        </Row>
        
        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center " style={{backgroundImage: `linear-gradient(45deg, ${data.deck.color}, #ffffff)`}}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{overdueCards.length} cards due</Card.Title>
                <Form.Select className="mb-1 form-select-dark" value={selectedTime} onChange={(e)=>setSelectedTime(e.target.value)} style={{backgroundColor: 'transparent', border:'1px solid #495057'}}>
                    <option value={300000} style={{backgroundColor:'#27292b', color:'#ffffff'}}>5 Minutes</option>
                    <option value={600000} style={{backgroundColor:'#27292b', color:'#ffffff'}}>10 Minutes</option>
                    <option value={900000} style={{backgroundColor:'#27292b', color:'#ffffff'}}>15 Minutes</option>
                </Form.Select>
                  <Button variant="outline-dark" onClick={reviewButton} disabled={overdueCards.length===0}>Review</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mb-3 justify-content-center'>
          <Col xs={12} lg={8} xl={6} className="mb-3">
            <Card className="align-items-center" style={{cursor:'pointer', backgroundColor:data.deck.color, color:data.deck.textColor}} onClick={() => navigate('/create', { state: { deckid: id, name:data.deck.deckName } })}>
              <Card.Body>
                <Card.Title>Create Card</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Col xs={12} lg={8} xl={6} className="mb-3">
              <FormControl 
                className="search-cards"
                placeholder="Search cards..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                }}
              />
          </Col>
        </Row>

        <Row className="mb-3 justify-content-center">
          {filteredCards.slice().reverse().map(card =>(
            <Col key={card._id} xs={12}  lg={6} xl={4} className="mb-3">
              <CardCard card={card} color={data.deck.color} dueForReview={card.dueForReview}/>
            </Col>
          ))}

        </Row>
        </>
      )}
    </Container>
  )
}

export default DeckPage