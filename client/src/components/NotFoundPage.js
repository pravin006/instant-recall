import { Col, Container, Row } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{color:'white'}}>
      <Row className="text-center">
        <Col >
          <FaExclamationTriangle className='text-danger' size='5em'/>
          <h1>404</h1>
          <h4>Page Not Found</h4>
          <Link to='/' className='btn btn-secondary'>Go Back</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage