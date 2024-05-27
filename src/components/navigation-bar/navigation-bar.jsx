import React from "react";
import { Navbar, Container, Nav, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Myflix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile</Nav.Link>
                {/* <Link to={`/users/${encodeURIComponent(user.Username)}`}><Button variant="link">Open</Button> */}
                <Nav.Link onClick={onLoggedOut}>
                  Logout</Nav.Link>

              </>
            )}
          </Nav>
          {/* <Routes>
            <Route
              path="/"
              element={
                <Form inline="true">
                  <Row>
                    <Col xs="auto">
                      <SearchBar
                        handleSearch={handleSearch}
                        query={query}
                        movies={movies} />
                    </Col>
                  </Row>
                </Form>
              }
            />
          </Routes> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

{/* // to={`/profile/${user.Username}`}> */ }