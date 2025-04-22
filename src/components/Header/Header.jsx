import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import "./Header.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Bind modal to app element for accessibility
Modal.setAppElement("#root");

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/services", display: "Issues" },
  { path: "/contact", display: "Contact" },
];

const ModalForm = ({ type, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLogin = type === "login";
  const title = isLogin ? "Login" : "Register";
  const buttonText = isLogin ? "Sign In" : "Sign Up";

  console.log("api base is ", API_BASE_URL);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-lg shadow-lg p-6 w-[50%] md:w-[40%]  mx-auto "
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status and role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, []);

  //   const handleStickyHeader = () => {
  //     window.addEventListener('scroll', () => {
  //       if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  //         headerRef.current.classList.add('sticky__header');
  //       } else {
  //         headerRef.current.classList.remove('sticky__header');
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     handleStickyHeader();
  //     return () => window.removeEventListener('scroll', handleStickyHeader);
  //   }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      const endpoint = modalType === "login" ? "/auth/login" : "/auth/register";
      //   const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode JWT to get role
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
      setUserRole(decoded.role);

      const dashboardPath =
        decoded.role === "citizen"
          ? "/dashboard/citizen"
          : "/dashboard/municipal";

      alert(`${modalType} successful!`);
      closeModal();
      navigate(dashboardPath);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    setIsDropdownOpen(false);
    navigate("/home");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="headerr">

    
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logoo">
            <img src={logo} alt="" />
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-blue-500"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative flex">
                <div className="flex items-center gap-4">
                  {/* Username */}
                  <span className="text-gray-700 font-medium">
                    Yogesh Jangid
                  </span>

                  {/* Account Dropdown Button */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      My Account
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to={`/dashboard/${userRole}`}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openModal("login")}
                  className="bg-blue-500 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                >
                  Login
                </button>
                <button
                  onClick={() => openModal("register")}
                  className="bg-green-500 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                >
                  Register
                </button>
              </>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="outline-none w-full flex justify-center border-1 border-grey-200"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
      >
        <ModalForm
          type={modalType}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </Modal>
    </header>
    </div>
  );
};

export default Header;
