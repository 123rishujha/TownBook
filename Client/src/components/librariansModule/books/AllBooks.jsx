import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Plus,
  Edit,
  Trash2,
  Calendar,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

import { useGetLibraranBooksQuery } from "../LibrarianQuery";

const ITEMS_PER_PAGE = 10;

const searchKeyOptions = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "publishDate", label: "Publish Date" },
];

function AllBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState("title");
  const navigate = useNavigate();
  const { data, isLoading } = useGetLibraranBooksQuery();

  const filteredData = useMemo(() => {
    const response = data;
    return response
      ? response.filter((book) =>
          book[searchKey]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];
  }, [searchQuery, searchKey, data]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary/40 border-t-primary animate-spin"></div>
        <h3 className="mt-4 text-lg font-semibold text-primary">
          Loading books...
        </h3>
      </div>
    );
  }

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      console.log("Deleting book with ID:", bookId);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-accent">
        <div className="flex items-center gap-2">
          <BookOpen size={24} className="text-primary" />
          <h2 className="text-2xl font-bold text-dark">Library Books</h2>
        </div>
        <Button
          onClick={() => navigate("form")}
          className="bg-primary text-white hover:opacity-90 shadow-md transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search books..."
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
          Total Books:{" "}
          <span className="font-semibold text-primary">
            {filteredData.length}
          </span>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden shadow-sm border-accent/80">
        <Table className="table-fixed w-full">
          <TableHeader className="bg-accent/30">
            <TableRow>
              <TableHead className="font-semibold text-primary w-[14%]">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Book Title
                </div>
              </TableHead>
              <TableHead className="font-semibold text-primary w-[14%]">
                Author
              </TableHead>
              <TableHead className="font-semibold text-primary w-[12%]">
                Copies
              </TableHead>
              <TableHead className="font-semibold text-primary w-[12%]">
                Reserved
              </TableHead>
              <TableHead className="font-semibold text-primary w-[14%]">
                Available Copies
              </TableHead>
              <TableHead className="font-semibold text-primary w-[20%]">
                Description
              </TableHead>
              <TableHead className="text-right font-semibold text-primary w-[14%]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((book) => (
                <TableRow
                  key={book.id}
                  className="transition-colors hover:bg-accent/20"
                >
                  <TableCell className="font-medium text-dark truncate w-[14%]">
                    {book.title}
                  </TableCell>
                  <TableCell className="text-dark truncate w-[14%]">
                    {book.author}
                  </TableCell>
                  <TableCell className="w-[12%]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                      {book?.copies}
                    </span>
                  </TableCell>
                  <TableCell className="w-[12%]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                      {book?.reserved}
                    </span>
                  </TableCell>
                  <TableCell className="w-[14%]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                      {Math.abs(book?.copies - book?.reserved)}
                    </span>
                  </TableCell>
                  <TableCell className="text-dark relative w-[20%]">
                    <div title={book.description} className="truncate relative">
                      {book.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-right w-[14%]">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`form`, { state: book })}
                        className="hover:bg-primary/20 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteBook(book.id)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <BookOpen size={32} className="text-primary/70" />
                    <h3 className="text-lg font-semibold mt-2 text-dark">
                      No books found
                    </h3>
                    <p className="mt-1 text-sm text-dark/80">
                      Try adjusting your search parameters to find books.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-dark/80">
            Showing{" "}
            <span className="font-medium text-primary">{startIndex + 1}</span>{" "}
            to{" "}
            <span className="font-medium text-primary">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-primary">
              {filteredData.length}
            </span>{" "}
            books
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50 border-accent/80 text-primary hover:bg-accent/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageToShow;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i;
              } else {
                pageToShow = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageToShow}
                  variant={currentPage === pageToShow ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(pageToShow)}
                  className={
                    currentPage === pageToShow
                      ? "bg-primary text-light"
                      : "border-accent/80 text-dark hover:bg-accent/30"
                  }
                >
                  {pageToShow}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 border-accent/80 text-primary hover:bg-accent/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
