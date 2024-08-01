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

function ViewCard({show, onHide, card}) {
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)
    
    const [edit, setEdit] = useState(true)

    const [updateCard] = useMutation(UPDATE_CARD,{
        variables: { _id: card._id, question, answer }
    })

    const [deleteCard] = useMutation(DELETE_CARD,{
        variables: { _id: card._id },
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
            try {
                await updateCard(card._id, question, answer)
                setEdit(true)
            } catch (error) {
                console.error('Error updating card:', error)
            }

        }
    }

    const handleDelete = async () =>{
        try {
            await deleteCard(card._id)
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
                <Row className="justify-content-center h-50">
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

                <Row className="justify-content-center h-50">
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
        
            <Modal.Footer >
                <Row  className="justify-content-right">
                    <Col>
                        <Button  variant="outline-danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button  variant="outline-primary" onClick={handleEditSave}>
                            {edit ? 'Edit' : 'Save'}
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewCard