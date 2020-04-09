import React, {useState, useEffect, useMemo} from 'react'

import {Paper, Grid} from '@material-ui/core';
import { Chart } from 'react-charts'

import GeneralCasesRightSide from './GeneralCasesRightSide'
import {prettyDate} from './../Helpers/Formatter'

const GeneralCases = ({generalCases, historyCases}) => {
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
            setAllowedGeneralCasesKeys([
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
                {
                    id : 'affectedCountries',
                    name : 'Affected Countries',
                    format : (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                },
            ]);

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

    
    let axes = useMemo(() => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ], [])
    
    let lineChart = chartData.length > 0 ? (
        <div className="homeChartContainer">
          <Chart data={chartData} axes={axes} tooltip />
        </div>
    ) : '';

    return(
        <div className="general-cases">
            <h1 className="text-center">General Statics</h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className="homeChartContainerParent">
                        {lineChart}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="general-paper">
                        <GeneralCasesRightSide generalCases={generalCases} 
                        allowedGeneralCasesChartKeys={allowedGeneralCasesChartKeys} 
                        allowedGeneralCasesKeys={allowedGeneralCasesKeys}
                        handleToggle={handleToggle} checked={checked} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralCases;