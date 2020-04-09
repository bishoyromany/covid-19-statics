import React, {memo} from 'react'
import { scaleLinear } from "d3-scale";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
  } from "react-simple-maps";


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const CountriesCasesMap = ({ setTooltipContent, countriesTotal }) => {
    return (
      <div className="CountriesCasesMap">
            <h1 className="text-center">Countries Cases Map</h1>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const { NAME, ISO_A2 , ISO_A3} = geo.properties;
                        let country = countriesTotal.filter(item => {
                            return item.country == NAME || item.countryInfo.iso2 == ISO_A2 || item.countryInfo.iso3 == ISO_A3;
                        });

                        return(
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    country = countriesTotal.filter(item => {
                                        return item.country == NAME || item.countryInfo.iso2 == ISO_A2 || item.countryInfo.iso3 == ISO_A3;
                                    });

                                    if(country.length > 0){
                                        country = country[0];
                                        setTooltipContent((
                                        <span>
                                            {NAME} 
                                            <br /> Total Cases : {country.cases} 
                                            <br /> Total Deaths : {country.deaths} 
                                            <br /> Total Recovered : {country.recovered} 
                                            <br /> Today Cases : {country.todayCases} 
                                            <br /> Today Deaths : {country.cases} 
                                            <br /> Tests : {country.tests} 
                                            <br /> Active Cases : {country.active} 
                                            <br /> Critical Cases : {country.critical} 
                                            <br /> Cases Per One Million : {country.casesPerOneMillion} 
                                            <br /> Deaths Per One Million : {country.deathsPerOneMillion} 
                                            <br /> Tests Per One Million : {country.testsPerOneMillion} 
                                        </span> 
                                        ));
                                    }else{
                                        setTooltipContent((
                                            <span>
                                                {NAME} 
                                            </span> 
                                        )); 
                                    }
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    // default: {
                                    //     fill: "#D6D6DA",
                                    //     outline: "none"
                                    // },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                }}
                                fill={country.length > 0 ? country[0].color : "green"}
                            />
                        )
                    })
                }
                </Geographies>
            </ZoomableGroup>
            </ComposableMap>
      </div>
    );
};
  
  export default memo(CountriesCasesMap);