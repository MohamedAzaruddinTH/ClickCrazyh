import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const darkMode = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  const data = useMemo(
    () =>
      products.map((product) => ({
        id: product._id,
        name: product.name,
        price: `₹${product.price}`,
        stock: product.stock,
        actions: (
          <div className="flex items-center justify-center">
            <Link
              to={`/admin/product/${product._id}`}
              className="mr-2 text-blue-500"
            >
              <BsPencilFill/>
            </Link>
            <button
              onClick={(e) => deleteHandler(e, product._id)}
              className="text-red-500"
            >
              <BsFillTrash3Fill/>
            </button>
          </div>
        ),
      })),
    [products]
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
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
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
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted,productError]);

  return (
    <div
      className={`${darkMode?"bg-black":"bg-gradient-to-tl from-gray-500 to-gray-700 via-gray-500"} font-montserrat text-pale-blue px-4 min-h-screen`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10 mb-4">
          <h1 className="px-4 py-2 text-4xl font-bold text-center">
            <span className="text-coral-red">Product</span> List
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
