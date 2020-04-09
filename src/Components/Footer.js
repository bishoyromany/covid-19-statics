import React from 'react'
import './../Sass/Footer.scss'

import {Container, Paper} from '@material-ui/core';
import {Favorite} from '@material-ui/icons';


const Footer = () => {


    return(
        <div id="Footer">  
            <Container maxWidth="lg">
                <Paper className="paper">
                    <span className="may-with">This Website Made With {<Favorite color="secondary" />} By</span> 
                    <a href="https://github.com/bishoyromany/" target="_blank" rel="noopener noreferrer" className="creator">Bishoy Romany</a>
                </Paper>
            </Container>
        </div>
    )
}

export default Footer;