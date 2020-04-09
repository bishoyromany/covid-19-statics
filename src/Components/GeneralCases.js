import React, {useState, useEffect} from 'react'

import {Paper, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Checkbox} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import {prettyDate} from './../Helpers/Formatter'

const GeneralCases = ({generalCases}) => {
    const [allowedGeneralCasesKeys, setAllowedGeneralCasesKeys] = useState([]);
    const [allowedGeneralCasesChartKeys, setAllowedGeneralCasesChartKeys] = useState([]);
    const [checked, setChecked] = useState([]);
    const [cases, setCases] = useState([]);

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

    return(
        <div className="general-cases">
            <h1 className="text-center">General Statics</h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <List>
                            {allowedGeneralCasesKeys.map((value) => {
                                const labelId = `checkbox-list-label-${value.id}`;

                                return (
                                    <ListItem key={value.id} role={undefined} dense button={allowedGeneralCasesChartKeys.includes(value.id)} onClick={allowedGeneralCasesChartKeys.includes(value.id) ? handleToggle(value.id) : ''}>
                                        <ListItemIcon>
                                            {
                                                allowedGeneralCasesChartKeys.includes(value.id) ? (
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value.id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                ) : ''
                                            }
         
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.name} />
                                        <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            {value.format ? value.format(generalCases[value.id]) : generalCases[value.id]}
                                        </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default GeneralCases;