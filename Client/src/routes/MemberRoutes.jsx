import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/RouteValidation";
import MemberNavbar from "@/components/memeberModule/memberNavbar/MemberNavbar";
import AllLibraries from "@/components/memeberModule/allLibraries/AllLibraries";
import LibraryBooks from "@/components/memeberModule/libraryBooks/LibraryBooks";
import MemberReservations from '../components/memeberModule/MemberReservations';

function MemberRoutes() {
  return (
    <ProtectedRoute>
      <Suspense>
        <div className="min-h-screen bg-background">
          <MemberNavbar />
          <div>
            <main className="container mx-auto py-6 px-4 lg:px-6">
              <Routes>
                {/* all-libraries */}
                <Route path="" element={<AllLibraries />} />
                <Route path="/library/:librarianId" element={<LibraryBooks />} />
                <Route path="/reservations" element={<MemberReservations />} />
                {/* <Route path="books/*" element={<BookRoutes />} /> */}
                {/* <Route path="rooms/*" element={<RoomRoutes />} /> */}
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}

export default MemberRoutes;
