import React, {useState, useEffect} from 'react'
import './../Sass/Home.scss'

import {Container} from '@material-ui/core';

import axios from 'axios'

import CasesByCountryTable from './../Components/CasesByCountryTable'
import GeneralCases from './../Components/GeneralCases'


const Home = ({API}) => {
    const[countriesTotal, setCountriesTotal] = useState([]);
    const[generalCases, setGeneralCases] = useState([]);

    const getCountriesData = () => {
        axios.get(API.COUNTRIES_TOTAL)
        .then(r => {
            setCountriesTotal(r.data);
        }).catch(e => {
            console.log(e);
        });

        axios.get(API.GENERAL_CASES)
        .then(r => {
            setGeneralCases(r.data);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        getCountriesData();
    }, []);

    return(
        <div id="Home">  
            <Container maxWidth="lg">
                <h1 className="text-center">Covid-19 Statics</h1>
                <GeneralCases generalCases={generalCases} />
                <CasesByCountryTable countriesTotal={countriesTotal} />
            </Container>
        </div>
    )
}

export default Home;