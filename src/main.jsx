import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import AuthProvider from "./Provider/Authprovidre";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            zIndex: 9999, // Custom z-index value
          },
        }}
      />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
