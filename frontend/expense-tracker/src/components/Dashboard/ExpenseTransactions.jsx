import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense</h5>
        
                <button className="card-btn" onClick={onSeeMore}>
                  See All <LuArrowRight className="text-base" />
                </button>
        </div>

        {/* last 30 days transactions */}
        <div className="mt-6">
      {transactions && transactions.length > 0 ? (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MM YYYY")}
              amount={expense.amount}
              type={"expense"}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No transactions in Past 30 Days.</p>
        )}
        </div>
    </div>
  )
}

export default ExpenseTransactions
