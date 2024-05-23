import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';
import UserList from './components/lists/UserList';
import BookingList from './components/lists/BookingList';
import ParcList from './components/lists/ParcList';
import UserForm from './components/forms/UserForm';
import BookingForm from './components/forms/BookingForm';
import ParcForm from './components/forms/ParcForm';
import BookingDetail from './components/BookingDetail';
import ParcDetail from './components/ParcDetail';
import UserDetail from './components/UserDetail';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <nav className="bg-blue-600 text-white p-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Users
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:underline">
                  Bookings
                </Link>
              </li>
              <li>
                <Link to="/parcs" className="hover:underline">
                  Parcs
                </Link>
              </li>
              <li>
                <Link to="/add-user" className="hover:underline">
                  Add User
                </Link>
              </li>
              <li>
                <Link to="/add-booking" className="hover:underline">
                  Add Booking
                </Link>
              </li>
              <li>
                <Link to="/add-parc" className="hover:underline">
                  Add Parc
                </Link>
              </li>
              <li>
                <Link to="/users/1">User 1</Link>
              </li>
              <li>
                <Link to="/parcs/1">Parc 1</Link>
              </li>
              <li>
                <Link to="/bookings/1">Booking 1</Link>
              </li>
            </ul>
          </nav>
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/parcs" element={<ParcList />} />
              <Route path="/add-user" element={<UserForm />} />
              <Route path="/add-booking" element={<BookingForm />} />
              <Route path="/add-parc" element={<ParcForm />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/parcs/:id" element={<ParcDetail />} />
              <Route
                path="/bookings/:id"
                element={<BookingDetail />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
