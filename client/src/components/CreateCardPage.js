import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container,Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { ADD_CARD } from '../mutations/cardMutations';
import { TiArrowBack } from 'react-icons/ti';
import { GET_DECK } from '../queries/deckQueries';
import { toast } from 'react-toastify';


function CreateCardPage() {
    const location = useLocation()
    const { deckid, name } = location.state

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()

    const [addCard] = useMutation(ADD_CARD,{
        refetchQueries: [{ query: GET_DECK, variables: { _id: deckid } }]
    })

    const submit = async (e) =>{
        e.preventDefault()

        if (!question.trim() || !answer.trim()) {
            toast.error('Empty Field(s)!')
            return
        }

        const promise = addCard({variables: { deckid, question, answer }})

        toast.promise(
            promise,
            {
                pending:"Creating...",
                success:'Card added successfully!',
                error:'Error adding card. Please try again.'
            }
        )

        try {
            await promise
            setQuestion('')
            setAnswer('')
        } catch (error) {
            console.error('Error adding card:', error)
        }
    }

    const back = () =>{
        navigate(`/deck/${deckid}`)
    }


  return (
    <Container className='mt-3'>
        <Row className="d-flex align-items-center mt-3 mb-3">
            <Col xs="auto">
                    <Button variant="outline-light" onClick = {back} className='d-flex justify-content-center align-items-center'>
                        <TiArrowBack />
                    </Button>
            </Col>
            <Col>
            <h3 style={{color:'#ffffff'}}>
                {name}
            </h3>
            </Col>
        </Row>
        <Form className='mt-3' onSubmit={(e)=>submit(e)}>
            <Row className='mb-3'>
                <Col sm={12} lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Control onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={9}  value={question} placeholder="Card Question Here" style={{resize: 'none',}}/>
                    </Form.Group>
                </Col>

                <Col sm={12} lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Control onChange={(e) => setAnswer(e.target.value)} as="textarea" rows={9} value={answer} placeholder="Card Answer Here" style={{resize: 'none',}}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col sm={12} lg={6}>
                    <Button  type='submit' className='w-100' variant="outline-light">
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    
    </Container>
  )
}

export default CreateCardPage