import React, {useState, useEffect} from 'react'
import './../Sass/Home.scss'

import {Container, LinearProgress} from '@material-ui/core';

import axios from 'axios'
import ReactTooltip from "react-tooltip";

import CasesByCountryTable from './../Components/CasesByCountryTable'
import GeneralCases from './../Components/GeneralCases'
import GeneralStatsCountries from './../Components/GeneralStatsCountries'
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
    const[showFullDetails,setShowFullDetails] = useState(false);

    const getCountriesData = () => {
        axios.get(API.GENERAL_CASES)
        .then(r => {
            setGeneralCases(r.data);
            axios.get(API.COUNTRIES_TOTAL)
            .then(e => {
                // const highest = r.data[0].cases;
                // let withColors = [];
                // r.data.map(item => {
                //     let percent = ((item.cases / highest) * 100);
                //     let d = item;
                //     d.percent = percent;
                //     let cc = getColorForPercentage(percent)
                //     d.color = cc;
                //     withColors.push(d);
                //     return d;
                // });
                e.data.unshift({
                    country : 'Global',
                    countryInfo : {
                        "iso2": "GW",
                        "iso3": "GW",
                        flag : 'http://clipart-library.com/images_k/globe-png-transparent/globe-png-transparent-23.png',
                    },
                    ...r.data
                });

                setCountriesTotal(e.data);


                axios.get(API.HISTORY_CASES)
                .then(v => {
                    setHistoryCases(v.data);
                }).catch(e => {
                    console.log(e);
                });

            }).catch(ee => {
                console.log(ee);
            });

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
                <GeneralStatsCountries setGeneralCases={setGeneralCases} showFullDetails={showFullDetails} setShowFullDetails={setShowFullDetails} countriesTotal={countriesTotal} setHistoryCases={setHistoryCases} API={API} />
                <GeneralCases generalCases={generalCases} showFullDetails={showFullDetails} historyCases={historyCases} />
                {/* <CountriesCasesMap setTooltipContent={setMapTooltipContent} countriesTotal={countriesTotal} /> */}
                <ReactTooltip>{mapToolTipContent}</ReactTooltip>
                <CasesByCountryTable countriesTotal={countriesTotal} />
            </Container>
        </div>
    )
}

export default Home;