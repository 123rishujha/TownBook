import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AllBooks from "./AllBooks";
import BookForm from "./BookForm";

const BookRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AllBooks />} />
      <Route path="form" element={<BookForm />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default BookRoutes;
