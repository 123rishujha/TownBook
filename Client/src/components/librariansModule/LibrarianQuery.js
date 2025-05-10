import { slice } from "@/redux/slice/slice";

const librarySlice = slice.injectEndpoints({
  endpoints: (builder) => ({
    libraryBookOperations: builder.mutation({
      query: ({ body, method, url, msz }) => ({
        url: `api/library-book${url ? url : ""}`,
        body: body,
        method: method,
        msz: msz ?? true,
      }),
      invalidatesTags: ["user-librarys-books"],
    }),
    getLibraranBooks: builder.query({
      query: (args) => ({
        url: `api/library-book${args ? args : ""}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["user-librarys-books"],
    }),

    // rooms
    libraryRoomOperations: builder.mutation({
      query: ({ body, method, url, msz }) => ({
        url: `api/library-room${url ? url : ""}`,
        body: body,
        method: method,
        msz: msz ?? true,
      }),
      invalidatesTags: ["user-librarys-rooms"],
    }),
    getLibrarianRooms: builder.query({
      query: (args) => ({
        url: `api/library-room${args ? args : ""}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["user-librarys-rooms"],
    }),

    // reservations
    getAllReservations: builder.query({
      query: () => ({
        url: 'api/reservations',
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["reservations"],
    }),
    
    // dashboard
    getDashboardStats: builder.query({
      query: () => ({
        url: 'api/dashboard/stats',
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["dashboard"],
    }),
    getReservationById: builder.query({
      query: (id) => ({
        url: `api/reservations/${id}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: (result, error, id) => [{ type: "reservations", id }],
    }),
    updateReservation: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/reservations/${id}`,
        method: 'PUT',
        body,
        msz: true,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "reservations", id }, "reservations"],
    }),
    getMemberReservations: builder.query({
      query: (userId) => ({
        url: `api/reservations/member/${userId}`,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["reservations"],
    }),
  }),
});

export const {
  // books
  useGetLibraranBooksQuery,
  useLibraryBookOperationsMutation,
  //   rooms
  useGetLibrarianRoomsQuery,
  useLibraryRoomOperationsMutation,
  // reservations
  useGetAllReservationsQuery,
  useGetReservationByIdQuery,
  useUpdateReservationMutation,
  useGetMemberReservationsQuery,
  // dashboard
  useGetDashboardStatsQuery,
} = librarySlice;
