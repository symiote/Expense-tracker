import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const AllRecentTransactions = ({ transactions}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
      </div>

      {/* show all the recent   tarnsaction */}
      <div className="mt-6">
      {transactions && transactions.length > 0 ? (
          transactions.map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No recent transactions.</p>
        )}
      </div>
    </div>
  )
}

export default AllRecentTransactions
