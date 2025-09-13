import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../component/Dashboard/Dashboard";
import Login from "../component/Auth/login";
import ForgotPassword from "../component/Auth/forgotPassword";
import VerificationCode from "../component/Auth/verificationCode";
import SetNewPassword from "../component/Auth/setNewPassword";
import MyAccount from "../component/Auth/myAccount";
import ManagePages from "../component/Pages/managePages";
import ManageTeam from "../component/Team/manageTeam";
import ManageBlogs from "../component/Blogs/manageBlogs";
import AddNewBlog from "../component/Blogs/addNewBlog";
import ManageBlogCategory from "../component/Blogs/manageBlogCategory";
import ManageTag from "../component/Blogs/manageTag";
import ManageLeads from "../component/Lead/manageLeads";
import ManageProducts from "../component/Products/manageproducts";
import AddProduct from "../component/Products/addProduct";
import EditProduct from "../component/Products/editProduct";
import ManageProductCategory from "../component/Products/manageProductCategory";
import ManageProductTag from "../component/Products/manageProductTags";
import ManageProductBrand from "../component/Products/manageProductBrand";
import ManageAdminSettings from "../component/AdminSettings/manageAdminSettings";
import ManageMasterLists from "../component/AdminSettings/manageMasterLists";
import ManageFinanceAndCommission from "../component/financeAndCommission/manageFinanceAndCommission";
import ManageReports from "../component/Report/manageReports";
import ManageSupportTickets from "../component/SupportTickets/manageSupportTickets";
import DetailSupportTicket from "../component/SupportTickets/detailSupportTicket";
import ManageProjects from "../component/Project/manageProjects";
import AddNewProjects from "../component/Project/addNewProjects";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

const NotFound: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-[#000000] text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Go to Dashboard
        </a>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/verification-code"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <VerificationCode />
          </PublicRoute>
        }
      />

      <Route
        path="/set-password"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SetNewPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/my-account"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MyAccount />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pages"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManagePages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageBlogs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-new-blog"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AddNewBlog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog-category"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageBlogCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog-tag"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageTag />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageLeads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product-categories"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageProductCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product-tags"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageProductTag />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product-brands"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageProductBrand />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-settings"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageAdminSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-settings/master-lists"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageMasterLists />
          </ProtectedRoute>
        }
      />

      <Route
        path="/finance-commission"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageFinanceAndCommission />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support-tickets"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageSupportTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support-tickets/detail/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DetailSupportTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ManageProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/add-new-project"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AddNewProjects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;