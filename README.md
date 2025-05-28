# VoteHub - Online Voting System

A modern and secure online voting platform built with React and Node.js, featuring voter and candidate management, secure voting, and real-time results.

## Project Structure

```
votehub/
├── Client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       │   ├── AdminDashboard/
│       │   ├── Candidate/
│       │   ├── Navbar/
│       │   └── Voter/
│       └── App.js         # Main application component
├── Server/                # Node.js backend
│   ├── Model/            # Database models
│   ├── Routes/           # API routes
│   ├── publicUploads/    # File uploads
│   │   ├── CandidatePhotos/
│   │   └── VoterPhotos/
│   └── index.js          # Server entry point
├── .env                   # Environment variables
└── vercel.json           # Vercel deployment config
```

## Features

- Secure voter and candidate registration
- Image upload for voter and candidate profiles
- Real-time vote counting and results
- Admin dashboard with analytics
- Secure authentication and authorization
- Email notifications
- Responsive design


## Development

### Local Development

1. Install dependencies:
   ```bash
   # Install client dependencies
   cd Client
   npm install

   # Install server dependencies
   cd ../Server
   npm install
   ```

2. Start development servers:
   ```bash
   # Start client (in Client directory)
   npm start

   # Start server (in Server directory)
   npm run dev
   ```

### Building for Production

1. Build the client:
   ```bash
   cd Client
   npm run build
   ```

2. Start the server:
   ```bash
   cd Server
   npm start
   ```

## Security Considerations

1. Enable HTTPS (automatically handled by Vercel)
2. CORS is configured for security
3. JWT-based authentication
4. Secure file uploads
5. Environment variables for sensitive data
6. Regular dependency updates

## Support

For any issues or questions, please open an issue in the GitHub repository.
