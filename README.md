# Viatours: A Full-Stack E-Commerce Application for Tour Booking

Viatours is a modern, feature-rich e-commerce platform built for booking tour tickets, designed with U.S. customers in mind. It combines cutting-edge technologies like **Next.js**, **TypeScript**, and **MongoDB** to deliver a seamless user experience. This portfolio project by **Nikolas Tuz** showcases expertise in full-stack development, focusing on scalability, performance, and user-centric design.

---

## Features

### Core Functionalities
- **Tour Booking**: Browse, filter, and book tours with advanced options for personalization.
- **User Profiles**: Manage account details, view order history, and track purchases.
- **Article Browsing**: Explore, save, and comment on tour-related articles.
- **Secure Payment**: Integrated with **Stripe** for a seamless checkout experience.
- **AI Chatbot Assistance**: A RAG-based chatbot built with **FastAPI** and **PyTorch**, providing instant answers about tours and application functionalities.

### Key Highlights
- **Authentication & Authorization**: Secure login, registration, two-factor authentication, and hashed user data.
- **Tour Management**:
  - Detailed tour information with pricing, itineraries, reviews, and ratings.
  - Flexible ticketing options (Adult, Youth, Children).
  - Additional services per booking or per person.
- **Order Tracking**:
  - Authenticated and unauthenticated order tracking options.
  - Status updates (e.g., Booked, Scheduled, Ongoing).
- **Dynamic Loading**: Skeleton loaders ensure a smooth user experience.
- **Email Notifications**:
  - Order confirmations.
  - Password resets.
  - Two-factor authentication tokens.

---

## Technologies Used

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React-based framework).
- **Styling**: Custom CSS, Material-UI for animations.

### Backend
- **Language**: TypeScript.
- **Database**: MongoDB with dynamic schemas for tours, users, and articles.
- **AI Agent**: Python-based chatbot using PyTorch, integrated via FastAPI.

### Deployment
- **Containerization**: Dockerized application and chatbot service.
- **Version Control**: Managed via GitHub with over 800 commits.
- **API Integration**: RESTful API architecture for seamless client-server communication.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v16 or later).
- **MongoDB**: Set up a MongoDB database (local or cloud-based).
- **Stripe Account**: Create a Stripe account and obtain API keys.
- **Docker**: Install Docker for containerization.

## Project Structure

- **`pages/`**: Frontend routes powered by Next.js.
- **`components/`**: Reusable React components.
- **`lib/`**: Utility functions (e.g., API handlers, authentication).
- **`styles/`**: CSS and theme files.
- **`backend/`**: Python FastAPI server for chatbot integration.

---

## AI Chatbot Features

- **RAG-Based Functionality**:
  - Retrieves relevant tour data and answers user queries.
  - Stores conversation history for context-aware responses.
- **Integration**:
  - Communicates with the Next.js frontend through RESTful APIs.

## About the Developer

This application was written by **Nikolas Tuz**, a software engineer from Ukraine. It represents my **first serious application** and serves as the foundation for my **master's qualification work**. 

While most of the **design for Viatours** was created by me, 3 out of the 20 pages were picked from Figma templates. I do not own the rights to those specific pages, but all remaining designs are my own. This project reflects my journey in learning and implementing full-stack development concepts, and I’m proud to showcase it as a demonstration of my skills. This app is not about commercial use at all.
