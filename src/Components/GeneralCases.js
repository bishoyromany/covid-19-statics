import React, {useState, useEffect} from 'react'

import {Paper, Grid} from '@material-ui/core';

import GeneralCasesRightSide from './GeneralCasesRightSide'
import GeneralCasesChart from './GeneralCasesChart'
import PaperOptions from './PaperOptions'
import {prettyDate} from './../Helpers/Formatter'
import Skeleton from 'react-loading-skeleton';

const GeneralCases = ({generalCases, historyCases, showFullDetails}) => {
    // allowed keys
    const [allowedGeneralCasesKeys, setAllowedGeneralCasesKeys] = useState([]);
    const [allowedGeneralCasesChartKeys, setAllowedGeneralCasesChartKeys] = useState([]);

    // chart parts
    const [histroyCasesChart , setHistoryCases] = useState([]);
    const [histroyDeathsChart , setHistroyDeaths] = useState([]);
    const [histroyRecoveredChart , setHistroyRecovered] = useState([]);

    // chart data
    const [chartData, setChartData] = useState([]);


    // selected keys for chart
    const [checked, setChecked] = useState([]);

    // handle select key
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    // set allowed keys
    useEffect(() => {   
        if(generalCases.cases != undefined){
            const allowedCasesParts = [
                {
                    id : 'updated',
                    name : 'Last Update',
                    format : (value) => 'Since '+ prettyDate(value), 
                },
                {
                    id : 'cases',
                    name : 'Cases',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'todayCases',
                    name : 'Today Cases',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'deaths',
                    name : 'Deaths',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'todayDeaths',
                    name : 'Today Deaths',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'recovered',
                    name : 'Recovered',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'active',
                    name : 'Active',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'critical',
                    name : 'Critical',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'casesPerOneMillion',
                    name : 'Cases Per One Million',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'deathsPerOneMillion',
                    name : 'Deaths Per One Million',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'tests',
                    name : 'Tests',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
                {
                    id : 'testsPerOneMillion',
                    name : 'Tests Per One Million',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
            ]

            if(generalCases.affectedCountries != undefined){
                // allowedCasesParts.push({
                //     id : 'affectedCountries',
                //     name : 'Affected Countries',
                //     format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                // });
            }
            setAllowedGeneralCasesKeys(allowedCasesParts);

            setAllowedGeneralCasesChartKeys(['cases', 'deaths', 'recovered']);
            setChecked(['cases', 'deaths', 'recovered']);
        }
    }, [generalCases]);
    

    // fix history to be chartable
    useEffect(() => {
        if(historyCases.cases != undefined){
            let data = [];

            if(checked.includes('recovered')){
                let recovered = [];
                for(let x in historyCases.recovered){
                    recovered.push([x, historyCases.recovered[x]]);
                }
                setHistroyRecovered(recovered);
                data.push({
                    label : 'Recovered',
                    color : 'green',
                    data : recovered
                });
            }

            if(checked.includes('deaths')){
                let deaths = [];
                for(let x in historyCases.deaths){
                    deaths.push([x, historyCases.deaths[x]]);
                }
                setHistroyDeaths(deaths);
                data.push({
                    label : 'Deaths',
                    color : 'red',
                    data : deaths
                });
            }

            if(checked.includes('cases')){
                let cases = [];
                for(let x in historyCases.cases){
                    cases.push([x, historyCases.cases[x]]);
                }
                setHistoryCases(cases);
                data.push({
                    label : 'Cases',
                    color : 'orange',
                    data : cases
                });

            }

            setChartData(data);
        }   
    }, [historyCases, checked]);


    return(
        <div className="general-cases">
            {/* <h1 className="text-center">General Statics</h1> */}
            <Grid container spacing={2}>
                {
                    showFullDetails ? 
                    <Grid item xs={12}>
                        <Paper className="general-paper">
                            {
                                generalCases.length < 1 ?
                                <Skeleton height={49} count={10} /> 
                                : <GeneralCasesRightSide generalCases={generalCases} 
                                allowedGeneralCasesChartKeys={allowedGeneralCasesChartKeys} 
                                allowedGeneralCasesKeys={allowedGeneralCasesKeys}
                                handleToggle={handleToggle} checked={checked} />
                            }
                        </Paper>
                    </Grid> : ''
                }

                <Grid item xs={12}>
                    <Paper className={'homeChartContainerParent'} id="HomeChartContainer">
                        <PaperOptions ID="HomeChartContainer" />
                        {
                            generalCases.length < 1 ?
                            <Skeleton height={500} /> 
                            : <GeneralCasesChart chartData={chartData} />
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralCases;