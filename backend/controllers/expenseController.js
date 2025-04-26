const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//add Expense source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //create new income source
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    console.error("Error in newExpense:", err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};


//get all expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 }); //decending oredr sort by date
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// delete Expense source
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//downlaod the excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      category : item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new(); //Creates a new workbook
    const ws = xlsx.utils.json_to_sheet(data); // transformed income data (data) into worksheet compatible with Excel.
    xlsx.utils.book_append_sheet(wb, ws, "Income"); //Adds the worksheet to the workbook under the sheet name "Income"
    xlsx.writeFile(wb, "expense_details.xlsx"); //Saves the workbook to disk with the filename income_details.xlsx
    res.download("expense_details.xlsx");  // send response by downlado the file
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
