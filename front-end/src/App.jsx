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
    const [user, setUser] = useState(null);
    let history = useHistory();

    const [searchTerm, setSearchTerm] = useState(null);

    const getUser = () => {
        axios
            .get(api.apiUrl +api.usersEndpoint+ api.currentUser)
            .then((response) => {
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
        getUser();
    }, []);

    const updateSearchTerm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.search.value.toLowerCase());
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
                            <EditProfile {...props} user={user} updateUser={getUser}/>
                        )}
                    />
                </Switch>
            </main>
        </div>
    );
}

export default App;
