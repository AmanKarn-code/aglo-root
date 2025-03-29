import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

const LandingPage = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [isCountingStarted, setIsCountingStarted] = useState(false);
  const counterRef = useRef(null);
  const animateElementsRef = useRef([]);

  // Animation for counting customers
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isCountingStarted) {
        setIsCountingStarted(true);
      }
    }, options);

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isCountingStarted]);

  // Counting animation
  useEffect(() => {
    if (isCountingStarted) {
      const interval = setInterval(() => {
        setCustomerCount((prevCount) => {
          const nextCount = prevCount + 100;
          if (nextCount >= 5000) {
            clearInterval(interval);
            return 5000;
          }
          return nextCount;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isCountingStarted]);

  // Scroll animation for elements
  useEffect(() => {
    const checkIfInView = () => {
      animateElementsRef.current.forEach((element) => {
        if (!element) return;

        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    // Initial check when component mounts
    checkIfInView();

    // Check on scroll
    window.addEventListener("scroll", checkIfInView);

    return () => {
      window.removeEventListener("scroll", checkIfInView);
    };
  }, []);

  // Collect all animate-on-scroll elements after component mounts
  useEffect(() => {
    animateElementsRef.current =
      document.querySelectorAll(".animate-on-scroll");
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="animate-in">Welcome to AlgoRoot</h1>
          <p className="animate-in delay-1">
            The best solution for your business needs
          </p>
          <button className="cta-button animate-in delay-2">
          <Link to="./signup">SignUp</Link>
          </button>
          <button className="cta-button animate-in delay-2">
          <Link to="./login">Login</Link>
          </button>
        </div>
        <div className="hero-image animate-in delay-3">
          <div className="floating-image"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title animate-on-scroll">Our Features</h2>
        <div className="features-container">
          <div className="feature-card animate-on-scroll">
            <div className="feature-icon">🚀</div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast load times and smooth interactions</p>
          </div>
          <div className="feature-card animate-on-scroll delay-1">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Platform</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
          <div className="feature-card animate-on-scroll delay-2">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Fully responsive design for all devices</p>
          </div>
        </div>
      </section>

      {/* Customer Counter Section */}
      <section className="counter-section" ref={counterRef}>
        <div className="counter-container animate-on-scroll">
          <h2 className="section-title">Trusted by Thousands</h2>
          <div className="counter">
            <span className="counter-number">
              {customerCount.toLocaleString()}+
            </span>
            <span className="counter-text">Happy Customers</span>
          </div>
          <p className="counter-description">
            Join thousands of satisfied customers who trust our platform
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title animate-on-scroll">
          What Our Customers Say
        </h2>
        <div className="testimonials-container">
          <div className="testimonial-card animate-on-scroll">
            <p className="testimonial-text">
              "This platform has transformed how we do business. The features
              are incredible!"
            </p>
            <div className="testimonial-author">- Jane Smith, CEO</div>
          </div>
          <div className="testimonial-card animate-on-scroll delay-1">
            <p className="testimonial-text">
              "I can't imagine running my company without these tools. Simply
              amazing."
            </p>
            <div className="testimonial-author">- John Doe, CTO</div>
          </div>
          <div className="testimonial-card animate-on-scroll delay-2">
            <p className="testimonial-text">
              "The best decision we made was switching to this platform last
              year."
            </p>
            <div className="testimonial-author">- Sarah Johnson, COO</div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section">
        <div className="cta-container animate-on-scroll">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of businesses that trust our platform</p>
          <button className="cta-button">
            <Link to="./signup">SignUp</Link>
          </button>
          <button className="cta-button">
            <Link to="./login">Login</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
