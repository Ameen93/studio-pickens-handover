# Studio Pickens Production Checklist

## Pre-Deployment Checklist

### Security Configuration
- [ ] JWT_SECRET is set to a strong, unique value (min 256 bits)
- [ ] ADMIN_PASSWORD is set to a strong, unique password
- [ ] CORS_ORIGIN is configured for production domains only
- [ ] Rate limiting is enabled and configured appropriately
- [ ] Input validation is active on all endpoints
- [ ] File upload restrictions are in place
- [ ] Error handling is comprehensive and doesn't leak sensitive info

### Environment Configuration
- [ ] NODE_ENV is set to 'production'
- [ ] Production API URL is configured
- [ ] Database connection (if using) is secure
- [ ] SSL/TLS certificates are configured
- [ ] Environment variables are set correctly

### Code Quality
- [ ] All tests pass (`npm test`)
- [ ] Build process completes successfully (`npm run build`)
- [ ] No console.log statements in production code
- [ ] Error boundaries are implemented
- [ ] TypeScript types are properly defined

### Performance
- [ ] Images are optimized and compressed
- [ ] Lazy loading is implemented where appropriate
- [ ] API responses are cached where possible
- [ ] Compression is enabled
- [ ] Static assets are served efficiently

### Monitoring & Logging
- [ ] Error tracking is configured (Sentry, etc.)
- [ ] Uptime monitoring is set up
- [ ] Performance monitoring is configured
- [ ] Log rotation is configured
- [ ] Health check endpoint is working

### Backup & Recovery
- [ ] Data backup strategy is in place
- [ ] Code is versioned and tagged
- [ ] Rollback procedure is documented
- [ ] Recovery time objectives are defined

## Deployment Steps

### 1. Final Testing
```bash
# Run all tests
npm test

# Test build process
npm run build

# Test production server locally
npm run setup:production
npm run start:production
```

### 2. Environment Setup
```bash
# Copy production environment
cp .env.production .env

# Update sensitive values
# - JWT_SECRET
# - ADMIN_PASSWORD
# - CORS_ORIGIN
# - API URLs
```

### 3. Deploy Backend
Choose one deployment method:

**Railway:**
```bash
railway login
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your-secret
railway up
```

**Vercel (Serverless):**
```bash
vercel --prod
```

**DigitalOcean/Render:**
- Upload code to hosting platform
- Set environment variables in dashboard
- Deploy

### 4. Deploy Frontend
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or upload build folder to your hosting provider
```

### 5. Post-Deployment Verification
```bash
# Health check
curl https://your-api-domain.com/api/health

# Test authentication
curl -X POST https://your-api-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'

# Test CORS
curl -H "Origin: https://your-frontend-domain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://your-api-domain.com/api/hero
```

## Production Monitoring

### Key Metrics to Monitor
- [ ] API response times
- [ ] Error rates
- [ ] Authentication failures
- [ ] File upload success rates
- [ ] Memory usage
- [ ] CPU usage
- [ ] Disk space
- [ ] SSL certificate expiry

### Alerts to Set Up
- [ ] High error rate (>5%)
- [ ] Slow response times (>2s)
- [ ] Multiple auth failures
- [ ] Server downtime
- [ ] Low disk space
- [ ] SSL certificate expiry warning

## Security Maintenance

### Regular Tasks
- [ ] Review and rotate JWT secrets
- [ ] Update admin passwords
- [ ] Update dependencies
- [ ] Review API logs for suspicious activity
- [ ] Check for security vulnerabilities
- [ ] Review rate limiting effectiveness

### Security Updates
- [ ] Keep Node.js updated
- [ ] Keep npm packages updated
- [ ] Monitor security advisories
- [ ] Apply security patches promptly

## Performance Optimization

### Frontend Optimization
- [ ] Enable gzip compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Use CDN for static assets
- [ ] Implement lazy loading
- [ ] Use service workers for caching

### Backend Optimization
- [ ] Enable response compression
- [ ] Implement API caching
- [ ] Optimize database queries
- [ ] Use connection pooling
- [ ] Implement request queuing

## Troubleshooting Guide

### Common Issues
1. **CORS Errors:**
   - Check CORS_ORIGIN environment variable
   - Verify domain spelling
   - Check protocol (http vs https)

2. **Authentication Failures:**
   - Verify JWT_SECRET is consistent
   - Check admin password
   - Review rate limiting

3. **File Upload Issues:**
   - Check file size limits
   - Verify upload directory permissions
   - Check file type restrictions

4. **API Errors:**
   - Check server logs
   - Verify database connection
   - Check environment variables

### Emergency Procedures
1. **Rollback Deployment:**
   ```bash
   git checkout previous-version-tag
   # Redeploy previous version
   ```

2. **Emergency Shutdown:**
   ```bash
   # Stop server
   pkill -f "node server.js"
   ```

3. **Database Recovery:**
   ```bash
   # Restore from backup
   cp data/backup/*.json data/
   ```

## Contact Information

### Development Team
- Primary Developer: [Your Name]
- Email: [your-email@domain.com]
- Phone: [emergency contact]

### Hosting Providers
- Frontend: Vercel ([support contact])
- Backend: Railway/DO/Render ([support contact])
- Domain: [registrar support]

### Third-Party Services
- Error Tracking: Sentry ([support contact])
- Monitoring: Uptime Robot ([support contact])
- CDN: Cloudflare ([support contact])

## Success Criteria

### Performance Benchmarks
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] 99.9% uptime
- [ ] Error rate < 1%

### Security Benchmarks
- [ ] No critical vulnerabilities
- [ ] All endpoints properly authenticated
- [ ] Rate limiting effective
- [ ] Input validation working

### User Experience
- [ ] All pages load correctly
- [ ] Admin panel is functional
- [ ] Images display properly
- [ ] Forms work correctly
- [ ] Mobile responsiveness maintained

This checklist ensures a smooth, secure, and performant production deployment of Studio Pickens.