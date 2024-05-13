import ExpenseTable from "./components/ExpenseTable";
import Navbar from "./components/Navbar";
import SmallBox from "./components/SmallBox";
import { React, useEffect, useState } from "react";

function App() {
  const initialData = {
    name: "",
    amount: "",
  };
  const [formDataList, setFormDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [budget, setBudget] = useState(null);
  const budgetChange = (event) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
    localStorage.setItem("budget", newBudget);
  };
  const [formData, setFormData] = useState({
    name: "",
    amount: null,
  });
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // If editing an expense, update the formDataList with edited expense
      const updatedFormDataList = [...formDataList];
      updatedFormDataList[editingIndex] = { ...formData };
      setFormDataList(updatedFormDataList);
      setEditingIndex(null); // Reset editing index
      localStorage.setItem("formDataList", JSON.stringify(updatedFormDataList));
    } else {
      // If adding a new expense
      const newExpense = { ...formData };
      setFormDataList((prevFormDataList) => [...prevFormDataList, newExpense]);
      localStorage.setItem(
        "formDataList",
        JSON.stringify([...formDataList, newExpense])
      );
    }
    setFormData(initialData);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDelete = (index) => {
    // Filter out the expense at the specified index
    const updatedFormDataList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedFormDataList);
    // Update local storage
    localStorage.setItem("formDataList", JSON.stringify(updatedFormDataList));
  };

  const editExpense = (index) => {
    // Set the form data to the expense being edited
    const expenseToEdit = formDataList[index];
    setFormData(expenseToEdit);
    setEditingIndex(index);
  };
  const totalExpenses = formDataList.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-10">
        <div className="flex sm:w-5/6 mx-auto w-10/12  flex-col sm:flex-col status px-4 ">
          <div className="flex justify-center items-center text-center gap-2">
            <form className="w-full">
              <input
                className="budget w-full bg-gray-50 border-solid border-2 rounded-xl mx-3 border-gray-300 focus:outline-none p-4 flex  items-center text-black font-mono text-sm sm:mx-1 sm:mb-3 mb-4 justify-between px-5"
                type="text"
                onChange={budgetChange}
                value={budget}
                placeholder="enter budget to continue"
              />
            </form>
            <div className="flex">
              <button className="p-4 text-white sm:ml-2 ml-5  sm:mb-3 mb-4 self-center bg-slate-900 cursor-pointer  border-solid rounded-xl">
                Change
              </button>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col  ">
            <SmallBox name="Total Expenses" amount={totalExpenses} />
            <SmallBox name="Remain" amount={budget - totalExpenses} />
          </div>
        </div>
        {budget > 0 && (
          <>
            <form
              onSubmit={addExpense}
              className="flex flex-col md:flex-row just-center item-center w-9/12 mx-auto"
            >
              <input
                type="text"
                className="p-3 flex-1 rounded-xl text-black border-2 border-solid  bg-gray-50 focus:outline-none border-gray-300 m-2 w-full"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="number"
                name="amount"
                className="p-3 flex-1 rounded-xl text-black border-2 border-solid  bg-gray-50 focus:outline-none border-gray-300 m-2 w-full"
                placeholder="Enter amount"
                onChange={handleChange}
                value={formData.amount}
              />
              <button
                className="flex-1 bg-gray-900 p-3 mx-auto md:m-2 rounded-xl text-white"
                type="submit"
              >
                Submit Expense
              </button>
            </form>
            <div className="table border-none mt-10 w-full  justify-center items-center">
              <ExpenseTable
                expenseDataList={formDataList}
                handleDelete={handleDelete}
                editExpense={editExpense}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
