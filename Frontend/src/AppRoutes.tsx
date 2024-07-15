import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout>
            <DetailPage />
          </Layout>
        }
      />
      <Route
        path="/order-status"
        element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        }
      />
      <Route
        path="/manage-restaurant"
        element={
          <Layout>
            <ManageRestaurantPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
