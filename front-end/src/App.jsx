import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Browse from "./components/Browse/Browse";
import Header from "./components/Header/Header";
import axios from "axios";
import api from "./utils/api-details";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
    const [user, setUser] = useState(null);

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
        getUser();
    },[]);

    // useEffect(()=>{
    //     console.log(user);
    // });

    return (
        <div className="App">
            <Header user={user} updateUser={getUser} />
            <main>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => <Browse {...props} />}
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
                </Switch>
            </main>
        </div>
    );
}

export default App;
