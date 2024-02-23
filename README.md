# Yksilöprojekti - "Lepo" app

This is a HyTe project where I aim to build an app that works as a diary where users can input about their mental state. The idea is that the app recommend mind training techniques to the users based on their inputs.

## Folder structure

Using ChatGPT, I have designed the following structure for the app:

FULL PROJECT:

Lepo/
│
├── client/                  # Frontend
│   ├── (same as before)     # See below
│
├── back/                    # Backend
│   ├── (as described below)
│
├── README.md                # General project documentation
└── .gitignore               # Global ignore file (should cover both front and back)



FRONT:

Lepo/
│
├── client/                      # Frontend
│   ├── public/                  # Public assets and static files
│   │   ├── assets/              # Images, fonts, and other assets
│   │   │   └── images/          # Store images here
│   │   ├── favicon.ico          # Favicon
│   │   └── index.html           # HTML template
│   │
│   ├── src/                     # Source files
│   │   ├── assets/              # Images, fonts, etc. (if not in public)
│   │   ├── components/          # UI components
│   │   │   └── Counter.js       # Example component (previously counter.js)
│   │   ├── pages/               # Page components
│   │   ├── services/            # Services for API calls
│   │   ├── utils/               # Utility functions
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── main.js              # If additional entry is needed (else, can be merged with index.js)
│   │
│   ├── styles/                  # CSS/SASS/LESS files
│   │   └── main.css             # Main stylesheet (previously style.css)
│   │
│   ├── package.json             # Frontend dependencies and scripts
│   ├── package-lock.json        # Locked versions of dependencies
│   └── .gitignore               # Files and folders to ignore in version control
│
└── ...

BACK:

back/
│
├── src/                     # Source code
│   ├── controllers/         # Request managers
│   ├── middlewares/         # Middleware functions
│   ├── models/              # Database models
│   ├── routes/              # Route definitions
│   ├── services/            # Business logic services
│   ├── utils/               # Utility functions
│   └── index.js             # Entry point for the backend
│
├── db/                      # Database-related files
│   ├── migrations/          # Database migration files
│   └── seeds/               # Seed data for the database
│
├── test/                    # Test scripts
│
├── public/                  # Static files to be served by the backend
│   ├── index.html           # Main HTML file (if needed)
│   └── sivu.html            # Other HTML files (if needed)
│
├── .env                     # Environment variables
├── .env.sample              # Sample environment config
├── .gitignore               # Files to be ignored by version control
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Locked versions of dependencies
├── README.md                # Project documentation
├── .eslintrc.js             # ESLint configuration
├── .prettierrc.js           # Prettier configuration
└── ...
