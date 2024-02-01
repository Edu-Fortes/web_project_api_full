import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
