import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// const [token, setToken] = useState(null);

// USER LOGIN -  Making the api call for the user login endpoint
/**
* Making the api call for the user login endpoint
* @param {any} userDetails - User details for login.
* @returns {Observable<any>} - Observable for the API response.
*/

export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://movieapi-production-3a3c.up.railway.app/login", {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true
            },

            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };


    return (
        <Form onSubmit={handleSubmit} className="bg-light p-3">
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                // placeholder="Enter your username"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                // placeholder="Enter your password"
                />
            </Form.Group>
            <div className="pt-3">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

