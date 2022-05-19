import * as React from 'react';
import './style.css';
import JsonData from './MOCK_DATA.json';

export const RenderData = ({ data }) => {
  return (
    <>
      {data.map((user, key) => (
        <div className="user" key={key}>
          <h3>{user.first_name}</h3>
          <h3>{user.last_name}</h3>
          <h3>{user.email}</h3>
        </div>
      ))}
    </>
  );
};

export default function App() {
  const [users, setUsers] = React.useState(JsonData.slice(0, 100));
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const [pageNumberLimit, setPageNumberLimit] = React.useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = React.useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = React.useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pages.push(i);
  }
  console.log(pages);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (e) => {
    console.log(e.target.id);
    setCurrentPage(Number(e.target.id));
  };

  const RenderPageNumbers = pages.map((num) => {
    if (num <= maxPageNumberLimit && num > minPageNumberLimit) {
      return (
        <li
          className={currentPage === num ? 'active' : null}
          key={num}
          id={num}
          onClick={handleClick}
        >
          {num}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextButton = (e) => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <div>
      <h2>Custom Pagination using ReactJs</h2>
      <RenderData data={currentItems} />
      <ul className="pageNumbers">
        <li>
          <button onClick={}>Prev</button>
        </li>
        {RenderPageNumbers}
        <li>
          <button onClick={handleNextButton}>Next</button>
        </li>
      </ul>
    </div>
  );
}
