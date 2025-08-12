# Vercel Contact Form Setup Guide

## Overview
The contact form is now configured to work with Vercel serverless functions. This guide explains how to set up the Gmail integration for production.

## Required Environment Variables

Set these environment variables in your Vercel dashboard:

### Gmail SMTP Configuration
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Contact Form Settings
```
CONTACT_EMAIL=hello@studiopickens.com
```

## Gmail Setup Steps

1. **Enable 2-Factor Authentication**
   - Go to your Gmail account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Google Account settings
   - Navigate to Security → App passwords
   - Generate a new app password for "Studio Pickens Website"
   - Use this password as `SMTP_PASS`

3. **Set Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add each variable listed above

## Files Updated

1. **`/api/contact.js`** - Vercel serverless function for handling contact form submissions
2. **`/src/components/ContactForm.jsx`** - Updated to use `/api/contact` endpoint
3. **`/.env.example`** - Contains all required environment variables

## Testing

1. Deploy to Vercel
2. Set environment variables in Vercel dashboard
3. Test contact form on live site
4. Check Gmail for test emails

## Troubleshooting

- **"Authentication failed"**: Double-check your Gmail app password
- **"CORS error"**: Ensure your domain is properly configured
- **"No emails received"**: Check spam folder and verify `CONTACT_EMAIL` setting

## Security Notes

- Never commit actual email credentials to the repository
- Use environment variables for all sensitive data
- App passwords are more secure than regular passwords
- Consider using a dedicated email account for contact forms