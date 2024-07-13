import { useState } from 'react';
import { Container,Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { GET_DECK } from '../queries/deckQueries';


function EditCardPage() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


  return (
    <Container className='mt-3'>
    
        <Form className='mt-5'>
            <Row className='mb-3'>
                <Col sm={12} lg={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Question</Form.Label>
                        <Form.Control onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={8} value={question}/>
                        
                    </Form.Group>
                </Col>

                <Col sm={12} lg={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control onChange={(e) => setAnswer(e.target.value)} as="textarea" rows={8} value={answer}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col sm={12} lg={6}>
                    <Button  className='w-100' variant="outline-primary" type="submit">
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    
    </Container>
  )
}

export default EditCardPage