import React, {useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import Loader from "../layouts/Loader";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);
  const darkMode = useSelector((state) => state.darkmode);

  const dispatch = useDispatch();

  const data = useMemo(
    () =>
      adminOrders.map((order) => ({
        id: order._id,
        noOfItems: order.orderItems.length,
        amount: <span className="font-semibold">{`₹${order.totalPrice}`}</span>,
        status: (
          <p
            className={
              order.orderStatus.includes("Processing")
                ? "text-red-500"
                : "text-green-700"
            }
          >
            {order.orderStatus}
          </p>
        ),
        actions: (
          <div className="flex items-center justify-center">
            <Link
              to={`/admin/order/${order._id}`}
              className="mr-2 text-blue-500"
            >
              <BsPencilFill />
            </Link>
            <button
              onClick={(e) => deleteHandler(e, order._id)}
              className="text-red-500"
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        ),
      })),
    [adminOrders]
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Number of Items",
        accessor: "noOfItems",
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderDeleted()),
      });
    }
    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gradient-to-tl from-gray-500 to-gray-700 via-gray-500"
      } font-montserrat text-pale-blue px-4 min-h-screen`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10 mb-4">
          <h1 className="px-4 py-2 text-4xl font-bold text-center">
            <span className="text-coral-red">Order </span>List
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
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
          )}
        </div>
      </div>
    </div>
  );
}
