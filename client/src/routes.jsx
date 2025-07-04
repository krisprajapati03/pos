import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import BillingPage from "./pages/billing/BillingPage";
import KotList from "./pages/kot/KotList";
import TableManagement from "./pages/table/TableManagement";
import StockPage from "./pages/stock/StockPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import StaffPage from "./pages/shop/StaffPage";
import ShopLogin from "./pages/shop/ShopLogin";
import ShopCreate from "./pages/shop/ShopCreate";
import CategoryPage from "./pages/categories/CategoryPage";
import UserProfileCard from "./components/UserProfileCard";
import MoneyOutPage from "./pages/Moneyout/MoneyOutPage";
import ExpensePage from "./pages/Moneyout/ExpensePage";
import ReportsPage from "./pages/shop/Report";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/staff/login" element={<ShopLogin />} />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout><UserProfileCard /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><ProductList /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products/add" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><AddProduct /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/products/edit/:id" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><EditProduct /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/categories" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><CategoryPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/tables" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><TableManagement /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/kot/list" element={
        <ProtectedRoute role={["admin", "kitchen"]}>
          <Layout><KotList /></Layout>
        </ProtectedRoute>
      } />

      {/* Uncomment this if KotPage is active */}
      {/* <Route path="/kot" element={
        <ProtectedRoute role={["admin", "waiter", "cashier"]}>
          <Layout><KotPage /></Layout>
        </ProtectedRoute>
      } /> */}

      <Route path="/billing" element={
        <ProtectedRoute role={["admin", "cashier"]}>
          <Layout><BillingPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/stock" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><StockPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/staff" element={
        <ProtectedRoute role="admin">
          <Layout><StaffPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/create-shop" element={
        <ProtectedRoute role="admin">
          <Layout><ShopCreate /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/MoneyOut" element={
        <ProtectedRoute>
          <Layout><MoneyOutPage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/expenses" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><ExpensePage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/reports" element={
        <ProtectedRoute role={["admin", "manager"]}>
          <Layout><ReportsPage /></Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
