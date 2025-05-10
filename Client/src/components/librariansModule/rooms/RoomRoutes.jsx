import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AllBooks from "./AllRooms";
import RoomForm from "./RoomForm";
import SingleRoom from "./SingleRoom";

const BookRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AllBooks />} />
      <Route path=":roomId" element={<SingleRoom />} />
      <Route path="form" element={<RoomForm />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default BookRoutes;
