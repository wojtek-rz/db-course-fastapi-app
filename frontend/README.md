# React frontend

## Development

To install dependencies run:

```bash
npm install
```

To run the application in development mode, run:

```bash
npm run dev
```

## Deployment

To build the application, run:

```bash
npm run build
```

This will create a `dist` directory with the built application.

Dockerfile copies the contents of the `dist` directory to the nginx image.
To create and run the container:
    
```bash
docker build -t frontend .
docker run -p 3000:80 frontend
```

Website will be available at `localhost:3000`.

## File structure

```bash
.
├── conf            # Configuration files for nginx (docker)
├── dist            # Compiled static files
├── Dockerfile      # Dockerfile for building the image
├── index.html      # Main HTML file
├── package.json    # Dependencies
├── src             # Source code
├── package-lock.json
├── README.md
└── vite.config.js  # Vite configuration
```