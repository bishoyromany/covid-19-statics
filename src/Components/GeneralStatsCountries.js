import React, { useEffect, useState } from 'react'
import SelectSearch from 'react-select-search';
import {Grid, Paper} from '@material-ui/core'
import PaperOptions from './PaperOptions'
import './../Sass/react-select-css.css'
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function renderCountry(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 20,
    };

    return (
        <button {...props} className={className} type="button">
            <span><img alt="" style={imgStyle} width="32" height="32" src={option.photo} /><span>{option.name}</span></span>
        </button>
    );
}

export default function GeneralStatsCountries({setGeneralCases, countriesTotal, setHistoryCases, API, showFullDetails, setShowFullDetails}){
    const [country,setCountry] = useState('Global');
    const [countries,setCountries] = useState([]);
    const [generalStats,setGeneralStats] = useState({});
    useEffect(() => {
        if(countriesTotal.length > 0){
            let countriesD = [];
            countriesTotal.map(item => {
                countriesD.push({
                    name : item.country,
                    value : item.country,
                    photo : item.countryInfo.flag,
                })
            });
            setCountries(countriesD);
            console.log(countries,countriesTotal)
        }
    }, [countriesTotal])

    useEffect(() => {
        let cn = countriesTotal.filter(i => {
            return i.country == country;
        })[0];

        if(cn){
            setGeneralStats(cn);
            setGeneralCases(cn);
        }

        axios.get(country == 'Global' ? API.HISTORY_CASES : API.HISTORY_CASES_COUNTRY + country+'?lastdays=30')
        .then(r => {
            if(r.data.timeline){
                setHistoryCases(r.data.timeline);
            }else{
                setHistoryCases(r.data);
            }
        }).catch(e => {
            console.log(e);
        });

    }, [country,countriesTotal])

    return(
        <Paper id="GeneralStatsCountries">
            <PaperOptions ID="GeneralStatsCountries" />
            <Grid container spacing={2}>

                <Grid item md={3} xs={12}>
                    <h3>Select Country Of Stats</h3>
                    <SelectSearch
                        name="countries"
                        className="select-search-box"
                        value={country}
                        onChange={(value) => setCountry(value)}
                        options={countries}
                        placeholder="Search Country"
                        renderOption={renderCountry}
                        search
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showFullDetails}
                                onChange={(event) => {setShowFullDetails(event.target.checked)}}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Show Full Details"
                        data-tip="Show Full Details Of Selected Country"
                    />
                </Grid>

                <Grid item md={3} xs={12}>
                    <Paper>
                        <div className="box cases">
                            <span className="number">
                                {generalStats.cases ? generalStats.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '000'}
                            </span>
                            <span className="name">
                                Cases
                            </span>
                        </div>
                    </Paper>
                </Grid>
                
                <Grid item md={3} xs={12}>
                    <Paper>
                        <div className="box recovered">
                            <span className="number">
                                {generalStats.recovered ? generalStats.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '000'}
                            </span>
                            <span className="name">
                                Recovered
                            </span>
                        </div>
                    </Paper>
                </Grid>

                <Grid item md={3} xs={12}>
                    <Paper>
                        <div className="box deaths">
                            <span className="number">
                                {generalStats.deaths ? generalStats.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '000'}
                            </span>
                            <span className="name">
                                Deaths
                            </span>
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </Paper>
    ) 
}