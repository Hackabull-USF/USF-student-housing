import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Map from "./Maps";

const popover = (position) => (
  <Popover id="popover-basic" style={{width: "350px"}}>
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body id="popover">
      <Map position={position}/>
    </Popover.Body>
  </Popover>
);

export default function Hover(position){
  return <Example position ={position}/>
}


const Example = (position) => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover(position)}>
    <Button variant="success">Click me to see</Button>
  </OverlayTrigger>
);

