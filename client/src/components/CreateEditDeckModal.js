import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdEdit } from "react-icons/md";
import { GET_DECK, GET_DECKS } from '../queries/deckQueries';
import { ADD_DECK, UPDATE_DECK } from '../mutations/deckMutations';



function CreateEditDeckModal({existingName, existingColor, id}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setName('')
    };

    const handleShow = () => setShow(true);

    const [name, setName] = useState(existingName)
    const [color, setColor] = useState(existingColor)

    const [addDeck] = useMutation(ADD_DECK,{
        update(cache, {data: {addDeck}}){
            const {decks} = cache.readQuery({query:GET_DECKS})
            cache.writeQuery({
                query: GET_DECKS,
                data:{ decks: [...decks, addDeck]}
            })
        }
    })

    const [updateDeck] = useMutation(UPDATE_DECK,{
        update(cache, {data: {updateDeck}}){
            const deck = cache.readQuery({query:GET_DECK, variables: { _id: updateDeck._id } })
            cache.writeQuery({
                query: GET_DECK,
                variables: { _id: updateDeck._id },
                data:{
                    deck: {
                    ...deck.deck,
                    ...updateDeck,
                    }
                }
            })
        }
    })

    function isColorLightOrDark(hexColor) {
        const hex = hexColor.replace(/^#/, '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
      
        r /= 255;
        g /= 255;
        b /= 255;
      
        r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
      
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 0.179 ? 'black' : 'white';
    }

    const submit = async (e) =>{
        e.preventDefault()
        const textColor = isColorLightOrDark(color)
        if (!id){
            await addDeck({variables:{name, color, textColor}})
        } else{
            await updateDeck({variables:{id, name, color, textColor}})
        }
        handleClose()
    }
    
    return (
        <>
            <Button variant="outline-light" onClick={handleShow} className='mb-3' style={{border: id != null && 'none'}}>
                {id == null ? 'Create Deck' 
                : <MdEdit />} 
            </Button>

            <Modal className="input-modal" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{id == null ? 'Create' : 'Edit'} Deck</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <Form onSubmit={submit} >
                        <Form.Group className="mb-3" controlId="deckName">
                            <Form.Label >Deck Name</Form.Label>
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
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="outline-light" type='submit'>
                            Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateEditDeckModal