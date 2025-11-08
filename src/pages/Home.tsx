import Banner from "../components/Banner";
import LibraryStats from "../components/LibraryStats";
import RecentBooks from "../components/RecentBooks";
import TopBorrowedBooks from "../components/TopBorrowedBooks";

const Home = () => {
  return (
    <div>
      <Banner />
      <RecentBooks />
      <TopBorrowedBooks />
      <LibraryStats />
    </div>
  );
};

export default Home;
