import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const token = localStorage.getItem("token"); // בדיקת טוקן ב-localStorage
    if (!token) {
        return <Navigate to="/login" replace />; // ניתוב לעמוד התחברות אם אין טוקן
    }
    return children;
};

export default ProtectedRoute;