import React, { useEffect, useState } from "react";
import { LuArrowRight, LuPlus } from "react-icons/lu";
import CoustombarChart from "../Charts/CoustombarChart";
import {
  prepareExpenseBarChartData,
  prepareIncomeBarChartData,
} from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          Add Income <LuPlus className="text-lg" />
        </button>
      </div>
      <div className="mt-10">
            <CoustombarChart data={chartData}/>
      </div>
    </div>
  );
};

export default IncomeOverview;
