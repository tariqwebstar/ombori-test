import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./_components";
import { User } from "./_interfaces";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;
const PER_PAGE = 10;
const LOADER_TIMEOUT = 3000;

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, LOADER_TIMEOUT);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users?per_page=${PER_PAGE}&page=${page}`
        );
        const newUsers: User[] = response.data.data;

        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setHasMore(newUsers.length > 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!loading && hasMore) {
      fetchUsers();
    }
  }, [page, loading, hasMore]);

  return (
    <div className="container">
      <div className="header">
        <h4>Users</h4>
      </div>
      {loading && <Loader />}
      <InfiniteScroll
        dataLength={users.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={`Loading..`}
      >
        <ul className="user-list">
          {users.map((user) => (
            <li className="user" key={user.id}>
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <div className="user-info">
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      {!hasMore && <p>No more users.</p>}
    </div>
  );
};

export default App;
