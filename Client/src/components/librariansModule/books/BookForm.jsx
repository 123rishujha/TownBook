import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Book, Upload, X, Save, ChevronLeft } from "lucide-react";
import { useLibraryBookOperationsMutation } from "../LibrarianQuery";
import useS3Upload from "../../../hooks/useS3Upload";

function BookForm() {
  const { state } = useLocation();
  const [previewLink, setPreviewLink] = useState(state?.coverImage || "");
  const { handleUploadFileS3 } = useS3Upload();
  const [bookAPI, { isLoading }] = useLibraryBookOperationsMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: state?.title ?? "",
      author: state?.author ?? "",
      copies: state?.copies ?? 1,
      coverImage: state?.coverImage ?? null,
      description: state?.description ?? "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const bookData = {
        ...data,
        coverImage: previewLink || data.coverImage,
      };
      const response = await bookAPI({
        body: bookData,
        url: state ? `/update/${state._id}` : "/add",
        method: state ? "PUT" : "POST",
      });

      if ([200, 201].includes(response.data?.status_code)) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files?.length > 0) {
      try {
        const res = await handleUploadFileS3(files[0], "bookCover");
        if (res?.previewLink) {
          setPreviewLink(res.previewLink);
          setValue("coverImage", res.previewLink);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg border border-accent/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-primary w-1 h-6 mr-3 rounded"></div>
          <h2 className="text-xl font-bold text-dark">
            {state ? "Edit Book" : "Add New Book"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-dark font-medium mb-1"
              >
                Book Title *
              </label>
              <div className="relative">
                <Book
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70"
                />
                <input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter book title"
                  className="w-full pl-10 pr-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-dark font-medium mb-1"
              >
                Author *
              </label>
              <input
                id="author"
                {...register("author", { required: "Author is required" })}
                type="text"
                placeholder="Enter author name"
                className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="copies"
                className="block text-dark font-medium mb-1"
              >
                Number of Copies *
              </label>
              <input
                id="copies"
                {...register("copies", {
                  required: "Copies is required",
                  min: {
                    value: 1,
                    message: "Must have at least 1 copy",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
              />
              {errors.copies && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.copies.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-dark font-medium mb-1">
                Cover Image
              </label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed border-accent/50 rounded-md bg-light/30">
                {previewLink ? (
                  <div className="relative w-full flex justify-center">
                    <img
                      src={previewLink}
                      alt="Book cover preview"
                      className="h-40 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewLink("");
                        setValue("coverImage", null);
                      }}
                      className="absolute top-0 right-0 bg-light text-dark rounded-full p-1 hover:bg-accent/50"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-primary/70 mb-2" />
                    <p className="text-sm text-dark">
                      Drag & drop or{" "}
                      <label className="text-primary cursor-pointer hover:underline">
                        browse
                        <input
                          type="file"
                          name="coverImage"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-xs text-dark/70 mt-1">
                      Recommended format: JPEG, PNG (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-dark font-medium mb-1"
              >
                Book Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                placeholder="Enter book description..."
                className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light/30"
              ></textarea>
            </div>
          </div>
        </div>

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
                  {state ? "Update Book" : "Add Book"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
