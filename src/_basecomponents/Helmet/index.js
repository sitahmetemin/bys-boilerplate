import React from 'react';
import {Helmet} from "react-helmet";

const HelmetTitle = (props) => {

    const title = props.title;

    return(
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default HelmetTitle;