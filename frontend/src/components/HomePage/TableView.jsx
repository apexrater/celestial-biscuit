/* eslint-disable react/prop-types */
const TableView = ({ data }) => {
  return (
    <div className="mb-12">
      <table className="table-auto max-w-full mx-auto bg-white shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white ">
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
                {item.Name.substring(0, item.Name.length - 1)}
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
              <td className="px-4 py-3 text-lg border-b border-gray-300 text-center">
                {item.ResourceRecordSetCount}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Config.Comment.length > 19
                  ? item.Config.Comment.substring(0, 16) + "..."
                  : item.Config.Comment}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Id.substring(12)}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md">
                    Create Records
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500 hover:text-red-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
