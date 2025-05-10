import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Save, ChevronLeft } from "lucide-react";
import { useLibraryRoomOperationsMutation } from "../LibrarianQuery";
// import { useRoomOperationsMutation } from "../LibrarianQuery";

function RoomForm() {
  const { state } = useLocation();
  const [roomAPI, { isLoading }] = useLibraryRoomOperationsMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: state?.name ?? "",
      capacity: state?.capacity ?? 1,
      availableTimeSlots: state?.availableTimeSlots ?? [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await roomAPI({
        body: data,
        url: state ? `/update/${state._id}` : "/add",
        method: state ? "PUT" : "POST",
      });

      if ([200, 201].includes(response.data?.status_code)) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg border border-accent/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-primary w-1 h-6 mr-3 rounded"></div>
          <h2 className="text-xl font-bold text-dark">
            {state ? "Edit Room" : "Add New Room"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-dark font-medium mb-1"
              >
                Room Name *
              </label>
              <input
                id="name"
                {...register("name", { required: "Room name is required" })}
                type="text"
                placeholder="Enter room name"
                className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="capacity"
                className="block text-dark font-medium mb-1"
              >
                Capacity *
              </label>
              <input
                id="capacity"
                {...register("capacity", {
                  required: "Capacity is required",
                  min: {
                    value: 1,
                    message: "Capacity must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Note: You might want to add time slot management UI here later */}

        <div className="pt-6 border-t border-accent/30">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-white text-dark border border-accent/50 rounded-md hover:bg-light transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {state ? "Update Room" : "Add Room"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RoomForm;
