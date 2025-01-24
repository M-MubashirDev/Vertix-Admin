import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Client from "./Pages/Client";
import View from "./Pages/View";
import PageNotFound from "./Pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import ClientContext from "./Components/ClientContext";
import Edit from "./Pages/Edit";
import PackagesView from "./Pages/PackageView";
import Package from "./Pages/Package";
import EditPackage from "./Pages/EditPackage";
import PackageContext from "./Components/PackageContext";
import CreatePackage from "./Pages/CreatePackage";
import EditStation from "./Pages/EditStation";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ClientContext>
                  <Layout />
                </ClientContext>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="client" element={<Client />} />
            <Route path="view/:viewId" element={<View />} />
            <Route path="Edit/:clientId" element={<Edit />} />
            <Route
              path="package"
              element={
                <PackageContext>
                  <Package />
                </PackageContext>
              }
            >
              <Route index element={<PackagesView />} />
              <Route index element={<PackagesView />} />
              <Route path="edit/:packageId" element={<EditPackage />} />
              <Route path="edit-station/:stationId" element={<EditStation />} />
              <Route path="create/:stationId" element={<CreatePackage />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Default options for all toasts
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#263E4D", // primary.DEFAULT
              color: "#FFFFFF", // white
              border: `1px solid #1A2834`, // primary.dark border for distinction
            },
            // Options for success toasts
            success: {
              duration: 3000,
              style: {
                background: "#3B4D61", // primary.light for success background
                color: "#FFFFFF",
              },
              iconTheme: {
                primary: "green",
                secondary: "#FFFFFF",
              },
            },
            // Options for error toasts
            error: {
              duration: 5000,
              style: {
                background: "#4B3832", // secondary.DEFAULT for error background
                color: "#FFFFFF",
              },
              iconTheme: {
                primary: "#DC2626", // Example red for error icon
                secondary: "#FFFFFF",
              },
            },
            // You can add more configurations for other types like loading, custom, etc.
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
