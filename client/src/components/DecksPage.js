import { useQuery } from '@apollo/client'
import { Container, Row, Col } from 'react-bootstrap'
import { GET_DECKS } from '../queries/deckQueries'
import SpinnerComponent from './SpinnerComponent'
import DeckCard from './DeckCard'
import CreateEditDeckModal from './CreateEditDeckModal'


function DecksPage() {
    const {loading,error, data} = useQuery(GET_DECKS)

  return (
    <Container className="mt-3">
        <CreateEditDeckModal existingName={''} existingColor={"#563d7c"}/>
        {loading && <SpinnerComponent />}
        {error && <p>Something went wrong...</p>}
        {!loading && !error && (
            <Row className="justify-content-center">
                {data.decks.slice().sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive)).map(deck => (
                    <Col key={deck._id} xs={12}  lg={6} xl={4} className="mb-3">
                        <DeckCard deck={deck} />
                    </Col>
                ))}
            </Row>
        )}
    </Container>
  )
}

export default DecksPage