import React from "react";
import Header from "./Header";
import Router from "./router/Router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./Components/Sidebar";
import { useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { theme } = React.useContext(ThemeContext);
  // const {token} = JSON.parse(localStorage.getItem('token'));
  // useEffect(() => {
  //   console.log('token',token);
  // }, [token])
  return (
    <>
      {/* <Home header={'Home'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellat iste debitis doloremque amet perspiciatis enim animi veniam vitae dolor.'}/> */}

      {/* <Login /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <Sidebar />
      <Router />
    </>
  );
};

export default App;
