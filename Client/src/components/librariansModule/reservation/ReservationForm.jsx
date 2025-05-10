import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useUpdateReservationMutation, 
  useGetReservationByIdQuery 
} from "../LibrarianQuery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Reservation validation schema
const reservationSchema = yup.object().shape({
  status: yup.string().required("Status is required"),
  notes: yup.string().optional(),
});

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: reservation, isLoading: isLoadingReservation } = useGetReservationByIdQuery(id);
  const [updateReservation, { isLoading: isUpdating }] = useUpdateReservationMutation();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      status: "pending",
    },
  });

  useEffect(() => {
    if (reservation) {
      reset({
        status: reservation.status || "pending",
        notes: reservation.notes || "",
      });
    }
  }, [reservation, reset]);

  const onSubmit = async (data) => {
    try {
      await updateReservation({ id, body: data }).unwrap();
      toast.success("Reservation updated successfully");
      navigate("/librarian/reservations");
    } catch (error) {
      toast.error(error?.data?.msg || "An error occurred");
    }
  };

  if (isLoadingReservation) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Reservation</h2>
        <p className="text-muted-foreground mt-1">Manage reservation details and update status</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Reservation Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Member</Label>
              <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {reservation?.memberUserId?.name || "Loading..."}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Email</Label>
              <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {reservation?.memberUserId?.email || "Loading..."}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date</Label>
              <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {reservation?.date ? format(new Date(reservation.date), "PPP") : "N/A"}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Time Slot</Label>
              <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                {reservation?.SlotStartTime && reservation?.SlotEndTime ? 
                  `${reservation.SlotStartTime} - ${reservation.SlotEndTime}` : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Update Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">Reservation Status</Label>
              <Select
                onValueChange={(value) => setValue("status", value)}
                defaultValue={reservation?.status || "pending"}
              >
                <SelectTrigger 
                  id="status" 
                  className={`bg-white dark:bg-gray-800 border-2 ${errors.status ? "border-red-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <SelectItem value="pending" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
                      <span>Pending</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="confirmed" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span>Confirmed</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cancelled" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      <span>Cancelled</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>

         
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/librarian/reservations")}
            className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            {isUpdating && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Reservation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;