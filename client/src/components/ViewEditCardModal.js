import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { UPDATE_CARD, DELETE_CARD } from '../mutations/cardMutations';
import { GET_DECK } from '../queries/deckQueries';
import { toast } from 'react-toastify';

function ViewEditCard({show, onHide, card}) {
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)
    
    const [edit, setEdit] = useState(true)

    const [updateCard] = useMutation(UPDATE_CARD)

    const [deleteCard] = useMutation(DELETE_CARD,{
        update(cache, { data: { deleteCard } }) {
            const { deck } = cache.readQuery({query: GET_DECK, variables: { _id: card.deckId }})

            cache.writeQuery({
                query: GET_DECK,
                variables: { _id: card.deckId },
                data: {
                    deck: {
                        ...deck,
                        cards: deck.cards.filter(cachedCard => cachedCard._id !== deleteCard._id)
                    }
                }
            })
        }
    })

    const handleEditSave = async () =>{
        if(edit){
            setEdit(false)
        }

        else{
            if (!question.trim() || !answer.trim()) {
                toast.error('Empty Field(s)!')
                return
            }

            const promise = updateCard({variables: { _id: card._id, question, answer }})

            toast.promise(
                promise,
                {
                    pending:"Updating...",
                    success:'Card updated successfully!',
                    error:'Error updating card. Please try again.'
                }
            )

            try {
                await promise
                setEdit(true)
            } catch (error) {
                console.error('Error updating card:', error)
            }

        }
    }

    const handleDelete = async () =>{
        const promise = deleteCard({variables: { _id: card._id }})

        toast.promise(
            promise,
            {
                pending:"Deleting...",
                success:'Card deleted successfully!',
                error:'Error deleting card. Please try again.'
            }
        )

        try {
            await promise
            onHide()
        } catch (error) {
            console.error('Error deleting card:', error)
        }
    }

    const handleClose = () => {
        setQuestion(card.question)
        setAnswer(card.answer)
        setEdit(true)
        onHide()
    }

    return (
        <Modal show={show} onHide={handleClose}  fullscreen className="input-modal">
            
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Container className="h-100">
                <Row className="justify-content-center" style={{ height: '30%' }}>
                    <Col sm={12} lg={8} >
                        <Form.Control 
                            plaintext={edit}
                            as="textarea" 
                            readOnly={edit} 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#ffffff' ,
                                border: edit && 'none',
                                borderBottom: edit && '1px solid #838583',
                                height: '100%',
                                resize: 'none',
                                fontSize:'22px',
                            }}/>
                    </Col>
                </Row>

                <Row className="justify-content-center" style={{ height: '70%' }}>
                    <Col sm={12} lg={8} >
                        <Form.Control 
                            plaintext={edit}
                            as="textarea"
                            readOnly={edit} 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#ffffff' ,
                                border: edit && 'none',
                                height: '100%',
                                resize: 'none',
                                
                                fontSize:'22px'
                            }}/>
                    </Col>
                </Row>
                </Container>
            </Modal.Body>
        
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button  variant="outline-danger" onClick={handleDelete} style={{width:'5rem'}}>
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button  variant="outline-primary" onClick={handleEditSave} style={{width:'5rem'}}>
                            {edit ? 'Edit' : 'Save'}
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewEditCard