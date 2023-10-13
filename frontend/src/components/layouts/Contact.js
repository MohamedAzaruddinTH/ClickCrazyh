import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const darkMode = useSelector((state) => state.darkmode);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("/api/v1/contact", formData);
        if (response.status === 200) {
          toast.success("Message sent successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }
      } catch (error) {
        toast.error("An error occurred while sending the email", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };

  const [errors, setErrors] = useState({});

  return (
    <div
      className={`${
        darkMode ? "bg-slate-700" : "bg-gray-500"
      }  py-12 text-pale-blue font-montserrat`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-3xl mx-auto  ${
            darkMode
              ? "bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800"
              : "bg-gradient-to-tl from-blue-950 to-cyan-700 via-stone-800"
          } p-6 rounded-lg shadow-lg`}
        >
          <h1 className="text-center text-3xl font-bold mb-4">
            Contact <span className="text-coral-red">Us</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-300 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border text-stone-900 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                required
              />
              {errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-300 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border text-stone-900 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                required
              />
              {errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-300 font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border text-stone-900 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                rows="4"
                required
              />
              {errors.message && (
                <p className="text-red-500">{errors.message}</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-cyan-500 hover:scale-110 duration-300 text-white font-semibold py-3 px-8 rounded-lg focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <p className={`text-${darkMode ? "pale-blue" : "slate-900"}`}>
            If you prefer to reach us by other means, you can contact us at the
            following:
          </p>
          <ul className={`mt-2 text-${darkMode ? "purple-500" : "gray-300"}`}>
            <li>Email: ClickCrazy@example.com</li>
            <li>Phone: +91 (123) 456-7890</li>
            <li>Address: 1234 Main Street, ElectroniCity, Bangalore, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
