import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2, Eye, Pencil, Search, Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useGetAllReservationsQuery } from "../LibrarianQuery";

const ITEMS_PER_PAGE = 10;

const searchKeyOptions = [
  { value: "memberUserId.name", label: "Member Name" },
  { value: "status", label: "Status" },
  { value: "date", label: "Date" },
];

const ReservationList = () => {
  const { data: reservations, isLoading, isError } = useGetAllReservationsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState("memberUserId.name");
  const navigate = useNavigate();
  
  const filteredData = useMemo(() => {
    if (!reservations) return [];
    
    return reservations.filter((reservation) => {
      if (searchKey === "memberUserId.name") {
        return reservation.memberUserId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      } else if (searchKey === "date") {
        const formattedDate = reservation.date ? format(new Date(reservation.date), "PPP").toLowerCase() : "";
        return formattedDate.includes(searchQuery.toLowerCase());
      } else {
        return reservation[searchKey]?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      }
    });
  }, [searchQuery, searchKey, reservations]);

  const totalPages = Math.ceil((filteredData?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary/40 border-t-primary animate-spin"></div>
        <h3 className="mt-4 text-lg font-semibold text-primary">
          Loading reservations...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center rounded-lg border border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-600">Error loading reservations</h3>
        <p className="text-red-500">There was a problem fetching the reservation data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-accent">
        <div className="flex items-center gap-2">
          <Calendar size={24} className="text-primary" />
          <h2 className="text-2xl font-bold text-dark">Reservations</h2>
        </div>
      
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 h-11 bg-white shadow-sm transition-all border-primary/50 text-dark"
            />
          </div>
          <select
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="h-11 rounded-md border px-3 text-sm w-full sm:w-auto border-primary/50 text-dark bg-light"
          >
            {searchKeyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm px-3 py-1 rounded-full bg-accent/30 text-dark">
          Total Reservations:{" "}
          <span className="font-semibold text-primary">
            {filteredData.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border overflow-hidden shadow-sm border-accent/80">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white">
            <div className="h-16 w-16 rounded-full bg-accent/30 flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-dark mb-1">No reservations found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchQuery ? "No results match your search criteria." : "There are currently no reservation requests in the system."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="table-fixed w-full">
              <TableHeader className="bg-accent/30">
                <TableRow>
                  <TableHead className="font-semibold text-primary w-[20%]">
                    Member
                  </TableHead>
                  <TableHead className="font-semibold text-primary w-[20%]">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-primary w-[15%]">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-primary w-[15%]">
                    Time Slot
                  </TableHead>
                  <TableHead className="font-semibold text-primary w-[10%]">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-semibold text-primary w-[20%]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((reservation) => (
                  <TableRow 
                    key={reservation._id} 
                    className="transition-colors hover:bg-accent/20"
                  >
                    <TableCell className="font-medium text-dark truncate w-[20%]">
                      {reservation.memberUserId?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-dark truncate w-[20%]">
                      {reservation.memberUserId?.email || "N/A"}
                    </TableCell>
                    <TableCell className="text-dark w-[15%]">
                      {reservation.date ? format(new Date(reservation.date), "PPP") : "N/A"}
                    </TableCell>
                    <TableCell className="w-[15%]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                        {reservation.SlotStartTime && reservation.SlotEndTime ? 
                          `${reservation.SlotStartTime} - ${reservation.SlotEndTime}` : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="w-[10%]">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reservation.status === "confirmed" ? "bg-green-100 text-green-800" :
                        reservation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        <span className={`mr-1.5 h-2 w-2 rounded-full ${
                          reservation.status === "confirmed" ? "bg-green-500" :
                          reservation.status === "pending" ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}></span>
                        <span className="capitalize">{reservation.status}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-right w-[20%]">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/librarian/reservations/view/${reservation._id}`}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="hover:bg-primary/20 hover:text-primary"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/librarian/reservations/edit/${reservation._id}`}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="hover:bg-primary/20 hover:text-primary"
                            title="Edit reservation"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredData.length, startIndex + 1)} to{" "}
            {Math.min(filteredData.length, startIndex + ITEMS_PER_PAGE)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "bg-primary text-white" : "border-primary/50 text-primary hover:bg-primary/10"}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList;