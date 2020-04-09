import React, {useState, useEffect} from 'react'
import {Table,TableBody, TableCell, TableContainer, TableHead, 
    TablePagination, TableRow, Paper, Avatar} from '@material-ui/core';
import {prettyDate} from './../Helpers/Formatter'


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



const CasesByCountryTable = ({countriesTotal}) => {
    // const[countriesTotal, setCountriesTotal] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] =useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleCountriesData = () => {
        let customRows = [];
        countriesTotal.map(item => {
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

    }

    useEffect(() => {
        handleCountriesData();
    }, [countriesTotal]);

    return(
        <div id="CountriesCasesTable">  
            <h1 className="text-center">Cases Per Country</h1>
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
                                <TableCell key={column.id+Math.random()} align={column.align}>
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
        </div>
    )
}

export default CasesByCountryTable;