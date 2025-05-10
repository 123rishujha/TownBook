import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCreateReservationMutation, useGetBooksByLibrarianQuery, useGetLibrarianRoomsByIdQuery } from "../MemberQuery";
// import { useCreateReservationMutation } from "../MemberMutation"; // Import the mutation hook
import {
  BookOpen,
  Users,
  Info,
  Search,
  Bookmark,
  Calendar,
  NotebookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dailog";
import { useSelector } from "react-redux";

const LibraryBooks = () => {
  const { librarianId } = useParams();
  const { data: books, isLoading } = useGetBooksByLibrarianQuery(
    `${librarianId}`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [animateCards, setAnimateCards] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animate cards after initial load
  useEffect(() => {
    if (!isLoading && books) {
      setTimeout(() => setAnimateCards(true), 100);
    }
  }, [isLoading, books]);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (!searchQuery.trim()) return books;

    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        (book.description && book.description.toLowerCase().includes(query))
    );
  }, [books, searchQuery]);

  // Function to generate a gradient if no cover image exists
  const generateCoverGradient = (title) => {
    const colors = [
      "from-purple-500 to-indigo-600",
      "from-blue-500 to-teal-400",
      "from-green-400 to-emerald-500",
      "from-yellow-400 to-orange-500",
      "from-pink-500 to-rose-500",
    ];

    // Use the title's first character code to select a gradient
    const index = title ? title.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-library-accent">
            <BookOpen className="inline-block mr-2 mb-1" />
            Library Collection
          </h1>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-purple-700">Loading collection...</p>
            </div>
          </div>
        )}

        {/* Empty search results */}
        {!isLoading && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No books found
            </h2>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        )}

        {/* Books grid */}
        {!isLoading && filteredBooks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book._id}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                  animateCards
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-48 sm:h-56 bg-gradient-to-br ${generateCoverGradient(
                      book.title
                    )} flex items-center justify-center p-4`}
                  >
                    <h3 className="text-xl font-bold text-white text-center">
                      {book.title}
                    </h3>
                  </div>
                )}

                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <span className="inline-block mr-1">by</span>
                    <span className="font-medium">{book.author}</span>
                  </p>

                  <p className="text-sm text-gray-700 line-clamp-3 mb-4 flex-grow">
                    {book.description || "No description available"}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {book.genre &&
                      book.genre.split(",").map((genre, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {genre.trim()}
                        </span>
                      ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center text-emerald-600 text-sm">
                      <NotebookText className="w-4 h-4 mr-1" />
                      <span>{book.copies || 0} available</span>
                    </div>
                    <RequestModal librarianId={librarianId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleRequestClick={handleRequestClick} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total count */}
        {!isLoading && filteredBooks.length > 0 && (
          <div className="mt-6 text-right text-sm text-gray-600">
            {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "book" : "books"} found
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryBooks;




const RequestModal = ({ isModalOpen, setIsModalOpen, handleRequestClick, librarianId }) => {
  const { data: rooms } = useGetLibrarianRoomsByIdQuery(`/${librarianId}`,{skip: librarianId ? false : true});
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedDateId, setSelectedDateId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [createReservation] = useCreateReservationMutation();
  const { userState } = useSelector((store) => store.user);

  const handleSubmit = async () => {
    if (selectedRoomId && selectedDateId && selectedSlotId) {
      const selectedRoom = rooms.find(room => room._id === selectedRoomId);
      const selectedDate = selectedRoom.availableTimeSlots.find(slot => slot._id === selectedDateId);
      const selectedSlot = selectedDate.slots.find(slot => slot._id === selectedSlotId);
      
      const payload = {
        dateId: selectedDateId,
        SlotEndTime: selectedSlot.end,
        SlotStartTime: selectedSlot.start,
        memberUserId: userState._id, 
        date: selectedDate.date,
        slotId: selectedSlotId,
        librarianUserId: librarianId,
      };
      
      console.log("Payload:", payload);
      try {
        await createReservation({ body: payload }).unwrap();
        console.log("Reservation created successfully");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to create reservation", error);
      }
    } else {
      alert("Please select room, date and time slot.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex items-center text-sm text-white"
          onClick={handleRequestClick}
        >
          <Bookmark className="w-4 h-4 mr-1" />
          <span>Request</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Available Rooms and Time Slots</DialogTitle>
        <DialogDescription>
          {rooms?.length > 0 ? (
            <div className="space-y-4">
              {/* Room Selection */}
              <div>
                <label className="block font-medium mb-1">Select Room:</label>
                <select
                  className="w-full border p-2 rounded"
                  value={selectedRoomId}
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    setSelectedDateId("");
                    setSelectedSlotId("");
                  }}
                >
                  <option value="">-- Choose a room --</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              {selectedRoomId && (
                <div>
                  <label className="block font-medium mb-1">Select Date:</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={selectedDateId}
                    onChange={(e) => {
                      setSelectedDateId(e.target.value);
                      setSelectedSlotId("");
                    }}
                  >
                    <option value="">-- Choose a date --</option>
                    {rooms
                      .find((room) => room._id === selectedRoomId)
                      ?.availableTimeSlots.map((slot) => (
                        <option key={slot._id} value={slot._id}>
                          {slot.date}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Slot Selection */}
              {selectedDateId && (
                <div>
                  <label className="block font-medium mb-1">Select Time Slot:</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                  >
                    <option value="">-- Choose a time slot --</option>
                    {rooms
                      .find((room) => room._id === selectedRoomId)
                      ?.availableTimeSlots.find((slot) => slot._id === selectedDateId)
                      ?.slots.map((slot) => (
                        <option key={slot._id} value={slot._id}>
                          {slot.start} - {slot.end}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-right mt-4">
                <Button onClick={handleSubmit}>Submit Request</Button>
              </div>
            </div>
          ) : (
            <p>No rooms available</p>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
