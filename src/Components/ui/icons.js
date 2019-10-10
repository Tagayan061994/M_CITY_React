import React from 'react';
import Button from "@material-ui/core/Button";

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png'


export const CityLogo = (props) => {

    const template = <div
    className="img-cover"
    style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-reapet`
    }}
    >
    </div>
    if(props.link){
          <Link to={props.linkTo} className="link_logo">
              {template}
          </Link>
    }else{
        return template;
    }
}