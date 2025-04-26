const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
        try {
            const userId = req.user.id;
            const userObjectId = new Types.ObjectId(String(userId));
    
            //fetch total income
            const totalIncome = await Income.aggregate([
    
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
    
            // Debugging step
    
            console.log("--- Dashboard Data ---");
            console.log("User ID:", userId);
            console.log("User Object ID:", userObjectId); // Log the actual ObjectId
    
            console.log("\n\nTotal Income:", totalIncome);
    
            // Fetch a sample document from the database to inspect its userId
            const sampleIncome = await Income.findOne().limit(1);
            console.log("\n\nSample Income Document:", sampleIncome);
    
            // ---------------------------------end debug
    
            console.log("totalIncome : ", {
            totalIncome,
            userId: isValidObjectId(userId),
            });
    
            //fetch total expense
            const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
    
            const last60DaysIncometransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
            }).sort({ date: -1 });
    
            const incomeLast60Days = last60DaysIncometransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
            );
    
            //get expense transation in last 30 days
            const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            }).sort({ date: -1 });
    
            //get toatal expene in last 30 days
            const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
            );
    
            //fetch last 5 transaction (income+expense)
            const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                ...txn.toObject(),
                type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                ...txn.toObject(),
                type: "expense",
                })
            ),
            ].sort((a, b) => b.date - a.date); // Sort latest first
            
            //debug
            console.log("\n----------------");
            console.log(lastTransactions);
            

            //final response
            res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncometransactions,
            },
            recentTransactions: lastTransactions,
            });
    
        } catch (error) {
            console.error("Dashboard Error Details:", {
            message: error.message,
            stack: error.stack,
            fullError: error,
            });
            res.status(500).json({
            message: "Server Error",
            error: error.message, // Send only the message for security
            });
        }
        };




