import React from "react";
import { Navbar, Container, Nav, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut, query, handleSearch, movies }) => {
  return (
    <Navbar bg="light" expand="lg" className="bg-light m-3">
      <Container className="bg-white m-1">
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
          {user && (
            <div className="d-flex align-items-center">
              <Form inline>
                <div className="search-bar p-2">
                  <Form.Control
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </Form>
              <div className="link-color ml-3">
                <Button variant="outline-secondary" type="submit" className="submit-button p-2 bg-primary text-white border-info" size="sm" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};




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

{/* </Navbar.Collapse>
      </Container>
    </Navbar> */}



{/* // to={`/profile/${user.Username}`}> */ }






