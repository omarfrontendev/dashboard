import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { LoginPage } from "@/pages/auth/LoginPage";
// import Overview from "@/pages/dashboard/Overview";
// import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { routes } from "@/config/menu.config";

const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
