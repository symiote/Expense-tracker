const Income = require("../models/Income");
const xlsx = require("xlsx");

//add income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //create new income source
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();

    res.status(200).json(newIncome);
  } catch (err) {
    console.error("Error in addIncome:", err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 }); //decending oredr sort by date
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// delete income source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//downlaod the excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new(); //Creates a new workbook
    const ws = xlsx.utils.json_to_sheet(data); // transformed income data (data) into worksheet compatible with Excel.
    xlsx.utils.book_append_sheet(wb, ws, "Income"); //Adds the worksheet to the workbook under the sheet name "Income"
    xlsx.writeFile(wb, "income_details.xlsx"); //Saves the workbook to disk with the filename income_details.xlsx
    res.download("income_details.xlsx");  // send response by downlado the file
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
