import React from 'react'
import CoustomPieChart from '../Charts/CoustomPieChart'

const COLORS = ["#4F46E5", "#3ade21", "#FF6900"]
const FinanceOverview = ({totalBalance,totalIncome,totalExpenses}) => {
 
    const balanceData =[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpenses}
    ]

    return (
        // card in index.css is defined
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>
      
        <CoustomPieChart
            data={balanceData}
            label ="Total Balance"
            totalAmount ={`${totalBalance}`}
            colors={COLORS}
            showTextAnchor 
        />
    </div>
  )
}

export default FinanceOverview
