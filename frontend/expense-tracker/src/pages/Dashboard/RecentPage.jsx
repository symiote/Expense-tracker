import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AllRecentTransactions from "../../components/Dashboard/AllRecentTransactions";

const RecentPage = () => {
  useUserAuth();
  const [dashboardData, setDashBoardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fecthDashBoardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      console.log("response at recnet page",response);
      
      if (response.data) {
        setDashBoardData(response.data);
      }
    } catch (error) {
      console.log(
        "Something went wrong in Home in Recent Transaction Page .please try again.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  //runns only on first render
  useEffect(() => {
    fecthDashBoardData();
  }, []);

  return (
    <DashBoardLayout activeMenu="income">
      <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <AllRecentTransactions
            transactions={dashboardData?.recentTransactions}
          />
      </div>
      </div>
    </DashBoardLayout>
  );
};

export default RecentPage;
