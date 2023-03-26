import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Maps from "./Maps";

const popover = (position) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Location</Popover.Header>
    <p style={{ margin: '15px'}}>{position.position.position}</p>
    <Popover.Body id="popover">
      <Maps position={position}/>
    </Popover.Body>
  </Popover>
);

export default function Hover(position){
  return <Example position ={position}/>
}


const Example = (position) => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover(position)}>
    <Button variant="success" style={{ marginLeft: "10px" }}>MAP</Button>
  </OverlayTrigger>
);

