# Apex Options

A visually stunning and intuitive web dashboard for designing, visualizing, and managing complex options trading strategies for Interactive Brokers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/ApexOption-20251007-020634)

Apex Options is a sophisticated and visually stunning web interface for managing and automating complex options trading strategies with Interactive Brokers. The application provides a clean, intuitive dashboard to monitor portfolio performance, analyze positions, and construct multi-leg option strategies like Iron Condors, Butterfly Spreads, and Straddles. The core feature is an interactive Strategy Builder that visualizes potential profit and loss in real-time, allowing traders to make informed decisions. Built on Cloudflare's edge network, Apex Options is designed for speed, reliability, and a superior user experience, abstracting away the complexity of programmatic trading into a beautiful and user-friendly interface.

## ✨ Key Features

*   **Intuitive Dashboard:** Get a high-level overview of your portfolio value, daily P&L, and top positions at a glance.
*   **Detailed Position Tracking:** A comprehensive tabular view of all current and past options positions with sorting and filtering.
*   **Interactive Strategy Builder:** Construct complex, multi-leg options strategies with a real-time profit/loss visualization chart.
*   **Visually Stunning UI:** A clean, professional, and data-centric design built with modern UI components and a focus on user experience.
*   **High-Performance Backend:** Powered by Cloudflare Workers and Durable Objects for a fast and reliable experience.

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, React Router, Tailwind CSS
*   **UI Components:** shadcn/ui, Lucide React
*   **State Management:** Zustand
*   **Data Visualization:** Recharts
*   **Forms:** React Hook Form, Zod
*   **Backend:** Hono on Cloudflare Workers
*   **Storage:** Cloudflare Durable Objects

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following tools installed:

*   [Bun](https://bun.sh/) (v1.0 or higher)
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd apex_options_trader
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the development server:**
    The application frontend and the local worker backend will be started concurrently.
    ```bash
    bun dev
    ```
    The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

The project is organized into three main directories:

*   `src/`: Contains the frontend React application code, including pages, components, hooks, and utility functions.
*   `worker/`: Contains the backend Hono application running on a Cloudflare Worker, including API routes and entity definitions for the Durable Object.
*   `shared/`: Contains TypeScript types and mock data shared between the frontend and the backend to ensure type safety.

## 💻 Development

*   **Frontend:** All React components are located in `src/components`, pages in `src/pages`, and global state management with Zustand can be configured as needed.
*   **Backend:** API endpoints are defined in `worker/user-routes.ts` using the Hono framework. Business logic is encapsulated in entities within `worker/entities.ts`, which interact with the global Durable Object for persistence.
*   **Styling:** The project uses Tailwind CSS for styling. UI components are built using `shadcn/ui`. Customize the theme and styles in `tailwind.config.js` and `src/index.css`.

## 部署 (Deployment)

This application is designed to be deployed to the Cloudflare network.

1.  **Build the project:**
    This command bundles the React frontend and the Worker code for production.
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    This command deploys your application using the Wrangler CLI.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/ApexOption-20251007-020634)

## ⚠️ Disclaimer

This is a demo application for illustrative purposes only. It is **not** intended for real trading or financial advice. All data is mocked, and any resemblance to real financial data is coincidental. Do not connect this application to live brokerage accounts or use it to make financial decisions.