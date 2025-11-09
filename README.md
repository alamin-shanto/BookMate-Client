# 📚 BookMate — Frontend

BookMate is a modern Library Management System web application that enables users to browse, manage, and borrow books seamlessly.
Built with React, TypeScript, and Redux Toolkit Query, it offers a smooth and responsive user experience with real-time data handling and clean UI design.

--- 

## 🚀 Features

- 📖 Book Management – View, search, and explore books with details like title, author, and description.
- 🔍 Smart Search & Pagination – Easily find books with fast filtering and paginated results.
- 💾 Borrow Tracking – Display and manage user borrow summaries with clear return statuses.
- ⚙️ Real-time Data Fetching – Powered by RTK Query for efficient API communication and caching.
- 🎨 Elegant UI – Responsive layout built with Tailwind CSS and modern design principles.
- 💡 Error & Loading States – Polished UI feedback for loading, errors, and empty results.
- 🧩 Modular Architecture – Clean component structure, scalable for future features.

--- 

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (with TypeScript) |
| **State Management** | Redux Toolkit + RTK Query |
| **UI Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Package Management** | npm |
| **API Layer** | RESTful API integrated with backend (Node.js + Express) |

--- 

## 🧱 Project Structure
```
┣ 📂src
┃ ┣ 📂assets
┃ ┣ 📂components
┃ ┃ ┣ 📜Banner.tsx
┃ ┃ ┣ 📜Footer.tsx
┃ ┃ ┣ 📜Layout.tsx
┃ ┃ ┣ 📜LibraryStats.tsx
┃ ┃ ┣ 📜Navbar.tsx
┃ ┃ ┣ 📜RecentBooks.tsx
┃ ┃ ┗ 📜TopBorrowedBooks.tsx
┃ ┣ 📂features
┃ ┃ ┣ 📂api
┃ ┃ ┃ ┗ 📜libraryApi.ts
┃ ┃ ┗ 📜type.ts
┃ ┣ 📂pages
┃ ┃ ┣ 📜BookDetails.tsx
┃ ┃ ┣ 📜BooksList.tsx
┃ ┃ ┣ 📜BorrowBook.tsx
┃ ┃ ┣ 📜BorrowSummary.tsx
┃ ┃ ┣ 📜CreateBook.tsx
┃ ┃ ┣ 📜EditBook.tsx
┃ ┃ ┣ 📜Home.tsx
┃ ┃ ┗ 📜NotFound.tsx
┃ ┣ 📜App.css
┃ ┣ 📜App.tsx
┃ ┣ 📜index.css
┃ ┣ 📜index.tsx
┃ ┣ 📜main.tsx
┃ ┗ 📜store.ts
┣ 📜.gitignore
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜package.json
┣ 📜README.md
┣ 📜tsconfig.app.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┗ 📜vite.config.ts
```
--- 

## ⚡ Getting Started 

### 1️⃣ Clone the Repository
```
git clone https://github.com/your-username/bookmate-frontend.git
cd bookmate-frontend
```

### 2️⃣ Install Dependencies
```
npm install
```
# or
```
yarn install
```

### 3️⃣ Create Environment File

Create a .env file in the root directory:
```
VITE_API_URL=https://your-backend-api-url.com
```

### 4️⃣ Run the Development Server
```
npm run dev
```

Then open 
```
http://localhost:5173
```
 to view it in your browser.

 --- 

### 🧩 API Integration

The frontend communicates with the backend via REST APIs, defined in features/api/libraryApi.ts.
Here’s an example of how data fetching works with RTK Query:
```
const { data, isLoading, isError } = useGetBooksQuery({ page: 1, limit: 20 });
```
This automatically handles caching, refetching, and background updates — keeping your UI synced with server data efficiently.

--- 

### 🧠 Key Components
Component	Purpose
- **BooksList**	Displays all available books with delete and detail options.
- **BookDetails**	Shows book-specific information and borrow actions.
- **BorrowSummary**	Displays borrowing history and current user borrow status.
- **Loader & Error States**	Handles UX feedback for async operations.

--- 

### 🧰 Scripts
Command	Description
- **npm run dev**	Start development server
- **npm run build**	Build the app for production
- **npm run preview**	Preview the production build
- **npm run lint**	Run ESLint checks

--- 

### 🧾 Contribution Guide

- Fork the repository
- Create a feature branch: git checkout -b feature/awesome-feature
- Commit your changes: git commit -m "Add awesome feature"
- Push to your branch: git push origin feature/awesome-feature
- Submit a Pull Request 🎉

--- 

### 🧑‍💻 Author

Mohammad Al Amin — Web Developer | Programmer | Tech Enthusiast
📫 [LinkedIn](https://www.linkedin.com/in/mash02/)
 | [GitHub](https://github.com/alamin-shanto)

--- 

### 🌟 Acknowledgements

- React
- Redux Toolkit
- Tailwind CSS
- Vite

### 📜 License

This project is licensed under the MIT License — feel free to use, modify, and distribute it.
