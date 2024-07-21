import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container,Row,Col, Button } from 'react-bootstrap'
import { useApolloClient } from '@apollo/client';
import { GET_DECK } from '../queries/deckQueries';
import MinHeap from '../heapAlgorithm/MinHeap'

import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../mutations/cardMutations';
import CompletedReview from './CompletedReview';
import SpinnerComponent from './SpinnerComponent';

import { TiArrowBack } from "react-icons/ti";


function ReviewPage() {
    const {deckid} = useParams()
    const [timer, setTimer] = useState(false)
    const [viewAnswer, setViewAnswer] = useState(false)
    const [minHeap, setMinHeap] = useState(null)
    const [currentCard, setCurrentCard] = useState(null)
    const [completedCards, setCompletedCards] = useState([])
    const client = useApolloClient()

    const [updateCard] = useMutation(UPDATE_CARD)
    
    useEffect(()=>{
        const initHeap = ()=>{
            const { deck } = client.readQuery({ query: GET_DECK, variables: { _id: deckid }})

            if (deck && deck.cards){
                const currentDate = new Date()
                const overdueCards = deck.cards.filter(card => new Date(card.dueForReview) < currentDate)
                const heap = new MinHeap(overdueCards)
                setMinHeap(heap)
                setCurrentCard(heap.peek())
            }
        }
        initHeap()
        
    },[client,deckid])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimer(true)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])
  
    const handleRecall = (days) =>{
        const completed = minHeap.remove()

        const today = new Date()
        const newDueForReview = new Date(today.setDate(today.getDate() + days))
        updateCard({variables:{ _id:completed._id, dueForReview: newDueForReview }})

        setCompletedCards(prevCompletedCards => {
            return [...prevCompletedCards, completed]  
        })
        setCurrentCard(!timer ? minHeap.peek() : null)
        setViewAnswer(false)
    }

    const prevCard = () =>{
        setViewAnswer(false)
        const lastCompleted = completedCards.pop()
        minHeap.add(lastCompleted)
        setCurrentCard(minHeap.peek())
    }

    
  return (
    <Container style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {!minHeap ? <SpinnerComponent /> :
        !currentCard ? <CompletedReview completedCards = {completedCards.length} deckid = {deckid}/> :
        (
        <>
        <Row className="d-flex justify-content-end mt-3 mb-3">
            <Col xs="auto">
                <Button variant="outline-light" disabled = {completedCards.length === 0} onClick = {prevCard} className='mt-3 mb-3 d-flex justify-content-center align-items-center'>
                    <TiArrowBack />
                </Button>
            </Col>
        </Row>
        
        <Row style={{ flex: '1' }}>
            <Col>
                <div style={{ height: '50%' }}>
                    <p>{currentCard.question}</p>
                </div>
                <div style={{ height: '50%' }} hidden={!viewAnswer}>
                    <p>{currentCard.answer}</p>
                </div>
            </Col>
        </Row>

        <Row className="mb-3">
            {!viewAnswer ? 
                <Button variant="outline-light" onClick={() => setViewAnswer(true)}>View Answer</Button> 
                :(
                <Col>
                    <Button className='mb-2' onClick={() => handleRecall(0)} style={{backgroundColor:'#d61818', border:'none', color:'black', width:'100%'}}>Unable to recall.</Button>
                    <Button className='mb-2' onClick={() => handleRecall(1)} style={{backgroundColor:'#d6d018', border:'none', color:'black', width:'100%'}}>Took awhile...</Button>
                    <Button className='mb-2' onClick={() => handleRecall(3)} style={{backgroundColor:'#2bd618', border:'none', color:'black', width:'100%'}}>Easy!</Button>
                </Col>
                )
            }
        </Row>
        </>
        )}
    </Container>
  )
}

export default ReviewPage