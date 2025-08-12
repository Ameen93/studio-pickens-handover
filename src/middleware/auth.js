const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

// JWT Secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'studio-pickens-secret-key-change-in-production';

// Default admin credentials - in production, these should be in environment variables
const DEFAULT_ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // This will be hashed
  email: process.env.ADMIN_EMAIL || 'admin@studiopickens.com'
};

// Path to store user data (in production, use proper database)
const USERS_FILE = path.join(__dirname, '../../data/users.json');

/**
 * Initialize the authentication system
 */
async function initializeAuth() {
  try {
    // Check if users file exists
    try {
      await fs.access(USERS_FILE);
    } catch {
      // Create users file with default admin if it doesn't exist
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
      const defaultUser = {
        id: 1,
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      
      await fs.writeFile(USERS_FILE, JSON.stringify([defaultUser], null, 2));
      console.log('✅ Default admin user created');
      console.log(`📧 Username: ${DEFAULT_ADMIN.username}`);
      console.log(`🔑 Password: ${DEFAULT_ADMIN.password}`);
      console.log('⚠️  Please change the default password after first login!');
    }
  } catch (error) {
    console.error('❌ Error initializing authentication:', error);
  }
}

/**
 * Load users from file
 */
async function loadUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

/**
 * Save users to file
 */
async function saveUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
}

/**
 * Generate JWT token
 */
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * Verify JWT token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Authentication middleware
 */
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'No token provided',
      code: 'NO_TOKEN'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token',
      code: 'INVALID_TOKEN'
    });
  }

  req.user = decoded;
  next();
}

/**
 * Admin role middleware
 */
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      error: 'Admin access required',
      code: 'INSUFFICIENT_PERMISSIONS'
    });
  }
  next();
}

/**
 * Login endpoint
 */
async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const users = await loadUsers();
    const user = users.find(u => u.username === username || u.email === username);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await saveUsers(users);

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
}

/**
 * Logout endpoint
 */
async function logoutHandler(req, res) {
  // For JWT, logout is handled client-side by removing the token
  // In production, you might want to implement a token blacklist
  res.json({ success: true, message: 'Logged out successfully' });
}

/**
 * Get current user endpoint
 */
async function getCurrentUser(req, res) {
  try {
    const users = await loadUsers();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
}

/**
 * Change password endpoint
 */
async function changePasswordHandler(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Current password and new password are required',
        code: 'MISSING_PASSWORDS'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'New password must be at least 6 characters long',
        code: 'PASSWORD_TOO_SHORT'
      });
    }

    const users = await loadUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Current password is incorrect',
        code: 'INVALID_CURRENT_PASSWORD'
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.updatedAt = new Date().toISOString();

    await saveUsers(users);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
}

module.exports = {
  initializeAuth,
  requireAuth,
  requireAdmin,
  loginHandler,
  logoutHandler,
  getCurrentUser,
  changePasswordHandler,
  generateToken,
  verifyToken
};