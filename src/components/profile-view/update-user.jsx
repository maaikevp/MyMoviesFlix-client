import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

// import PropTypes from "prop-types";

/**
   * Making the api call for the Edit User endpoint.
   * @param {any} userDetails - User details for updating user information.
   * @returns {Observable<any>} - Observable for the API response.
   */
export const UpdateUser = ({ formData, handleUpdate, handleSubmit }) => {
    return (
        <Row>
            <Form onSubmit={handleSubmit} className="bg-light p-4">
                <br />
                <h4> Would you like to update your profile information? </h4>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        minLength={5}
                        value={formData.Username}
                        onChange={(e) => handleUpdate(e)}
                    // required
                    />
                    <br />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label> Date of Birth: </Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.Birthday}
                        onChange={(e) => handleUpdate(e)}
                    // required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formEmail">
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.Email}
                        onChange={(e) => handleUpdate(e)}
                    // required
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:
                        <p>Please enter your old password or choose a new one.
                            Your new password must be at least 8 characters long.</p>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        minLength={8}
                        value={formData.Password}
                        onChange={(e) => handleUpdate(e)}
                    // required
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    {" "}
                    Submit changes{" "}
                </Button>

            </Form>
            <br />
        </Row>

    );

};

// UpdateUser.propTypes = {
//     formData: PropTypes.object.isRequired,
//     handleUpdate: PropTypes.func.isRequired,
//     handleSubmit: PropTypes.func.isRequired,
//  handleDeleteAccount: PropTypes.func.isRequired
// };