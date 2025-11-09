import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../features/api/libraryApi";
import type { Book } from "../features/type";
import { toast } from "react-toastify";

export default function CreateBook() {
  const [book, setBook] = useState<Partial<Book>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  // Handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "imageFile" && files && files[0]) {
      setImageFile(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
      return;
    }

    if (name === "imageUrl") {
      setImageFile(null); // clear file if URL is used
      setBook((prev) => ({ ...prev, image: value }));
      setImagePreview(value);
      return;
    }

    // Convert copies to number
    if (name === "copies") {
      const n = value === "" ? undefined : Number(value);
      setBook((prev) => ({ ...prev, copies: n }));
      return;
    }

    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let finalImage = (book.image as string) || "";

      // If a local file is selected, upload it first and get the URL
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        // Replace this URL with your actual upload API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          toast.error("Failed to upload image. Please try again.");
          return;
        }

        // typed response
        const data = (await response.json()) as { url?: string };
        if (!data?.url) {
          toast.error("Upload didn't return an image URL.");
          return;
        }
        finalImage = data.url;
      }

      await createBook({ ...book, image: finalImage } as Book).unwrap();

      toast.success("📚 Book added successfully!");
      navigate("/books");
    } catch (err: unknown) {
      // Narrow unknown to something useful
      const message =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      console.error("Create book failed:", err);
      toast.error(`❌ Failed to add the book. ${message}`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20 bg-gradient-to-br from-white/90 to-gray-100 rounded-3xl shadow-2xl border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-8">
        Add a New Book
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Image Preview */}
        <div className="flex flex-col items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-52 h-64 object-cover rounded-xl shadow-lg mb-2 border-2 border-gray-300"
            />
          ) : (
            <div className="w-52 h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-2 shadow-inner border-2 border-gray-200">
              Image Preview
            </div>
          )}
        </div>

        {/* Upload / URL */}
        <div className="flex flex-col md:flex-row md:space-x-4 gap-3 justify-center">
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer w-full md:w-auto"
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Or enter image URL"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full md:w-auto"
          />
        </div>

        {/* Book Details */}
        <input
          name="title"
          placeholder="Title"
          value={book.title || ""}
          onChange={handleChange}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg font-medium"
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={book.author || ""}
          onChange={handleChange}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg font-medium"
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={book.genre || ""}
          onChange={handleChange}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg font-medium"
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn || ""}
          onChange={handleChange}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg font-medium"
        />
        <input
          name="copies"
          type="number"
          placeholder="Copies"
          value={book.copies ?? ""}
          onChange={handleChange}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg font-medium"
          min={0}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Book"}
        </button>
      </form>
    </div>
  );
}
