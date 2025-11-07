import Banner from "../components/Banner";
import RecentBooks from "../components/RecentBooks";
import TopBorrowedBooks from "../components/TopBorrowedBooks";

const Home = () => {
  return (
    <div>
      <Banner />
      <RecentBooks />
      <TopBorrowedBooks />
    </div>
  );
};

export default Home;
