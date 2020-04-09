import React, {useState, useEffect} from 'react'
import './../Sass/Home.scss'

import {Container,Table,TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, TableRow, Paper, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'


function prettyDate(timestamp){
    timestamp = (Date.now() - timestamp) / 1000;
    let hours;
    let minutes;
    let seconds;
    hours = Math.floor(timestamp / 3600);
    timestamp %= 3600;
    minutes = Math.floor(timestamp / 60);
    seconds = timestamp % 60;
    return `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${parseInt(seconds) < 10 ? '0'+parseInt(seconds) : parseInt(seconds)}`
}


const columns = [
    { 
        id: 'Country', 
        label: 'Country', 
        minWidth: 170 ,
        // format : (value) => {
        //     return(

        //     )
        // }
    },
    // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'TodayCases',
        label: 'Today Cases',
        // minWidth: 170,
        align: 'left',
        //   format: (value) => value.toLocaleString(),
    },
    {
        id: 'TodayDeaths',
        label: 'Today Deaths',
        // minWidth: 170,
        align: 'left',
        //   format: (value) => value.toLocaleString(),
    },
    {
        id: 'TotalCases',
        label: 'Total Cases',
        // minWidth: 170,
        align: 'left',
        //   format: (value) => value.toLocaleString(),
    },
    {
        id: 'TotalDeaths',
        label: 'Total Deaths',
        // minWidth: 170,
        align: 'left',
        //   format: (value) => value.toLocaleString(),
    },
    {
        id: 'TotalRecovered',
        label: 'Total Recovered',
        // minWidth: 170,
        align: 'left',
        //   format: (value) => value.toLocaleString(),
    },
    {
        id: 'LastUpdate',
        label: 'Last Update',
        // minWidth: 170,
        align: 'left',
        format: (value) => 'Since ' + prettyDate(value),
    },

];
  
// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];


const Home = ({API}) => {
    const[countriesTotal, setCountriesTotal] = useState([]);
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getCountriesData = () => {
        axios.get(API.COUNTRIES_TOTAL)
        .then(r => {
            setCountriesTotal(r.data);

            let customRows = [];
            r.data.map(item => {
                customRows.push({
                    Country : (
                        <div className="country-image-container">
                            <span>{item.country} [{item.countryInfo.iso2}] </span> <Avatar alt={item.country} src={item.countryInfo.flag} />
                        </div>
                    ),               
                    TodayCases : item.todayCases,
                    TodayDeaths : item.todayDeaths,
                    TotalCases : item.cases,
                    TotalDeaths : item.deaths,
                    TotalRecovered : item.recovered,
                    LastUpdate : item.updated,
                });
            });
    
            setRows(customRows);
            console.log(rows , customRows);
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

                <Paper>
                    <TableContainer className="countries-table">
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

            </Container>
        </div>
    )
}

export default Home;