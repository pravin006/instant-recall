import Dropdown from 'react-bootstrap/Dropdown';
import { SlOptionsVertical } from "react-icons/sl";

function DropdownComponent() {
  return (
    <Dropdown onClick={(e)=> e.stopPropagation()} >
        <Dropdown.Toggle variant="secondary" className="btn-no-caret">
            <SlOptionsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu variant="secondary">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>   
  )
}

export default DropdownComponent