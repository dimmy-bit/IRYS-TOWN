# Deployment Guide for Irys Town

This guide will help you deploy the Irys Town game to various hosting platforms.

## Prerequisites

- Node.js (v14 or higher) and npm
- Git (for GitHub Pages deployment)
- Basic knowledge of command line

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/irys-town.git
   cd irys-town
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate icons and screenshots (requires Node.js canvas):
   ```bash
   npm run setup
   ```

4. Start the local development server:
   ```bash
   npm start
   ```
   This will start the game at http://localhost:3000

## Deployment Options

### 1. GitHub Pages (Free)

1. Create a new GitHub repository
2. Push your code to the `main` branch
3. Go to Repository Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Choose `main` branch and `/ (root)` folder
6. Click "Save"
7. Your site will be live at `https://<username>.github.io/<repository-name>`

### 2. Netlify (Free)

1. Sign up for a Netlify account
2. Drag and drop the project folder to the Netlify dashboard
   OR
   Connect your GitHub repository
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Click "Deploy site"

### 3. Vercel (Free)

1. Sign up for a Vercel account
2. Import your GitHub/GitLab/Bitbucket repository
3. Configure project:
   - Framework: Static
   - Output Directory: (leave empty)
4. Click "Deploy"

### 4. Traditional Web Hosting

1. Compress all files (except `node_modules` and `.git`)
2. Upload to your web hosting via FTP/SFTP
3. Ensure your server is configured to serve `index.html` as the default document
4. Make sure URL rewriting is set up (see `.htaccess` or `web.config`)

## Environment Variables

No environment variables are required for the basic setup. If you need to add analytics or other services, create a `.env` file in the root directory.

## Updating the Game

1. Make your changes locally
2. Test thoroughly
3. Commit and push your changes
4. Your deployment platform should automatically rebuild and deploy the updates

## Troubleshooting

- **404 Errors**: Ensure your server is configured to redirect all requests to `index.html`
- **Missing Icons**: Run `npm run generate-icons` to regenerate icons
- **Service Worker Issues**: Clear your browser cache and unregister any existing service workers

## Security Considerations

- Always use HTTPS in production
- Keep dependencies up to date
- Regularly audit your site with tools like Lighthouse

## Support

For issues and feature requests, please open an issue on the GitHub repository.
