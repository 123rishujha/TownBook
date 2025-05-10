import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ReservationList from "./ReservationList";
import ReservationForm from "./ReservationForm";
import ReservationDetails from "./ReservationDetails";

function ReservationRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ReservationList />} />
        <Route path="/edit/:id" element={<ReservationForm />} />
        <Route path="/view/:id" element={<ReservationDetails />} />
      </Routes>
    </Suspense>
  );
}

export default ReservationRoutes;