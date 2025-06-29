import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import KotPage from "./pages/kot/KotPage";
import BillingPage from "./pages/billing/BillingPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products" element={
        <ProtectedRoute role="admin">
          <Layout><ProductList /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products/add" element={
        <ProtectedRoute role="admin">
          <Layout><AddProduct /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products/edit/:id" element={
        <ProtectedRoute role="admin">
          <Layout><EditProduct /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/kot" element={
        <ProtectedRoute role="staff">
          <Layout><KotPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/billing" element={
        <ProtectedRoute role="admin">
          <Layout><BillingPage /></Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
