This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

````bash
npm run dev
# or
yarn dev# PDF Viewer Application

A Next.js application that allows users to upload, view, annotate and sign pdf documents.

## Features

- PDF document upload and viewing
- Responsive design for desktop and mobile devices
- Secure document handling
- Interactive PDF viewing experience

## Tech Stack

- Frontend: Next.js, React, TypeScript
- State Management: Redux (with Redux Toolkit)
- Styling: Tailwind CSS
- PDF Handling: PDFTron WebViewer

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PDFTron WebViewer license key (for production use)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChineduOscar/document-signer
   cd document-signer
````

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to `.env`:
   - Edit `.env` and add your PDFTron license key:
     ```
     NEXT_PUBLIC_LICENSE_KEY=your_pdftron_license_key_here
     ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running in Production

```bash
npm start
# or
yarn start
```

### By Oscar Chinedu - the dev you need...
