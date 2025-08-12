import nodemailer from 'nodemailer';

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  console.log('[CONTACT API] Starting request processing...');
  console.log('[CONTACT API] Request method:', req.method);
  console.log('[CONTACT API] Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('[CONTACT API] Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  console.log('[CONTACT API] Environment check - CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'hello@studiopickens.com (default)');

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  console.log('[CONTACT API] CORS headers set');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('[CONTACT API] Handling CORS preflight request');
    return res.status(200).json({ message: 'OK' });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('[CONTACT API] Invalid method - rejecting:', req.method);
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('[CONTACT API] Request body received:', JSON.stringify(req.body, null, 2));
    
    const { name, email, reason, message } = req.body;

    // Validate required fields
    console.log('[CONTACT API] Validating required fields...');
    console.log('[CONTACT API] - Name:', !!name, name?.length || 0, 'chars');
    console.log('[CONTACT API] - Email:', !!email, email?.length || 0, 'chars');
    console.log('[CONTACT API] - Reason:', !!reason, reason?.length || 0, 'chars');
    console.log('[CONTACT API] - Message:', !!message, message?.length || 0, 'chars');

    if (!name || !email || !reason || !message) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!reason) missingFields.push('reason');
      if (!message) missingFields.push('message');
      
      console.log('[CONTACT API] Validation failed - missing fields:', missingFields);
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
        missingFields
      });
    }

    // Validate email format
    console.log('[CONTACT API] Validating email format...');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    console.log('[CONTACT API] Email validation result:', isValidEmail, 'for email:', email);
    
    if (!isValidEmail) {
      console.log('[CONTACT API] Email validation failed');
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Create form data object
    console.log('[CONTACT API] Creating form data object...');
    const formData = {
      name,
      email,
      reason,
      message,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    console.log('[CONTACT API] Form data created successfully:', JSON.stringify(formData, null, 2));

    // Try to send via Gmail SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      console.log('[CONTACT API] SMTP credentials found - attempting to send email via Gmail...');
      console.log('[CONTACT API] SMTP Host:', process.env.SMTP_HOST);
      console.log('[CONTACT API] SMTP Port:', process.env.SMTP_PORT);
      console.log('[CONTACT API] SMTP User:', process.env.SMTP_USER);
      console.log('[CONTACT API] SMTP Secure:', process.env.SMTP_SECURE);
      
      try {
        // Create email transporter
        console.log('[CONTACT API] Creating nodemailer transporter...');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        console.log('[CONTACT API] Verifying SMTP connection...');
        await transporter.verify();
        console.log('[CONTACT API] SMTP connection verified successfully');

        // Email content
        const mailOptions = {
          from: `"Studio Pickens Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || 'hello@studiopickens.com',
          subject: `New Contact Form Submission - ${reason}`,
          html: `
            <div style="font-family: 'Proxima Nova', Arial, sans-serif; color: #0025B8; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0025B8; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #F8F7F7; padding: 20px; margin: 20px 0; border-left: 4px solid #FF7E46;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Reason for Contact:</strong> ${reason}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; padding: 10px; background: white; border-radius: 4px;">${message}</p>
                <p><strong>Submitted:</strong> ${formData.timestamp}</p>
                <p><strong>IP:</strong> ${formData.ip}</p>
              </div>
              
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                This email was sent from the Studio Pickens contact form at ${new Date().toLocaleString()}.
              </p>
            </div>
          `,
          text: `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            Reason: ${reason}
            
            Message:
            ${message}
            
            Submitted: ${formData.timestamp}
            IP: ${formData.ip}
          `,
        };

        console.log('[CONTACT API] Email options prepared:', JSON.stringify({
          ...mailOptions,
          html: '[HTML content prepared]',
          text: '[Text content prepared]'
        }, null, 2));

        console.log('[CONTACT API] Sending email via SMTP...');
        const result = await transporter.sendMail(mailOptions);
        console.log('[CONTACT API] Email sent successfully via SMTP!');
        console.log('[CONTACT API] SMTP result:', JSON.stringify(result, null, 2));

      } catch (smtpError) {
        console.error('[CONTACT API] SMTP email failed with error:', smtpError);
        console.error('[CONTACT API] SMTP error stack:', smtpError.stack);
        console.error('[CONTACT API] SMTP error details:', {
          name: smtpError.name,
          message: smtpError.message,
          code: smtpError.code,
          command: smtpError.command,
          response: smtpError.response,
          responseCode: smtpError.responseCode
        });
        
        // Return a more specific error message based on the error type
        let errorMessage = 'Failed to send email. Please try again later.';
        
        if (smtpError.code === 'EAUTH' || smtpError.responseCode === 535) {
          errorMessage = 'Email authentication failed. Please check your email credentials.';
        } else if (smtpError.code === 'ENOTFOUND') {
          errorMessage = 'Could not connect to email server. Please check your network connection.';
        } else if (smtpError.code === 'ECONNECTION') {
          errorMessage = 'Connection to email server failed. Please try again.';
        }
        
        // Log the error but don't fail the form submission
        console.error('[CONTACT API] Email failed, but form submission will be recorded as successful');
        
        // Continue to success response - the form data is logged even if email fails
      }
    } else {
      console.log('[CONTACT API] SMTP credentials not configured - email will not be sent');
      console.log('[CONTACT API] Missing variables check:');
      console.log('[CONTACT API] - SMTP_HOST:', !!process.env.SMTP_HOST);
      console.log('[CONTACT API] - SMTP_USER:', !!process.env.SMTP_USER);
      console.log('[CONTACT API] - SMTP_PASS:', !!process.env.SMTP_PASS);
      console.log('[CONTACT API] Form submission will be logged only');
    }

    console.log('[CONTACT API] Sending success response...');
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Your message has been received successfully. We will get back to you soon!',
      submittedAt: formData.timestamp
    });

    console.log('[CONTACT API] Success response sent');

  } catch (error) {
    console.error('[CONTACT API] Unexpected error occurred:', error);
    console.error('[CONTACT API] Error stack:', error.stack);
    console.error('[CONTACT API] Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      cause: error.cause
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });

    console.log('[CONTACT API] Error response sent');
  }
}