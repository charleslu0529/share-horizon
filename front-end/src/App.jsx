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

    useEffect(() => {
        axios
            .get(api.apiUrl + api.usersEndpoint + api.currentUser)
            .then(response=>{
                setUser(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error when retrieving current user on mount",
                    error
                );
            });
    }, []);

    return (
        <div className="App">
            <Header user={user}/>
            <main>
                <Switch>
                    <Route path="/" exact render={(props) => <Browse {...props} />} />
                    <Route path="/login" exact render={(props) => <Login {...props} />} />
                    <Route path="/sign-up" exact render={(props) => <SignUp {...props} />} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
