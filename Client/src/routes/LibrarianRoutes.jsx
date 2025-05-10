import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/RouteValidation";
import DashboardMain from "@/components/librariansModule/dashboard/DashboardMain";
import LibrarianNavbar from "@/components/librariansModule/LibrarianNavbar/LibrarianNavbar";
import BookRoutes from "@/components/librariansModule/books/BookRoutes";
import RoomRoutes from "@/components/librariansModule/rooms/RoomRoutes";
import ReservationRoutes from "@/components/librariansModule/reservation/ReservationRoutes";

function HomeRoutes() {
  return (
    <ProtectedRoute>
      <Suspense>
        <div className="min-h-screen bg-background">
          <LibrarianNavbar />
          <div>
            <main className="container mx-auto py-6 px-4 lg:px-6">
              <Routes>
                <Route path="" element={<DashboardMain />} />
                <Route path="books/*" element={<BookRoutes />} />
                <Route path="rooms/*" element={<RoomRoutes />} />
                <Route path="reservations/*" element={<ReservationRoutes />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}

export default HomeRoutes;
