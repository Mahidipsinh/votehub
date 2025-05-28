# VoteHub - Online Voting System

A modern and secure online voting platform built with React and Node.js.

## Project Structure

```
votehub/
├── Client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
├── Server/                # Node.js backend
│   └── index.js          # Server entry point
├── .env                   # Environment variables
└── vercel.json           # Vercel deployment config
```

## Deployment Instructions

### Prerequisites

1. Node.js >= 14.0.0
2. MongoDB Atlas account
3. Vercel account
4. SMTP service (e.g., SendGrid, Gmail)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# Client
REACT_APP_API_URL=your_api_url

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

### Deployment Steps

1. **Push your code to GitHub**

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Configure the following settings:
     - Framework Preset: Other
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: Client/build
     - Install Command: npm install

3. **Environment Variables**
   - Add all environment variables from `.env` to Vercel's project settings

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your application will be available at `https://your-project.vercel.app`

### Post-Deployment

1. **Verify Deployment**
   - Check if the frontend is accessible
   - Test API endpoints
   - Verify email functionality

2. **Monitoring**
   - Set up error tracking
   - Monitor server logs
   - Set up uptime monitoring

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

1. Enable HTTPS
2. Set up CORS properly
3. Implement rate limiting
4. Use secure session management
5. Regular security audits
6. Keep dependencies updated

## Support

For any issues or questions, please open an issue in the GitHub repository.
