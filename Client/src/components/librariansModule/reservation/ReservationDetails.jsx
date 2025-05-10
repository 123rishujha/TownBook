import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetReservationByIdQuery } from "../LibrarianQuery";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2, ArrowLeft, Pencil } from "lucide-react";

const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: reservation, isLoading, isError } = useGetReservationByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !reservation) {
    return (
      <div className="text-center">
        <p className="text-red-500">Error loading reservation details</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/librarian/reservations")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reservations
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/librarian/reservations")}
            className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reservation Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage reservation information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/librarian/reservations/edit/${id}`}>
            <Button variant="outline" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 rounded-md font-medium transition-colors">
              <Pencil className="h-4 w-4" /> 
              Edit Reservation
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Status banner */}
        <div className={`px-6 py-3 ${reservation.status === "confirmed" ? "bg-green-500" : reservation.status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${reservation.status === "confirmed" ? "bg-green-200" : reservation.status === "pending" ? "bg-yellow-200" : "bg-red-200"} mr-2`}></div>
            <span className="text-white font-medium capitalize">{reservation.status}</span>
          </div>
        </div>
        
        {/* Reservation info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Member info section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Member Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h4>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                      {reservation.memberUserId?.name || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                      {reservation.memberUserId?.email || "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Librarian</h4>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                      {reservation.librarianUserId 
                        ? `${reservation.librarianUserId.name}` 
                        : "Not assigned"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reservation details section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Reservation Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reservation ID</h4>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1 font-mono">
                      {reservation._id}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h4>
                    <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                      {reservation.date
                        ? format(new Date(reservation.date), "PPP") 
                        : "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Slot</h4>
                    <div className="flex items-center mt-1">
                      <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-md">
                        {reservation.SlotStartTime && reservation.SlotEndTime ? 
                          `${reservation.SlotStartTime} - ${reservation.SlotEndTime}` : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
       
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;