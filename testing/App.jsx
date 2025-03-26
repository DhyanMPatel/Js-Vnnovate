import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
const ResetPass = lazy(() => import("./pages/auth/reset-password"));

const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";
import Profile from "./pages/utility/profile";
import KMZ from "./pages/kmz";
import Categories from "./pages/categories";
import Posts from "./pages/post/index";
import AddPost from "./pages/post/addPost";
import EditPost from "./pages/post/editPost";
import AddKMZ from "./pages/kmz/addKmz";
import AddCategory from "./pages/categories/addCategory";
import EditCategory from "./pages/categories/editCategory";
import EditKMZ from "./pages/kmz/editKMZ";
import UpdatePassword from "./pages/utility/updatePassword";
import Users from "./pages/user";
import AddUser from "./pages/user/addUser";
import EditUser from "./pages/user/editUser";
import Reports from "./pages/reports";
import AddReport from "./pages/reports/addReport";
import EditReport from "./pages/reports/editReport";
import ImageGrid from "./pages/reports/Images";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="App  relative">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading isLoading={isLoading} />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading isLoading={isLoading} />}>
              <ForgotPass />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:id/:token"
          element={
            <Suspense fallback={<Loading isLoading={isLoading} />}>
              <ResetPass />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kmz" element={<KMZ />} />
          <Route path="add-kmz" element={<AddKMZ />} />
          <Route path="edit-kmz/:id" element={<EditKMZ />} />
          <Route path="category" element={<Categories />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="posts" element={<Posts />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="users" element={<Users />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="reports" element={<Reports />} />
          <Route path="imageGrid" element={<ImageGrid />} />
          <Route path="add-report" element={<AddReport />} />
          <Route path="edit-report/:id" element={<EditReport />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
