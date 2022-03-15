# Setup

## Referents

- [ReactJS](https://reactjs.org/)
- [NextJS Basic Setup](https://nextjs.org/learn/basics/create-nextjs-app)
- [TailwindCSS](https://tailwindcss.com/)

https://pankod.github.io/next-boilerplate/
https://unlyed.github.io/next-right-now/

## Create a Next.js App

```bash
npx create-next-app
# or
yarn create next-app
```

## Setup base

Create jsconfig.json with content

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", "out"]
}
```

Create next.config.js with content

```js
module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['@'] = __dirname;

    return config
  },
}
```

Move `/styles` folder to `/assets` folder

Update `/pages/_app.js`

```js
import '@/assets/styles/globals.scss'
```

## Built-In CSS Support

Install libs

```bash
yarn add -D scss tailwindcss postcss-preset-env postcss-flexbugs-fixes
```

Then write the following for postcss.config.js:

```js
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
}
```

Recommend `removing unused CSS` by specifying the `purge` option on tailwind.config.js:

```js
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {},
  plugins: [],
}
```

Update `/assets/styles/globals.css` to `/assets/styles/globals.scss` with conent

```css
@tailwind base;

/* Write your own custom base styles here */

/* Start purging... */
@tailwind components;
/* Stop purging. */

/* Write your own custom component styles here */
.btn-blue {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

/* Start purging... */
@tailwind utilities;
/* Stop purging. */

/* Your own custom utilities */
```

## Folder structure

.
├── assets
│   ├── styles
│   │   └── globals.scss
│   └── images
├── components
│   ├── common
│   └── partials
├── layouts
│   ├── default.js
│   └── error.js
├── pages
│   ├── _app.js
│   ├── _document.js
│   ├── _error.js
│   ├── 404.js
│   └── index.js
├── public
├── .env
├── .env.development
├── .env.production
├── jsconfig.js
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md

## Conventions
