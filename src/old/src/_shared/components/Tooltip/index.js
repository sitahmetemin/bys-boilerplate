import React from 'react';
import { Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';

const TooltipModal = (props) => {

    const tooltip = props.type === 'tooltip' ? <Tooltip id={props.id}>{props.text}</Tooltip> : <Popover id={props.id} title={props.title}>{props.text}</Popover>;

    return(
        <OverlayTrigger placement={props.position} overlay={tooltip}>
            {props.children}
        </OverlayTrigger>
    );
};

export default TooltipModal;