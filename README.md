# 🛍️ Shoply

A multi-category e-commerce store built with Next.js, showcasing modern data-fetching patterns and clean state management. Built as a portfolio capstone project to demonstrate readiness for full-stack development.

<!-- Add a screenshot or GIF of the app here -->
<!-- ![Shoply Screenshot](./screenshot.png) -->

## 🚀 Live Demo

[View Live Demo](#) <!-- add your deployed link -->

## ✨ Features

- Multi-category product browsing (electronics, fashion, groceries, and more)
- Product search and filtering
- Cart and wishlist management using Context API
- Server-side data fetching via Next.js Server Components
- Responsive design across mobile, tablet, and desktop
- Product data sourced from the [DummyJSON API](https://dummyjson.com/)

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Styling:** Tailwind CSS
- **State Management:** Context API (cart & wishlist)
- **Icons:** lucide-react
- **Data Source:** DummyJSON API

## 📦 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Jawairia-Mazhar/shoply.git
cd shoply
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
shoply/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components (ProductCard, Navbar, etc.)
├── context/             # Cart and wishlist Context providers
├── lib/                # API helper functions
└── public/              # Static assets
```

## 🎯 What I Learned

- Working with Next.js Server Components for efficient data fetching
- Managing global state (cart/wishlist) without external libraries using Context API
- Structuring a scalable multi-page e-commerce flow
- Debugging real-world UI logic issues (e.g. conditional rendering bugs)

## 📌 Roadmap

- [ ] Add user authentication
- [ ] Integrate a real payment gateway
- [ ] Add order history and checkout flow

## 📫 Contact

Built by [Jawairia Mazhar](https://github.com/Jawairia-Mazhar) — [LinkedIn](https://linkedin.com/in/jawairiamazhar21)
