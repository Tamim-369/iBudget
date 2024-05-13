import React from "react";

const ExpenseTable = ({ expenseDataList, handleDelete, editExpense }) => {
  // const { expenseDataList } = props;
  return (
    <div className=" mx-auto mt-10 bg-gray-50 w-8/12 pb-5 px-3 pt-2 rounded-xl">
      <table className="text-left   rounded-xl   text-black mx-auto w-full gap-5">
        <thead className="border-b-2 border-gray-600">
          <tr>
            <th className="pl-3">Name</th>
            <th className="p-2">Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseDataList.map((formData, index) => (
            <tr
              key={index}
              className=" p-2 mx-3 px-3 border-b border-gray-600 bg-gray-200 mt-2"
            >
              <td className="pl-3 p-2">{formData.name}</td>
              <td className="p-2">${formData.amount}</td>
              <td>
                <div className="flex gap-2 my-2">
                  <button
                    onClick={() => editExpense(index)}
                    className="p-2 bg-emerald-700 text-white rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-red-600 text-white rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
