import React, {useState, useEffect} from 'react'
import './../Sass/Home.scss'

import {Container} from '@material-ui/core';

import axios from 'axios'
import ReactTooltip from "react-tooltip";

import CasesByCountryTable from './../Components/CasesByCountryTable'
import GeneralCases from './../Components/GeneralCases'
import CountriesCasesMap from './../Components/CountriesCasesMap'

const Home = ({API}) => {
    const scaleColors = [
        { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 0.0, color: { r: 0x00, g: 0xff, b: 0 } } 
    ];
    
    const getColorForPercentage = function(pct) {
        // rgba(255, 0, 0, 1)
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
        getCountriesData();
    }, []);

    return(
        <div id="Home">  
            <Container maxWidth="lg">
                <h1 className="text-center">Covid-19 Statics</h1>
                <GeneralCases generalCases={generalCases} historyCases={historyCases} />
                <CasesByCountryTable countriesTotal={countriesTotal} />
                <CountriesCasesMap setTooltipContent={setMapTooltipContent} countriesTotal={countriesTotal} />
                <ReactTooltip>{mapToolTipContent}</ReactTooltip>
            </Container>
        </div>
    )
}

export default Home;