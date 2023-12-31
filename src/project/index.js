import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Nav from './nav';
import Signup from './users/signup';
import GameList from './gamelist';
import Search from './search';
import Deatils from './details';
import UserList from './users/list';
import UserDetails from './users/details';
import Home from './home';
import SignIn from './users/signin';
// import Account from './users/account';
import Creators from './creators';
import TopReviews from './topreviews';

function Project() {

    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        } else {
            setCurrentUser(null);
        }
    }, [location]); 


    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Game It</h1>
                {currentUser ? (
                    <h3>
                        Welcome, <Link to={`/project/users/${currentUser._id}`} style={{ textDecoration: 'underline' }}>{currentUser.username}</Link>
                    </h3>
                ) : (
                    <h3>Welcome, guest</h3>
                )}
            </div>

            <div className='row'>
                <Nav />

                <div className='col-10'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<Signup />} />
                        {/* <Route path="/account" element={<Account />} /> */}
                        <Route path="/search" element={<Search />} />
                        <Route path="/search/:search" element={<Search />} />
                        <Route path="/details/:gameId" element={<Deatils />} />
                        <Route path='/gamelist' element={<GameList />} />
                        <Route path='/users' element={<UserList />} />
                        <Route path='/users/:userId' element={<UserDetails />} />
                        <Route path='/creators' element={<Creators />} />
                        <Route path='/topreviews' element={<TopReviews />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}

export default Project;