# 🌸 Bloomify | Artisanal Flower Shop & Sanity CMS

A modern, high-performance E-Commerce Flower Shop web application built with **Astro**, **TypeScript**, **Vanilla CSS**, and **Sanity v3 Headless CMS**.

---

## 📁 Repository Structure

```text
flower-shop/
├── frontend/       # Astro Web Application (Storefront)
│   ├── src/
│   │   ├── components/   # Reusable UI Components
│   │   ├── layouts/      # Base Page Layouts
│   │   ├── lib/          # Sanity Client & GROQ Queries
│   │   ├── pages/        # Astro Page Routes
│   │   └── styles/       # CSS Stylesheets
│   └── package.json
│
├── studio/         # Sanity v3 Studio (CMS Dashboard)
│   ├── schemaTypes/  # Sanity Content Schemas (Flowers, Hero, Categories, etc.)
│   ├── sanity.config.ts
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

Install dependencies for both the `frontend` and `studio`:

```bash
# Frontend
cd frontend
npm install

# Sanity Studio
cd ../studio
npm install
```

---

### 2. Environment Setup

Copy `.env.example` in `frontend/` to `.env`:

```bash
cp frontend/.env.example frontend/.env
```

---

### 3. Running Locally

Start both servers in separate terminal windows:

#### Terminal 1: Run Frontend (Storefront)
```bash
cd frontend
npm run dev
```
*(Storefront running at `http://localhost:4321`)*

#### Terminal 2: Run Sanity Studio (CMS)
```bash
cd studio
npm run dev
```
*(Sanity Studio running at `http://localhost:3333`)*

---

## 🛠️ Built With

- **Storefront**: [Astro 5](https://astro.build/)
- **CMS**: [Sanity v3 Studio](https://www.sanity.io/)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom Design System)
