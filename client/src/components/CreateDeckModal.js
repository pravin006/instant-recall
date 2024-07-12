import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GET_DECKS } from '../queries/deckQueries';
import { ADD_DECK } from '../mutations/deckMutations';


function CreateDeckModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('')
    const [color, setColor] = useState("#563d7c")

    const [addDeck] = useMutation(ADD_DECK,{
        variables:{name},
        update(cache, {data: {addDeck}}){
            const {decks} = cache.readQuery({query:GET_DECKS})
            cache.writeQuery({
                query: GET_DECKS,
                data:{ decks: [...decks, addDeck]}
            })
        }
    })    

    const submit = (e) =>{
        e.preventDefault()
        addDeck(name)
        setName('')
    }
    
    return (
        <>
            <Button variant="secondary" onClick={handleShow} className='mb-3'>
            Create New Deck
            </Button>

            <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Deck</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="deckName">
                        <Form.Label>Deck Name</Form.Label>
                        <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label >Choose Deck Theme</Form.Label>
                        <Form.Control 
                            style={{width:'100%'}}
                            type="color"
                            id="colorInput"
                            // defaultValue="#563d7c"
                            // title="Choose your color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={handleClose} type='submit'>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

            

            </Modal>
        </>
    );
}

export default CreateDeckModal