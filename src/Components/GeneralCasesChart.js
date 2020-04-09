import React, {useMemo} from 'react'

import { Chart } from 'react-charts'

const GeneralCasesChart = ({chartData}) => {
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
        <>
            {lineChart}
        </>
    );
}

export default GeneralCasesChart;