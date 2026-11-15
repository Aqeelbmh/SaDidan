# GreenVision Portfolio

A modern, responsive portfolio website built with [Next.js](https://nextjs.org/), designed to showcase your projects, achievements, and professional journey. This project is ideal for developers, designers, and professionals who want a beautiful, fast, and customizable online presence.

---

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for rapid, utility-first styling
- **Responsive design** for all devices
- **Modular components**: Hero, About, Projects, Gallery, Timeline, Awards, Publications, Contact, Footer, and Navbar
- **SVG icons** and custom assets
- **Easy deployment** (Vercel-ready)
- **Built-in content editor** at `/admin`, backed by Turso — see [ADMIN_README.md](ADMIN_README.md)

---

## 📁 Folder Structure

```
greenvision-portfolio/
├── public/                # Static assets (SVGs, images, etc.)
├── src/
│   ├── app/               # Next.js app directory (pages, layout, global styles)
│   ├── components/        # Reusable React components
│   │   ├── About/
│   │   ├── Awards/
│   │   ├── Contact/
│   │   ├── Footer.tsx
│   │   ├── Gallery/
│   │   ├── Hero/
│   │   ├── Navbar.tsx
│   │   ├── Projects/
│   │   ├── Publications/
│   │   ├── Timeline/
│   └── lottie/            # (Optional) Lottie animations
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── ...
```

---

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aqeelbmh/SaDidan.git
   cd greenvision-portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view your site.

---

## ✏️ Customization

- Update content in `src/components/` (e.g., `About`, `Projects`, `Gallery`, etc.)
- Edit global styles in `src/app/globals.css`
- Replace images and icons in `public/`
- Update site metadata in `src/app/layout.tsx`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Aqeelbmh/SaDidan/issues) or submit a pull request.

---

## 📄 License

This project is [MIT Licensed](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [LottieFiles](https://lottiefiles.com/) (if using animations)
