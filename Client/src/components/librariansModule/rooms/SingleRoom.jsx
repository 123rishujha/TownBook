import React, { useState } from "react";
import { useGetLibrarianRoomsQuery } from "../LibrarianQuery";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Skeleton } from "@/components/ui/skeleton";

import { ToastHandler } from "@/components/myToast/ToastHandler";
import SlotsForm from "./SlotsForm";

const SingleRoom = () => {
  const { roomId } = useParams();
  const {
    data: room,
    isLoading,
    isError,
    refetch,
  } = useGetLibrarianRoomsQuery(`/${roomId}`);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    date: undefined,
    startTime: "",
    endTime: "",
  });
  const [editingSlot, setEditingSlot] = useState(null);
  //   const { toast } = useToast();

  const handleAddSlot = () => {
    setEditingSlot(null);
    setNewSlot({
      day: "Monday",
      date: undefined,
      startTime: "",
      endTime: "",
    });
    setOpenDialog(true);
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setNewSlot({
      day: slot.day,
      date: slot.date ? parseISO(slot.date) : undefined,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
    setOpenDialog(true);
  };

  const handleDeleteSlot = (slotId) => {
    // Implement delete functionality
    ToastHandler("err", "Slot deleted");
    refetch();
  };

  const handleSubmitSlot = () => {
    // Implement API call to save the slot
    ToastHandler("succ", "Slot deleted");

    setOpenDialog(false);
    refetch();
  };

  if (isLoading)
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading room details
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{room?.name} Room</h1>
        <p className="text-muted-foreground">
          Manage room details and availability
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Basic details about this room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Capacity</Label>
              <p>{room?.capacity} people</p>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Created</Label>
              <p>{format(new Date(room?.createdAt), "MMM dd, yyyy hh:mm a")}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium">Last Updated</Label>
              <p>{format(new Date(room?.updatedAt), "MMM dd, yyyy hh:mm a")}</p>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots Card */}
        <Card>
          {/* <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>
              Current availability for this room
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            <SlotsForm roomId={roomId} data={room} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleRoom;
