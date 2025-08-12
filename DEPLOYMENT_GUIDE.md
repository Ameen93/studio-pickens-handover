# Studio Pickens Deployment Guide

## Production Deployment Checklist

### 1. Environment Configuration

1. **Copy environment file:**
   ```bash
   cp .env.production .env
   ```

2. **Update production values in .env:**
   - `JWT_SECRET` - Generate a strong 256-bit secret key
   - `ADMIN_PASSWORD` - Set a strong admin password
   - `CORS_ORIGIN` - Set your production domain(s)
   - `REACT_APP_API_BASE_URL` - Set your production API URL

3. **Generate secure JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 2. Backend Deployment Options

#### Option A: Railway Deployment

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and create project:**
   ```bash
   railway login
   railway init
   ```

3. **Set environment variables:**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=your-generated-secret
   railway variables set ADMIN_PASSWORD=your-secure-password
   railway variables set CORS_ORIGIN=https://yourdomain.com
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

#### Option B: DigitalOcean App Platform

1. **Create new app in DigitalOcean console**
2. **Connect your GitHub repository**
3. **Configure environment variables in the console**
4. **Set build command:** `npm install`
5. **Set run command:** `node server.js`

#### Option C: Render Deployment

1. **Create new web service in Render**
2. **Connect your GitHub repository**
3. **Set environment variables in Render dashboard**
4. **Build command:** `npm install`
5. **Start command:** `node server.js`

### 3. Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and deploy:**
   ```bash
   vercel login
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `REACT_APP_API_BASE_URL` - Your production API URL
   - `NODE_ENV=production`

4. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `build`

### 4. Domain Configuration

1. **Configure DNS:**
   - Frontend: Point your domain to Vercel
   - Backend: Point API subdomain to your backend hosting

2. **SSL Certificate:**
   - Vercel handles SSL automatically
   - Backend hosting providers usually provide SSL

### 5. Security Checklist

- [ ] JWT secret is strong and unique
- [ ] Admin password is strong and unique
- [ ] CORS is configured for production domains only
- [ ] Rate limiting is enabled
- [ ] Input validation is active
- [ ] Error handling is comprehensive
- [ ] File upload restrictions are in place

### 6. Monitoring Setup

1. **Error Tracking (Sentry):**
   ```bash
   npm install @sentry/node @sentry/tracing
   ```

2. **Uptime Monitoring:**
   - Use services like Uptime Robot or Pingdom
   - Monitor `/api/health` endpoint

3. **Performance Monitoring:**
   - Set up APM tools like New Relic or DataDog
   - Monitor response times and error rates

### 7. Database Migration (Optional)

If you want to migrate from JSON files to a database:

1. **MongoDB Setup:**
   ```bash
   npm install mongodb mongoose
   ```

2. **Create migration scripts:**
   ```javascript
   // Example migration script
   const fs = require('fs');
   const mongoose = require('mongoose');
   
   // Read JSON files and import to MongoDB
   ```

### 8. Backup Strategy

1. **Data Backup:**
   - Set up automated backups of JSON files
   - Consider cloud storage for backups

2. **Code Backup:**
   - Ensure code is in version control
   - Tag releases for easy rollback

### 9. Performance Optimization

1. **Enable compression:**
   ```bash
   npm install compression
   ```

2. **Configure caching:**
   - Set up Redis for session storage
   - Configure proper cache headers

3. **Image optimization:**
   - Use CDN for static assets
   - Implement lazy loading

### 10. Testing in Production

1. **Health checks:**
   ```bash
   curl https://your-api-domain.com/api/health
   ```

2. **Authentication test:**
   ```bash
   curl -X POST https://your-api-domain.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"your-password"}'
   ```

3. **CORS test:**
   - Test from your frontend domain
   - Verify proper CORS headers

### 11. Post-Deployment Verification

- [ ] All pages load correctly
- [ ] Admin panel is accessible and secure
- [ ] API endpoints respond correctly
- [ ] File uploads work
- [ ] Images display properly
- [ ] Authentication works
- [ ] Rate limiting is active
- [ ] Error handling works
- [ ] SSL certificates are valid

### 12. Rollback Plan

1. **Keep previous version tagged:**
   ```bash
   git tag -a v1.0.0 -m "Production release 1.0.0"
   ```

2. **Document rollback procedure:**
   - How to revert to previous version
   - How to restore data backups
   - Contact information for emergencies

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `PORT` | Server port | Yes | `3001` |
| `HOST` | Server host | Yes | `0.0.0.0` |
| `JWT_SECRET` | JWT signing secret | Yes | `your-secret-key` |
| `ADMIN_PASSWORD` | Admin password | Yes | `SecurePassword123!` |
| `CORS_ORIGIN` | Allowed origins | Yes | `https://yourdomain.com` |
| `UPLOAD_MAX_SIZE` | Max file size | No | `10485760` |
| `API_RATE_LIMIT_MAX` | API rate limit | No | `100` |
| `SENTRY_DSN` | Error tracking | No | `https://...` |

## Support

For deployment issues:
1. Check server logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration
5. Verify SSL certificates