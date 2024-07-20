import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../mutations/cardMutations';

function ViewCard({show, onHide, card}) {
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)
    
    const [edit, setEdit] = useState(true)

    const [updateCard] = useMutation(UPDATE_CARD,{
        variables: { _id: card._id, question, answer }
    })


    const handleClick = async () =>{
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
                <Container>
                <Row className="justify-content-center mb-3">
                    <Col sm={12} lg={8} >
                        <Form.Control plaintext={edit} readOnly={edit} value={question} onChange={(e) => setQuestion(e.target.value)}/>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-3">
                    <Col sm={12} lg={8} >
                        <Form.Control plaintext={edit} readOnly={edit} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                    </Col>
                </Row>
                </Container>
            </Modal.Body>
        
            <Modal.Footer >
                <Row  className="justify-content-right">
                    <Button  variant="outline-primary" onClick={handleClick}>
                        {edit ? 'Edit' : 'Save'}
                    </Button>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewCard