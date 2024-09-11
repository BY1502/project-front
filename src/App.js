import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Main/Home";
import About from "./components/About/About";
import Product from "./components/Product/Product";
import Detail from "./components/Product/Detail";
import Login from "./components/Auth/Login";
import JoinInfo from "./components/Auth/JoinInfo";
import GoogleJoin from "./components/Auth/GoogleJoin";
import Cart from "./components/Cart/Cart";
import MyPage from "./components/Mypage/MyPage";
import Footer from "./components/Footer";
import Completed from "./components/Cart/CompletedOrder";

function App() {
  return (
    <BrowserRouter>
      <div className="App relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/category1" element={<Product />} />
          <Route path="/category2" element={<Product />} />
          <Route path="/product/:productid" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/joininfo" element={<JoinInfo />} />
          <Route path="/googleinfo" element={<GoogleJoin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/order_completed" element={<Completed />} />

          {/* Default route to Home component */}
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}

          {/* Catch all unmatched routes and redirect to Home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
