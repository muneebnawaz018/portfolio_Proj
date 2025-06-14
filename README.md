# 🧑‍💻 Portfolio Project

A modern, responsive portfolio website showcasing skills and projects as a Full Stack Developer. Built with cutting-edge technologies including Next.js 15, TypeScript, Tailwind CSS, and Framer Motion for smooth animations. Features a clean design with dark/light theme support, interactive contact form, and optimized performance.

🔗 **Live Portfolio**: [muneeb-nawaz-portfolio.netlify.app](https://muneeb-nawaz-portfolio.netlify.app)

### ⚡ Key Technologies

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **EmailJS** for contact form

---

## � Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js**: Version 22 or higher (required)
- **pnpm**: Package manager (npm didn't work properly for this project)

### Installing Node.js v22

If you don't have Node.js v22, you can install it using:

- Download from [nodejs.org](https://nodejs.org/)
- Or use a version manager like `nvm`:
  ```bash
  nvm install 22
  nvm use 22
  ```

### Installing pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

---

## �🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio_Proj
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📜 Available Scripts

This project includes several scripts that you can run with pnpm:

### `pnpm dev`

Starts the development server on [http://localhost:3000](http://localhost:3000)

- Hot reload enabled
- Automatic compilation of TypeScript and CSS
- Best for development and testing

### `pnpm build`

Creates an optimized production build

- Compiles and bundles all files
- Optimizes assets for best performance
- Generates static files in `.next` folder
- Required before deployment

### `pnpm start`

Starts the production server

- Serves the optimized build created by `pnpm build`
- Must run `pnpm build` first
- Used for production deployment

### `pnpm lint`

Runs ESLint to check code quality

- Identifies potential errors and code style issues
- Follows Next.js recommended linting rules
- Helps maintain code consistency

---

## 🏗️ Project Structure

```
portfolio_Proj/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About section
│   ├── projects.tsx      # Projects showcase
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── package.json          # Project dependencies and scripts
```

---

## 🔧 Built With

This portfolio is built using modern web technologies:

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Motion library for React
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
- **Email**: [EmailJS](https://www.emailjs.com/) - Contact form integration
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Deployment**: [Netlify](https://www.netlify.com/) - Fast and reliable hosting

---

## 🚀 Deployment

### Using Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `pnpm build`
4. Set publish directory: `.next`
5. Deploy!

### Using Vercel

1. Install Vercel CLI: `pnpm add -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Manual Deployment

1. Build the project: `pnpm build`
2. Upload the `.next` folder to your hosting provider
3. Ensure Node.js v22+ is available on the server

---

## � Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run linting: `pnpm lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: `pnpm install` fails

- **Solution**: Make sure you're using Node.js v22+ and have pnpm installed globally

**Issue**: `npm install` doesn't work

- **Solution**: This project requires pnpm. Use `pnpm install` instead

**Issue**: Build fails with TypeScript errors

- **Solution**: Run `pnpm lint` to check for type errors and fix them

**Issue**: Styles not loading properly

- **Solution**: Make sure Tailwind CSS is properly configured and run `pnpm dev` again

---

## 📬 Contact

Feel free to connect or collaborate!

- **Email**: muneebnawaz2018@gmail.com
- **LinkedIn**: [linkedin.com/in/muneeb-nawaz-a6272419b](https://www.linkedin.com/in/muneeb-nawaz-a6272419b/)
- **GitHub**: [github.com/MnbNwz](https://github.com/MnbNwz)

---

Crafted with passion, purpose, and clean code ✨
