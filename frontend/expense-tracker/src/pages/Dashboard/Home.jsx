import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashBoardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fecthDashBoardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashBoardData(response.data);
      }
    } catch (error) {
      console.log(
        "Something went wrong in Home in Dashboard .please try again.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  //runns only on first render
  useEffect(() => {
    fecthDashBoardData();
    // return   () => {};
  }, []);

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
          {/* total balance,total exlense,total income cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color={"bg-primary"}
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color={"bg-green-500"}
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
              color={"bg-red-500"}
            />
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/recent")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance  || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses = {dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions transactions={dashboardData?.last30DaysExpense?.transaction || []}
            onSeeMore={()=>navigate("/expense")} 
          />

           <Last30DaysExpenses data={dashboardData?.last30DaysExpense?.transaction || []}/>
           

            <RecentIncomeWithChart data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
             <RecentIncome transactions={dashboardData?.last60DaysIncome?.transaction || [] }
               onSeeMore={()=>navigate("/income")}
            />
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Home;
