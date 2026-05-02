# Repository Directory Structure

## Full Tree View

```
cmsc127-aluminate/
├── .git/                          # Git version control
├── README.md                       # Root project README
└── aluminate/                      # Main Next.js application
    ├── AGENTS.md                   # Agent documentation
    ├── CLAUDE.md                   # Claude configuration
    ├── eslint.config.mjs           # ESLint configuration
    ├── next-env.d.ts               # Next.js environment types
    ├── next.config.ts              # Next.js configuration
    ├── package.json                # Node.js dependencies
    ├── postcss.config.mjs          # PostCSS configuration
    ├── README.md                   # Aluminate README
    ├── tsconfig.json               # TypeScript configuration
    │
    ├── app/                        # Next.js App Router directory
    │   ├── globals.css             # Global styles
    │   ├── layout.tsx              # Root layout component
    │   ├── page.tsx                # Home page
    │   │
    │   ├── (auth)/                 # Auth route group
    │   │   ├── login/
    │   │   │   └── page.tsx        # Login page
    │   │   └── signup/
    │   │       └── page.tsx        # Signup page
    │   │
    │   ├── admin/                  # Admin dashboard
    │   │   ├── layout.tsx          # Admin layout
    │   │   ├── page.tsx            # Admin dashboard page
    │   │   └── results/
    │   │       └── page.tsx        # Results page
    │   │
    │   ├── alumni/                 # Alumni section
    │   │   ├── layout.tsx          # Alumni layout
    │   │   ├── page.tsx            # Alumni main page
    │   │   └── alumniTracerForm/
    │   │       └── page.tsx        # Survey form page
    │   │
    │   └── components/             # Reusable components
    │       ├── dashboards/         # Dashboard components
    │       │   └── AlumniDashboard.tsx   # Alumni dashboard
    │       ├── layout/
    │       │   └── sidebar/        # Sidebar navigation
    │       │       ├── AdminSidebar.tsx  # Admin sidebar
    │       │       └── AlumniSidebar.tsx # Alumni sidebar
    │       └── ui/                 # UI components (empty)
    │
    └── public/                     # Static assets
        ├── aluminate logo.png      # Application logo
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        └── window.svg
```

## Directory Summary

| Directory | Purpose |
|-----------|---------|
| `aluminate/` | Main Next.js application |
| `app/` | Next.js App Router pages and layouts |
| `app/(auth)/` | Authentication routes (route group) |
| `app/admin/` | Admin dashboard pages |
| `app/alumni/` | Alumni section pages |
| `app/components/` | Reusable React components |
| `app/components/dashboards/` | Dashboard components (Alumni) |
| `app/components/layout/` | Layout components (sidebar, etc.) |
| `app/components/layout/sidebar/` | Sidebar navigation components |
| `app/components/ui/` | UI component library (empty) |
| `public/` | Static assets (images, SVGs) |

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.ts` | Next.js build configuration |
| `eslint.config.mjs` | Code linting rules |
| `postcss.config.mjs` | CSS processing configuration |
| `next-env.d.ts` | Next.js type definitions |

## Route Structure

```
/                          → app/page.tsx
/login                     → app/(auth)/login/page.tsx
/signup                    → app/(auth)/signup/page.tsx
/admin                     → app/admin/page.tsx
/admin/results             → app/admin/results/page.tsx
/alumni                    → app/alumni/page.tsx
/alumni/alumniTracerForm   → app/alumni/alumniTracerForm/page.tsx
```

---
