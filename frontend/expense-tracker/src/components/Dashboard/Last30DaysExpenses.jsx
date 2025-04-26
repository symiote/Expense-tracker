import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CoustombarChart from "../Charts/CoustombarChart";

const Last30DaysExpenses = ({ data }) => {
    const [chartData,setChartData] = useState([]);

    useEffect(() => {
      const result = prepareExpenseBarChartData(data);
      setChartData(result);  
      return () => {};
    }, [data]);
    
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 days Expenses</h5>
      </div>
      <CoustombarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
