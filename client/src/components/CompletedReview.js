import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from "react-icons/fa";

function CompletedReview({completedCards, deckid}) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/deck/${deckid}`);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Row className="text-center">
            <Col>
              <FaCheckCircle size={50} className="mb-3" />
              <h4>{completedCards} cards completed</h4>
            </Col>
          </Row>
        </Container>
    )
}

export default CompletedReview