import React from "react";
import { useGetDashboardStatsQuery } from "../LibrarianQuery";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { 
  Loader2, BookOpen, Users, Calendar, BookMarked, 
  PieChart, BarChart, LineChart, ArrowUp, ArrowDown,
  BookOpenCheck, Clock, CheckCircle, AlertCircle, XCircle
} from "lucide-react";

const DashboardMain = () => {
  const { data: dashboardData, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary/40 border-t-primary animate-spin"></div>
        <h3 className="mt-4 text-lg font-semibold text-primary">
          Loading dashboard data...
        </h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center rounded-lg border border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-600">Error loading dashboard data</h3>
        <p className="text-red-500">There was a problem fetching the dashboard information. Please try again later.</p>
      </div>
    );
  }

  const { counts, booksByCategory, reservationStatusCounts, recentReservations, recentIssues, chartData } = dashboardData;

  // Calculate totals for status counts
  const getStatusCount = (status) => {
    const statusItem = reservationStatusCounts.find(item => item._id === status);
    return statusItem ? statusItem.count : 0;
  };
  
  const pendingCount = getStatusCount('pending');
  const confirmedCount = getStatusCount('confirmed');
  const cancelledCount = getStatusCount('cancelled');
  const totalStatusCount = pendingCount + confirmedCount + cancelledCount;
  
  // Get top categories
  const topCategories = [...booksByCategory].sort((a, b) => b.count - a.count).slice(0, 5);
  
  // Get monthly data with validation
  const monthlyData = chartData?.data || Array(12).fill(0);
  const monthLabels = chartData?.labels || [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Calculate actual values from real data
  const totalReservations = counts?.totalReservations || 0;
  const monthlyReservationsSum = monthlyData.reduce((sum, val) => sum + val, 0);
  
  // Only use actual data for max value calculation
  const maxMonthlyValue = Math.max(...monthlyData);
  
  // Find peak month (month with highest reservations)
  let peakMonth = 'None';
  if (maxMonthlyValue > 0) {
    const peakMonthIndex = monthlyData.indexOf(maxMonthlyValue);
    peakMonth = monthLabels[peakMonthIndex];
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getBadgeClass = () => {
      switch (status) {
        case 'confirmed':
          return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
        case 'pending':
          return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
        case 'cancelled':
          return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
        default:
          return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
      }
    };

    const getDotColor = () => {
      switch (status) {
        case 'confirmed':
          return 'bg-green-500';
        case 'pending':
          return 'bg-yellow-500';
        case 'cancelled':
          return 'bg-red-500';
        default:
          return 'bg-gray-500';
      }
    };

    return (
      <span className={getBadgeClass()}>
        <span className={`mr-1.5 h-2 w-2 rounded-full ${getDotColor()}`}></span>
        <span className="capitalize font-medium">{status}</span>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-accent">
        <div className="flex items-center gap-2">
          <PieChart size={24} className="text-primary" />
          <h2 className="text-2xl font-bold heading-modern text-gray-900">Librarian Dashboard</h2>
        </div>
        <div className="text-sm px-3 py-1 rounded-full bg-accent/30 text-gray-700">
          Last Updated:{" "}
          <span className="font-semibold text-primary">
            {format(new Date(), "PPP")}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {/* Books Card */}
        <div className="card-modern p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/40">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700">
              <span className="font-semibold">Library</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Books</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 mt-1">{counts.totalBooks}</p>
              <span className="text-xs text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>2.5%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Members Card */}
        <div className="card-modern p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/40">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
              <span className="font-semibold">Community</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Members</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 mt-1">{counts.totalMembers}</p>
              <span className="text-xs text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>4.3%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Reservations Card */}
        <div className="card-modern p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-full p-3 bg-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              <span className="font-semibold">Bookings</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Reservations</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 mt-1">{counts.totalReservations}</p>
              <span className="text-xs text-green-600 flex items-center">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>8.1%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pending Reservations Card */}
        <div className="card-modern p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/40">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700">
              <span className="font-semibold">Pending</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Reservations</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</p>
              <span className="text-xs text-amber-600 flex items-center">
                <ArrowDown className="h-3 w-3 mr-0.5" />
                <span>1.2%</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Reservations Visualization */}
        <div className="card-modern overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Monthly Reservations</h2>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                <span className="font-semibold">Year {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="h-80 flex flex-col justify-end">
              <div className="flex items-end space-x-2 h-64 mb-4 relative">
                {monthlyData.map((value, index) => {
                  // Calculate height with a minimum visible height for non-zero values
                  const heightPercentage = maxMonthlyValue === 0 ? 0 : 
                                          value === 0 ? 0 : 
                                          Math.max(10, (value / maxMonthlyValue) * 100);
                  const height = `${heightPercentage}%`;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                      {/* Bar */}
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-300 hover:opacity-80 ${value > 0 ? 'bg-primary' : ''}`} 
                        style={{ height }}
                        title={`${monthLabels[index]}: ${value} reservations`}
                      ></div>
                      
                      {/* Value label */}
                      {value > 0 && (
                        <div className="absolute bottom-full mb-1 text-xs font-medium text-primary">
                          {value}
                        </div>
                      )}
                      
                      {/* Month label */}
                      <div className="text-xs text-gray-500 mt-2">
                        {monthLabels[index].substring(0, 3)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm">
                <span className="text-gray-500">Peak Month: </span>
                <span className="font-medium text-primary">{peakMonth}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Total: </span>
                <span className="font-medium text-primary">{monthlyReservationsSum}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Status Distribution */}
        <div className="card-modern overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PieChart className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Reservation Status</h2>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                <span className="font-semibold">Current Period</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {totalStatusCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Reservation Data</h3>
                <p className="text-gray-500 text-sm max-w-md">
                  There is currently no reservation status data available to display.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* Confirmed Status */}
                <div className="flex items-center">
                  <div className="w-1/4">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm font-medium text-gray-700">Confirmed</span>
                    </div>
                  </div>
                  <div className="w-2/4 px-4">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${totalStatusCount ? (confirmedCount / totalStatusCount) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="text-sm font-semibold text-gray-700">{confirmedCount}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalStatusCount ? Math.round((confirmedCount / totalStatusCount) * 100) : 0}%)
                    </span>
                  </div>
                </div>
                
                {/* Pending Status */}
                <div className="flex items-center">
                  <div className="w-1/4">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="text-sm font-medium text-gray-700">Pending</span>
                    </div>
                  </div>
                  <div className="w-2/4 px-4">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${totalStatusCount ? (pendingCount / totalStatusCount) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="text-sm font-semibold text-gray-700">{pendingCount}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalStatusCount ? Math.round((pendingCount / totalStatusCount) * 100) : 0}%)
                    </span>
                  </div>
                </div>
                
                {/* Cancelled Status */}
                <div className="flex items-center">
                  <div className="w-1/4">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-sm font-medium text-gray-700">Cancelled</span>
                    </div>
                  </div>
                  <div className="w-2/4 px-4">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${totalStatusCount ? (cancelledCount / totalStatusCount) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="text-sm font-semibold text-gray-700">{cancelledCount}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({totalStatusCount ? Math.round((cancelledCount / totalStatusCount) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-gray-500">Confirmed</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs text-gray-500">Cancelled</span>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Total: </span>
                <span className="font-medium text-primary">{totalStatusCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <div className="card-modern overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Reservations</h2>
              </div>
              <Link to="/librarian/reservations" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View All
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentReservations && recentReservations.length > 0 ? (
              recentReservations.slice(0, 5).map((reservation) => (
                <div key={reservation._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {reservation.memberUserId?.name || "Unknown Member"}
                    </h3>
                    <StatusBadge status={reservation.status} />
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {reservation.date ? format(new Date(reservation.date), "PPP") : "No date"} • 
                      {reservation.SlotStartTime && reservation.SlotEndTime ? 
                        ` ${reservation.SlotStartTime} - ${reservation.SlotEndTime}` : " No time"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {reservation.createdAt ? `Created ${format(new Date(reservation.createdAt), "PP")}` : ""}
                    </span>
                    <Link 
                      to={`/librarian/reservations/view/${reservation._id}`}
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">No Recent Reservations</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  There are no recent reservations to display at this time.
                </p>
              </div>
            )}
          </div>
          
          {recentReservations && recentReservations.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
              <Link 
                to="/librarian/reservations"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View All Reservations
              </Link>
            </div>
          )}
        </div>

        {/* Top Book Categories */}
        <div className="card-modern overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpenCheck className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Top Book Categories</h2>
              </div>
              <Link to="/librarian/books" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View Books
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {topCategories && topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map((category, index) => {
                  // Get the maximum count to calculate percentages
                  const maxCount = topCategories[0].count;
                  const percentage = Math.round((category.count / maxCount) * 100);
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {category._id || "Uncategorized"}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {category.count} books
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">No Category Data</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  There is no book category data available to display.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;