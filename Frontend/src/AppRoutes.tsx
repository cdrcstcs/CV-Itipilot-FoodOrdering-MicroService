import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
// import { useGetMyUser } from "./api/MyUserApi";
// import LoadingButton from "./components/LoadingButton";
const AppRoutes = () => {
  // const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  // if (isUserLoading) {
  //   return <LoadingButton></LoadingButton>;
  // }
  // if (!currentUser) {
  //   return <LoadingButton></LoadingButton>;
  // }
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
