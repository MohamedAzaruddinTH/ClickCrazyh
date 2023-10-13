import { useMemo, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

export default function UserOrders() {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const darkMode = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "id",
      },
      {
        Header: "No Of Items",
        accessor: "numOfItems",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const data = useMemo(() => {
    return userOrders.map((userOrder) => ({
      id: <span className="text-gray-200">{userOrder._id}</span>,
      numOfItems: (
        <span className="text-gray-200">{userOrder.orderItems.length}</span>
      ),
      amount: <span className="text-red-500">{userOrder.totalPrice}</span>,
      status:
        userOrder.orderStatus && userOrder.orderStatus.includes("Delivered") ? (
          <p className="text-green-600">{userOrder.orderStatus}</p>
        ) : (
          <p className="text-blue-900">{userOrder.orderStatus}</p>
        ),
      actions: (
        <Link
          to={`/order/${userOrder._id}`}
          className="bg-yellow-500 text-stone-950 py-1 px-3 rounded hover:bg-blue-500 transition-all duration-200"
        >
          <i className="fa fa-eye"></i>
        </Link>
      ),
    }));
  }, [userOrders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gray-400"
      } font-montserrat text-pale-blue px-4 `}
    >
      <div className=" justify-center items-center min-h-screen">
        <MetaData title="My Orders" />
        <h1 className="text-3xl font-semibold font-palanquin text-center mb-3 ">
          My <span className="text-coral-red">Orders</span>
        </h1>

        <div className="overflow-x-auto p-2 md:p-4 lg:p-6">
          <table
            {...getTableProps()}
            className={`min-w-full table-auto md:table-fixed border-2 border-t-2 border-${
              darkMode ? "pale-blue" : "black"
            }`}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className={`border-b-2 border-${
                    darkMode ? "pale-blue" : "black"
                  }`}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={`border-r-2 border-${
                        darkMode ? "pale-blue" : "black"
                      } p-2`}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`border-b border-${
                      darkMode ? "pale-blue" : "black"
                    } p-2`}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`border-r-2 border-${
                            darkMode ? "pale-blue" : "black"
                          } p-2 text-center`}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
