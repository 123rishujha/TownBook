import { slice } from "@/redux/slice/slice";

const userSlice = slice.injectEndpoints({
  endpoints: (builder) => ({
    // libraryBookOperations: builder.mutation({
    //   query: ({ body, method, url, msz }) => ({
    //     url: `api/library-book${url ? url : ""}`,
    //     body: body,
    //     method: method,
    //     msz: msz ?? true,
    //   }),
    //   invalidatesTags: ["all-libraries"],
    // }),
    getAllLibraries: builder.query({
      query: (args) => ({
        url: `api/user/all-libraries${args ? args : ""}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["all-libraries"],
    }),
    getBooksByLibrarian: builder.query({
      query: (args) => ({
        url: `api/library-book/librarian/${args ? args : ""}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["all-libraries","user-librarys-books" ],
    }),
    getLibrarianRoomsById: builder.query({
      query: (args) => ({
        url: `api/library-room/librarian${args ? args : ""}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["all-libraries","user-librarys-rooms" ],
    }),
    createReservation: builder.mutation({
      query: ({ body }) => ({
        url: 'api/reservations',
        method: 'POST',
        body: body,
        msz: true,
      }),
      invalidatesTags: ['reservations'],
    }),
    getMemberReservations: builder.query({
      query: (userId) => ({
        url: `api/reservations/member/${userId}`,
      }),
      transformResponse: (response) => response?.data.map(reservation => ({
        ...reservation,
        date: reservation.date,
        SlotStartTime: reservation.SlotStartTime,
        SlotEndTime: reservation.SlotEndTime,
      })),
      providesTags: ['reservations'],
    }),
  }),
});

export const {
  // books
  useGetAllLibrariesQuery,
  // useLibraryBookOperationsMutation,
  useGetBooksByLibrarianQuery,
  useGetLibrarianRoomsByIdQuery,
  useCreateReservationMutation,
  useGetMemberReservationsQuery,
} = userSlice;
