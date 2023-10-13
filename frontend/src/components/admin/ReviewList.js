import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { useTable } from "react-table";

export default function ReviewList() {
  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const darkMode = useSelector((state) => state.darkmode);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const data = useMemo(() => {
    return reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      user: review.user.name,
      comment: review.comment,
      actions: (
        <div>
          <button
            onClick={(e) => deleteHandler(e, review._id)} 
            className="text-red-500"
          >
            <BsFillTrash3Fill/>
          </button>
        </div>
      ),
    }));
  }, [reviews]);

  const columns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

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
    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
    }
  }, [dispatch, error, isReviewDeleted, productId]);

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
        <div className="col-span-1 md:col-span-10">
          <h1 className="text-4xl font-semibold my-4 text-center">
            <span className="text-coral-red">Review</span> List
          </h1>
          <div className=" flex justify-center mt-5">
            <div className="w-64">
              <form onSubmit={submitHandler}>
                <div className="mb-4 ">
                  <label className="block text-lg font-medium text-center">
                    Product ID
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setProductId(e.target.value)}
                    value={productId}
                    className="block w-full mt-1 px-2 py-1 border-blue-700 rounded-md shadow-sm text-black"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 mb-4 font-semibold rounded-md ${darkMode?"bg-gradient-to-tl from-yellow-500 to-cyan-500 via-slate-900":"bg-gradient-to-bl from-yellow-500 to-cyan-950 via-slate-900"} hover:to-cyan-500`}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <Fragment>
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
          </Fragment>
        </div>
      </div>
    </div>
  );
}
