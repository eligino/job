import React from 'react';
import {Image} from 'react-native';


import LogoImage from '../../assets/images/job_logo.png';

const Logo = (props) => (
    <Image source={LogoImage}
           resizeMode={'contain'}
           style={props.style}

    />
);


export default Logo;
