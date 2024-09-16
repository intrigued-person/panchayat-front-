import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button, Alert, Nav } from "react-bootstrap";
import Topnav from "./Topnav";
import { Link } from "react-router-dom";
import "./home.css";

const HomePage = () => {
    const testimonials = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Martin Escobar",
            title: "Founder of Meta",
            quote: "Innovative thinking and dedication to excellence are key to transforming the future. Our success is built on a foundation of hard work and visionary leadership.",
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Angela Stian",
            title: "Product Designer",
            quote: "Design is not just about creating beautiful things; it's about solving problems and enhancing user experiences. Every project is an opportunity to make a meaningful impact.",
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Karim Ahmed",
            title: "DevOps Engineer",
            quote: "In the world of technology, adaptability and continuous improvement are essential. Embracing new challenges and optimizing processes drive success and efficiency.",
        },
    ];

    const [notificationVisible, setNotificationVisible] = useState(false);
    const [pdfLink, setPdfLink] = useState("");

    useEffect(() => {
        // Simulate a notification appearing after 3 seconds
        const timer = setTimeout(() => {
            setPdfLink("/rank-list.pdf"); // Adjust the link as needed
            setNotificationVisible(true);
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Topnav />

            {/* Carousel */}
            <Carousel className="p-3 mt-2">
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://wallpapercave.com/wp/wp2140467.jpg"
                        alt="Campus"
                    />
                    <Carousel.Caption>
                        <h3>Campus</h3>
                        <p>Good and clean Campus</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://wallpaperaccess.com/full/5487905.jpg"
                        alt="Library"
                    />
                    <Carousel.Caption>
                        <h3>Library</h3>
                        <p>Nice place to learn</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Notification Alert */}
            {/* {notificationVisible && (
                <Alert variant="success" onClose={() => setNotificationVisible(false)} dismissible>
                    <Alert.Heading>Rank List Generated</Alert.Heading>
                    <p>Rank list generated. Kindly download it.</p>
                    <Button variant="link" href={pdfLink} download>
                        Download Now
                    </Button>
                </Alert>
            )} */}

            {/* Announcements */}
            <Container className="mt-5">
                <h2 className="text-center mb-4">Announcements</h2>
                <Row>
                    <Col md={6}>
                        <Card className="announcement-card">
                            <Card.Body>
                                <Card.Title>Admission Started</Card.Title>
                                <Card.Text>
                                    2024-2025 admission started.{" "}
                                    <a href="/instruction" className="announcement-link">
                                        Register and Apply your Application!!!
                                    </a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="announcement-card">
                            <Card.Body>
                                <Card.Title>Result Announced</Card.Title>
                                <Card.Text>
                                    2023-2024 semester results have been announced.{" "}
                                    <a href="#" className="announcement-link">
                                        Check your results here
                                    </a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Course Details */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Course Details</h2>
                <Row>
                    <Col md={6}>
                        <Card className="course-card">
                            <Card.Body>
                                <Card.Title>UG Courses</Card.Title>
                                <Card.Text>
                                    Course description goes here. Add more course details as needed.
                                </Card.Text>
                                <Button variant="primary">View More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="course-card">
                            <Card.Body>
                                <Card.Title>PG Courses</Card.Title>
                                <Card.Text>
                                    Another course description goes here. You can add more courses below.
                                </Card.Text>
                                <Button variant="primary">View More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Testimonials */}
            <section className="py-5 bg-light">
                <Container className="text-center">
                    <h3 className="text-dark font-weight-bold pb-4">Alumni</h3>
                    <Row>
                        <Col>
                            <ul className="list-unstyled">
                                {testimonials.map((testimonial, index) => (
                                    <li className="testimonial-item" key={index}>
                                        <figure>
                                            <blockquote>
                                                <p className="text-dark font-weight-bold">
                                                    “{testimonial.quote}“
                                                </p>
                                            </blockquote>
                                            <div className="mt-3">
                                                <img
                                                    src={testimonial.avatar}
                                                    className="testimonial-avatar"
                                                    alt={testimonial.name}
                                                />
                                                <div className="mt-2">
                                                    <span className="d-block font-weight-bold">{testimonial.name}</span>
                                                    <span className="d-block text-muted">{testimonial.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-light py-4">
                <Container>
                    <Row className="align-items-center">
                        <Col md={4} className="mb-3 mb-md-0">
                            <h5>University of Houston</h5>
                            <p>Houston, Texas 77204</p>
                            <p>(713) 743-2255</p>
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0 text-center">
                            <h5>About Us</h5>
                            <p>
                                Follow us on our social media platforms including Facebook, Instagram, YouTube, Twitter, and Google+ University of Houston.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <h5>Quick Links</h5>
                            <Nav className="justify-content-center">
                                <Nav.Link as={Link} to="/about" className="footer-link">About Us</Nav.Link>
                                <Nav.Link as={Link} to="/course" className="footer-link">Courses</Nav.Link>
                                <Nav.Link as={Link} to="/stafflogin" className="footer-link">Staff Login</Nav.Link>
                                <Nav.Link as={Link} to="/studentlogin" className="footer-link">Student Login</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;
