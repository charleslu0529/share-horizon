import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Browse from "./components/Browse/Browse";
import Header from "./components/Header/Header";
import axios from "axios";
import api from "./utils/api-details";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/UserProfile/UserProfile";
import Upload from "./components/Upload/Upload";
import Design from "./components/Design/Design";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
    const [user, setUser] = useState({
        _id: "6092090a4613a059fc8c1787",
        name: "Charles",
        username: "test@test.com",
        email: "test@test.com",
        image: "20200313_202417_001.jpg",
    });
    let history = useHistory();

    const [searchTerm, setSearchTerm] = useState(null);

    const getUser = () => {
        axios
            .get(api.apiUrl + api.usersEndpoint + api.currentUser)
            .then((response) => {
                console.log("Getting user", response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error when retrieving current user on mount",
                    error
                );
            });
    };

    useEffect(() => {
        // getUser();
    }, []);

    // useEffect(()=>{
    //     console.log(user);
    // });

    const updateSearchTerm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.search.value);
        if (history.location.pathname !== "/") {
            history.push("/");
        }
    };

    return (
        <div className="App">
            <Header
                user={user}
                updateUser={getUser}
                handleFormSubmit={updateSearchTerm}
            />
            <main>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <Browse
                                {...props}
                                user={user}
                                searchTerm={searchTerm}
                            />
                        )}
                    />
                    <Route
                        path="/login"
                        exact
                        render={(props) => (
                            <Login
                                {...props}
                                setUser={setUser}
                                updateUser={getUser}
                            />
                        )}
                    />
                    <Route
                        path="/sign-up"
                        exact
                        render={(props) => <SignUp {...props} />}
                    />
                    <Route
                        path="/profile/:userID"
                        exact
                        render={(props) => (
                            <UserProfile {...props} user={user} />
                        )}
                    />
                    <Route
                        path="/upload"
                        exact
                        render={(props) => <Upload {...props} user={user} />}
                    />
                    <Route
                        path="/design/:id"
                        exact
                        render={(props) => <Design {...props} user={user} />}
                    />
                    <Route
                        path="/edit/profile"
                        exact
                        render={(props) => (
                            <EditProfile {...props} user={user} />
                        )}
                    />
                </Switch>
            </main>
        </div>
    );
}

export default App;
