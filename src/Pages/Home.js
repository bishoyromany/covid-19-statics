import React, {useState, useEffect} from 'react'
import './../Sass/Home.scss'

import {Container, LinearProgress} from '@material-ui/core';

import axios from 'axios'
import ReactTooltip from "react-tooltip";

import CasesByCountryTable from './../Components/CasesByCountryTable'
import GeneralCases from './../Components/GeneralCases'
import CountriesCasesMap from './../Components/CountriesCasesMap'

import header_background from './../images/header_background.jpg'

const Home = ({API}) => {
    // auto refresh data time
    const waitTime = 180;

    const getColorForPercentage = function(pct) {
        if(pct == 0){
            return 'green';
        }
        return `rgba(255, 0, 0, ${(pct/100) + 0.3})`;
    };


    const[countriesTotal, setCountriesTotal] = useState([]);
    const[generalCases, setGeneralCases] = useState([]);
    const[historyCases, setHistoryCases] = useState([]);
    const[mapToolTipContent, setMapTooltipContent] = useState("");

    const getCountriesData = () => {
        axios.get(API.COUNTRIES_TOTAL)
        .then(r => {
            const highest = r.data[0].cases;
            let withColors = [];
            r.data.map(item => {
                let percent = ((item.cases / highest) * 100);
                let d = item;
                d.percent = percent;
                let cc = getColorForPercentage(percent)
                d.color = cc;
                withColors.push(d);
                return d;
            });
            setCountriesTotal(withColors);
        }).catch(e => {
            console.log(e);
        });

        axios.get(API.GENERAL_CASES)
        .then(r => {
            setGeneralCases(r.data);
        }).catch(e => {
            console.log(e);
        });

        axios.get(API.HISTORY_CASES)
        .then(r => {
            setHistoryCases(r.data);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        // auto update
        getCountriesData();
        setInterval(() => {
            getCountriesData();
        }, waitTime * 1000)
    }, []);

    const loadingProgress = countriesTotal.length < 1 || generalCases.length < 1 || historyCases.length < 1  ? <LinearProgress className="progress" /> : '';

    return(
        <div id="Home">  
            {loadingProgress}
            <h1 className="text-center homePageHeader" style={{
                background : `url(${header_background}) fixed no-repeat center center`,
                backgroundSize : 'cover'
            }}><span>Covid-19 Online Updates</span></h1>
            <Container maxWidth="lg">
                <GeneralCases generalCases={generalCases} countriesTotal={countriesTotal} historyCases={historyCases} />
                {/* <CountriesCasesMap setTooltipContent={setMapTooltipContent} countriesTotal={countriesTotal} /> */}
                <ReactTooltip>{mapToolTipContent}</ReactTooltip>
                <CasesByCountryTable countriesTotal={countriesTotal} />
            </Container>
        </div>
    )
}

export default Home;