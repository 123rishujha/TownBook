import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMemberReservationsQuery } from "./MemberQuery";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, User, AlertCircle } from "lucide-react";
import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const statusColorMap = {
  approved: "bg-green-500 text-white hover:bg-green-600",
  confirmed: "bg-blue-500 text-white hover:bg-blue-600",
  pending: "bg-yellow-500 text-white hover:bg-yellow-600",
  rejected: "bg-red-500 text-white hover:bg-red-600",
};

const searchKeyOptions = [
  { value: "status", label: "Status" },
  { value: "date", label: "Date" },
  { value: "librarian", label: "Librarian" },
];

const MemberReservations = () => {
  const { userState } = useSelector((store) => store.user);
  const {
    data: reservations,
    isLoading,
    error,
  } = useGetMemberReservationsQuery(userState._id);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState(searchKeyOptions[0].value);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 animate-pulse">Loading your reservations...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-lg text-red-600 font-medium">Error loading reservations</p>
        <p className="text-sm text-gray-500 mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  const filteredReservations = reservations.filter((reservation) => {
    const value = reservation[searchKey];
    return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          My Reservations
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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
          Total Reservations: {reservations.length}
        </div>
      </div>
      {filteredReservations.length > 0 ? (
        <div className="overflow-x-auto border rounded-md mt-8">
          <Table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
            <TableHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <TableRow>
                <TableHead className="font-semibold text-primary w-[20%]">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-primary w-[15%]">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-primary w-[20%]">
                  Time
                </TableHead>
                <TableHead className="font-semibold text-primary w-[20%]">
                  Librarian
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-100">
              {filteredReservations.map((reservation) => {
                const {
                  _id,
                  status,
                  date,
                  SlotStartTime,
                  SlotEndTime,
                  librarianUserId,
                } = reservation;

                return (
                  <TableRow
                    key={_id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell className="px-4 py-2">
                      <Badge
                        className={
                          statusColorMap[status] || "bg-gray-100 text-gray-700"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{SlotStartTime} - {SlotEndTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{librarianUserId?.name || "N/A"}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">No Reservations Found</p>
          <p className="text-sm text-gray-500">You haven't made any reservations yet.</p>
        </div>
      )}
    </div>
  );
};

export default MemberReservations;