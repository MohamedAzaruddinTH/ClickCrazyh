import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );
  const darkMode = useSelector((state) => state.darkmode);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes",
    "Beauty/Health",
    "Shoes",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
      return;
    }

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
  }, [isProductCreated, error, dispatch]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gradient-to-tl from-gray-500 to-gray-700 via-gray-500"
      } font-montserrat text-pale-blue px-4 min-h-screen p-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <Fragment>
            <div className="flex justify-center mt-5">
              <form
                onSubmit={submitHandler}
                className={`w-full max-w-md px-4 py-2 ${
                  darkMode
                    ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
                    : "bg-gradient-to-tl from-gray-900 to-gray-700 via-gray-600"
                } rounded-lg mb-2`}
                encType="multipart/form-data"
              >
                <h1 className="text-3xl text-center font-semibold mb-3">
                  New Product
                </h1>

                <div className="mb-4">
                  <label htmlFor="name_field" className="block font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price_field" className="block font-medium">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description_field"
                    className="block font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    id="description_field"
                    rows="6"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="category_field" className="block font-medium">
                    Category
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    id="category_field"
                  >
                    <option value="">Select</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="stock_field" className="block font-medium">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="seller_field" className="block font-medium">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    id="seller_field"
                    className=" mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => setSeller(e.target.value)}
                    value={seller}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="hidden"
                      id="customFile"
                      multiple
                      onChange={onImagesChange}
                    />

                    <div className="flex justify-center items-center space-x-4">
                      <label
                        className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg text-center cursor-pointer"
                        htmlFor="customFile"
                      >
                        Choose Images
                      </label>
                      {imagesPreview.map((image) => (
                        <img
                          className="w-28 h-28 rounded-lg"
                          key={image}
                          src={image}
                          alt={`Image Preview`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex justify-center">
                  <button
                    id="login_button"
                    type="submit"
                    disabled={loading}
                    className={`w-full  py-3 rounded text-white ${
                      darkMode
                        ? "bg-gradient-to-tl from-black to-yellow-400 via-slate-900"
                        : "bg-gradient-to-bl from-black to-yellow-400 via-slate-900 "
                    }  hover:to-black focus:outline-none`}
                  >
                    CREATE
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
