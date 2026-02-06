# ShopCart - E-Commerce Shopping Cart Application

A modern, production-ready e-commerce web application built with React 18, Redux Toolkit, TypeScript, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0+-764ABC?style=flat-square&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.0+-646CFF?style=flat-square&logo=vite)

## 🌟 Features

### Core Features

- **Product Catalog** - Browse 194+ products with images, prices, ratings, and descriptions
- **Shopping Cart** - Full cart management with add, update quantity, and remove functionality
- **Product Search** - Real-time search across product titles, descriptions, and brands
- **Advanced Filtering** - Filter by category, price range, and sort options
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Client-Side State** - All operations use Redux state (no redundant API calls)

### Bonus Features

- **LocalStorage Persistence** - Cart survives page refresh
- **Toast Notifications** - Visual feedback for all cart actions
- **Image Gallery** - Multiple product images on detail page
- **Quantity Selector** - Choose quantity before adding to cart
- **Order Summary** - Tax calculation and grand total

## 🛠️ Tech Stack

| Technology      | Purpose             |
| --------------- | ------------------- |
| React 18        | Frontend Framework  |
| Redux Toolkit   | State Management    |
| React Router v6 | Client-Side Routing |
| TypeScript      | Type Safety         |
| Tailwind CSS    | Styling             |
| Vite            | Build Tool          |
| Axios           | HTTP Client         |
| react-hot-toast | Toast Notifications |

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd shopcart

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── main.tsx                    # App entry point with providers
├── App.tsx                     # Root component with routing
├── index.css                   # Global styles & Tailwind imports
├── store/
│   ├── store.ts               # Redux store configuration
│   └── slices/
│       ├── productsSlice.ts   # Products state & async thunk
│       └── cartSlice.ts       # Cart state & actions
├── pages/
│   ├── HomePage.tsx           # Redirects to products
│   ├── ProductsPage.tsx       # Product listing with filters
│   ├── ProductDetailPage.tsx  # Single product view
│   └── CartPage.tsx           # Shopping cart
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Navigation & cart counter
│   │   └── Layout.tsx         # Common layout wrapper
│   ├── products/
│   │   ├── ProductCard.tsx    # Grid item component
│   │   └── ProductDetail.tsx  # Detail view component
│   ├── cart/
│   │   ├── CartItem.tsx       # Cart item row
│   │   └── CartSummary.tsx    # Order totals
│   └── common/
│       ├── LoadingSpinner.tsx # Loading indicator
│       └── ErrorMessage.tsx   # Error display
├── hooks/
│   └── useCart.ts             # Cart operations hook
├── types/
│   └── index.ts               # TypeScript interfaces
└── utils/
    └── formatters.ts          # Price & text utilities
```

## 📡 API Integration

- **Endpoint**: `https://dummyjson.com/products?limit=0`
- **Strategy**: Single fetch on app initialization, stored in Redux
- **Operations**: All filtering, searching, and cart operations are client-side only

## 🎨 Design Decisions

### State Management

- Redux Toolkit for predictable state management
- Typed hooks (`useAppDispatch`, `useAppSelector`) for type safety
- LocalStorage middleware for cart persistence

### Component Architecture

- Functional components with hooks
- Custom `useCart` hook for cart operations
- Separation of container (pages) and presentational (components)

### Styling

- Tailwind CSS utility classes
- Custom component classes (`.btn-primary`, `.card`, `.input-field`)
- CSS custom properties for theming

## 📱 Responsive Breakpoints

| Breakpoint | Grid Columns | Description  |
| ---------- | ------------ | ------------ |
| < 640px    | 1            | Mobile       |
| ≥ 640px    | 2            | Large mobile |
| ≥ 768px    | 3            | Tablet       |
| ≥ 1024px   | 4            | Desktop      |

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

Built with ❤️ using React, Redux, and Tailwind CSS
