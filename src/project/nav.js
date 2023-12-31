import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';



function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateLoginStatus = () => {
            const currentUser = localStorage.getItem('currentUser');
            setIsLoggedIn(!!currentUser);
        };
        window.addEventListener('loginStatusChanged', updateLoginStatus);
        updateLoginStatus();
        return () => {
            window.removeEventListener('loginStatusChanged', updateLoginStatus);
        };
    }, []);

    const handleReviewClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            navigate('/project/signin');
        }
    };

    return (
        <>
            <div className='nav-container col-2 d-none d-lg-block'>
                <div className="list-group">
                    <Link to="/project" className="list-group-item list-group-item-action">
                        Home
                    </Link>
                    {!isLoggedIn && (
                        <>
                            <Link to="/project/signin" className="list-group-item list-group-item-action">
                                Sign In
                            </Link>
                            <Link to="/project/signup" className="list-group-item list-group-item-action">
                                Sign up
                            </Link>
                        </>
                    )}
                    <Link to="/project/gamelist" className="list-group-item list-group-item-action">
                        All Games
                    </Link>
                    <Link to="/project/creators" className="list-group-item list-group-item-action">
                        Creators
                    </Link>
                    <Link to={isLoggedIn ? "/project/topreviews" : "/project/signin"}
                        className="list-group-item list-group-item-action"
                        onClick={handleReviewClick}>
                        Reviews
                    </Link>
                </div>
            </div>

            <div className="dropdown-nav-menu d-lg-none">
                <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: 'rgb(11, 142, 98)', color: 'white', borderColor: 'rgb(11, 142, 98)' }}>
                        Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/project">Home</Dropdown.Item>
                        {!isLoggedIn && (
                            <>
                                <Dropdown.Item as={Link} to="/project/signin">Sign In</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/project/signup">Sign up</Dropdown.Item>
                            </>
                        )}
                        <Dropdown.Item as={Link} to="/project/gamelist">All Games</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/project/creators">Creators</Dropdown.Item>
                        <Dropdown.Item as={Link} to={isLoggedIn ? "/project/topreviews" : "/project/signin"}
                            onClick={handleReviewClick}>
                            Reviews
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Nav;

