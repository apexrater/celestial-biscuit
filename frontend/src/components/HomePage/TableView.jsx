/* eslint-disable react/prop-types */
const TableView = ({ data }) => {
  return (
    <div className=" p-4 pb-12">
      <table className="table-auto max-w-7xl mx-auto bg-white shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              SL.No
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Hosted zone name
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Type
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Created by
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Record count
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Description
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Hosted zone ID
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
            >
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Name}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Config.PrivateZone ? (
                  <span className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-md text-white">
                    Private
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-md text-white">
                    Public
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {"Route 53"}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.ResourceRecordSetCount}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.amount}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.currentBalance}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                <button className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md">
                  Create Records
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
