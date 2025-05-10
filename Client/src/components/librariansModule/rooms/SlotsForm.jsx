import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLibraryRoomOperationsMutation } from "../LibrarianQuery";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RoomTimeSlotForm = ({ roomId, data }) => {
  const [API] = useLibraryRoomOperationsMutation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      slots: [{ start: "", end: "" }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "slots",
  });

  // Load existing data into form
  useEffect(() => {
    if (data?.availableTimeSlots?.length > 0) {
      const latestSlot =
        data.availableTimeSlots[data.availableTimeSlots.length - 1];
      reset({
        date: latestSlot.date,
        slots: latestSlot.slots.map((slot) => ({
          start: slot.start,
          end: slot.end,
        })),
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      await API({
        method: "PUT",
        url: `/update-temslote/${roomId}`,
        body: formData,
      });
      setMessage("Time slots updated successfully.");
    } catch (err) {
      setMessage(err?.response?.data?.msg || "Failed to update slots.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl bg-white shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Time Slots</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-library-primary">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date (YYYY-MM-DD)
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">Date is required</p>
          )}
        </div>

        {/* Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Slots
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mb-2">
              <input
                type="time"
                {...register(`slots.${index}.start`, { required: true })}
                className="w-1/2 border border-gray-300 p-2 rounded-md"
              />
              <input
                type="time"
                {...register(`slots.${index}.end`, { required: true })}
                className="w-1/2 border border-gray-300 p-2 rounded-md"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ start: "", end: "" })}
            className="text-library-primary hover:underline text-sm mt-2"
          >
            + Add Slot
          </button>
        </div>

        {/* Submit */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="text-white w-full py-2 px-4 rounded-md "
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-library-primary text-white py-2 px-4 rounded-md "
          >
            {loading ? "Saving..." : "Save Time Slots"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomTimeSlotForm;
