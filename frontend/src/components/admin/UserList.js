import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Loader from "../layouts/Loader";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function UserList() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);
  const darkMode = useSelector((state) => state.darkmode);

  const dispatch = useDispatch();
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };
  const data = useMemo(
    () =>
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <div className="flex justify-center items-center ">
            <Link to={`/admin/user/${user._id}`} className="mr-2 text-blue-500">
              <BsPencilFill />
            </Link>
            <button
              onClick={(e) => deleteHandler(e, user._id)}
              className="text-red-500"
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        ),
      })),
    [users, deleteHandler]
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
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

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isUserDeleted) {
      toast("User Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }

    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gradient-to-tl from-gray-500 to-gray-700 via-gray-500"
      } font-montserrat text-pale-blue px-4 `}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10 mb-4">
          <h1 className="px-4 py-2 text-center text-4xl font-bold">
            <span className="text-coral-red">User</span> List
          </h1>

          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto max-w-full">
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
