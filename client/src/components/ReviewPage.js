import { useState, useEffect } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { Container,Row,Col, Button } from 'react-bootstrap'
import { useApolloClient } from '@apollo/client';
import { GET_DECK } from '../queries/deckQueries';
import MinHeap from '../heapAlgorithm/MinHeap'

import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../mutations/cardMutations';
import CompletedReview from './CompletedReview';
import SpinnerComponent from './SpinnerComponent';



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

        const updatedCompleted = { ...completed, newDueForReview }
        setCompletedCards(prevCompletedCards => {
            const newCompletedCards = [...prevCompletedCards, updatedCompleted]
            console.log(newCompletedCards)
            return newCompletedCards
        })
        setCurrentCard(!timer ? minHeap.peek() : null)
        setViewAnswer(false)
    }

    
  return (
    <Container>
        {!minHeap ? <SpinnerComponent /> :
        !currentCard ? <CompletedReview completedCards = {completedCards.length} deckid = {deckid}/> :
        (
        <>
        <Row>
            <p>{currentCard.question}</p>
        </Row>
        <Row hidden={!viewAnswer}>
            <p>{currentCard.answer}</p>
        </Row>
        <Row hidden={!viewAnswer}>
            <p>{currentCard.dueForReview}</p>
        </Row>

        {!viewAnswer ? 
            <Row><Button onClick={() => setViewAnswer(true)}>View Answer</Button></Row> :(
        <Col>
            <Row><Button onClick={() => handleRecall(0)}>Unable to recall. Keep due for review date.Move to next card in min heap</Button></Row>
            <Row><Button onClick={() => handleRecall(1)}>Able to recall after a while. +1 day to dueForReview date. Move to next card in min heap</Button></Row>
            <Row><Button onClick={() => handleRecall(3)}>Easily able to recall. +3 days to dueForReview date. Move to next card in min heap</Button></Row>
        </Col>
        )}
        </>
        )}
    </Container>
  )
}

export default ReviewPage