import React from 'react';
import ScrollArea from 'react-scrollbar';

const Scroll = (props) => {

    const sclass = props.scrollclass;

    return(
        <ScrollArea
            speed={0.8}
            className={sclass}
            contentClassName=""
            horizontal={false}
        >
            {props.children}
        </ScrollArea>
    );
};

export default Scroll;