import React, { useEffect, useState } from 'react'
import CoustomPieChart from '../Charts/CoustomPieChart';


const COLORS = ["#875CF5","#FA2C37","#FF6900","#4f39f6"]

const RecentIncomeWithChart = ({data,totalIncome}) => {

      const [chartData,setChartData] = useState([]);
    
      const prepareChartData =()=>{
        const dataArr= data?.map((item)=>({
            name : item?.source,
            amount : item?.amount,
        }))
        setChartData(dataArr);
      } 
    //   console.log("chart data  ---\n",chartData);
      

      useEffect(() => {
        prepareChartData();
         
          return () => {};
        }, [data]);

  return (
    <div className='card'>
        <div className="flex items-center justify-between">
                   <h5 className="text-lg">last 60 Days Income</h5>
        </div>

        <CoustomPieChart
        data={chartData}
        label ="Total Income"
        totalAmount ={`${totalIncome}`}
        colors={COLORS}
        showTextAnchor 
        />
    </div>
  )
}

export default RecentIncomeWithChart
