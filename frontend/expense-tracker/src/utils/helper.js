import moment from "moment";

export const validateEmail=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return;
  
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
  };

  //chart Bar for 30 days
export const prepareExpenseBarChartData=(data=[])=>{
        const chartData = data.map((item)=>({
            category : item?.category,
            amount : item?.amount,
        }))

        return chartData 
}  


//preapre data for income page fetching incomes
export const prepareIncomeBarChartData=(data=[])=>{
    const sortedData = [...data].sort((a,b)=>
        new Date(a.date) - new Date(b.date)
    );

    const chartData = sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount : item?.amount,
        source:item?.source,
    }))

    return chartData 
}  

export const prepareExpenselineChartData =(data=[])=>{
    const sortedData = [...data].sort((a,b)=>
        new Date(a.date) - new Date(b.date)
    );

    const chartData = sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount : item?.amount,
        category:item?.category,
    }))
    return chartData;
}


  