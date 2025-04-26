import React, { useEffect, useState } from 'react'
import { prepareExpenselineChartData, prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CoustombarChart from '../Charts/CoustombarChart';
import CoustomLineChart from '../Charts/CoustomLineChart';

const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      const result = prepareExpenselineChartData(transactions);
      setChartData(result);
  
      return () => {};
    }, [transactions]); 

   
  
    console.log("sending chart data",chartData);
    
    return (
        <div className="card">
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg">Expense Overview</h5>
            <p className="text-xs font-medium text-gray-400 mt-0.5">
              Track your spending over time and gain insights into where
              your money goes.
            </p>
          </div>
          <button className="add-btn" onClick={onExpenseIncome}>
            <LuPlus className="text-lg" />
            Add Expense 
          </button>
        </div>
        <div className="mt-10">
              <CoustomLineChart data={chartData}/>
        </div>
      </div>
    );
}

export default ExpenseOverview
