# Apple Sign In OAuth Setup Guide

This guide will help you set up Apple Sign In OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Get Apple Developer Account

1. **Enroll in Apple Developer Program**: https://developer.apple.com/programs/
   - Individual: $99/year
   - Organization: $99/year
   - Required for Sign In with Apple

2. **Create a new App ID**:
   - Go to "Certificates, Identifiers & Profiles"
   - Click "Identifiers" → "App ID" → "+"
   - Enter description and bundle ID (e.g., com.yourcompany.socialsignup)
   - Enable "Sign In with Apple" capability
   - Register the App ID

### 2. Create Service ID

1. **Create Service ID**:
   - Go to "Identifiers" → "Services ID" → "+"
   - Description: Your app name
   - Identifier: Your service ID (e.g., com.yourcompany.socialsignup.web)
   - Return URLs: `http://localhost:5000/api/auth/apple/callback`

### 3. Generate Private Key

1. **Create a private key**:
   - Go to "Keys" → "+"
   - Enter key name (e.g., "Social Signup Key")
   - Select "Sign In with Apple"
   - Click "Continue" → "Register"
   - Download the `.p8` file (you can only download it once!)

2. **Note down your Key details**:
   - Key ID (shown in the list)
   - Team ID (shown in your developer account membership details)

### 4. Update Environment Variables

In your `backend/.env` file, replace the placeholder values:

```env
APPLE_CLIENT_ID=your_service_id_here
APPLE_CLIENT_ID_TEAM=your_team_id_here
APPLE_KEY_ID=your_key_id_here
APPLE_PRIVATE_KEY_PATH=./path/to/your/private/key.p8
```

**Important**: Place your downloaded `.p8` file in the specified path relative to your backend directory.

### 5. Install Dependencies

```bash
cd backend
npm install passport-apple
```

### 6. Start the Applications

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend/social-signup
npm run dev
```

## 🎯 How It Works

### Apple Sign In OAuth Flow:

1. **User clicks "Sign up with Apple"** → Redirects to Apple consent screen
2. **User approves** → Apple redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with Apple profile data
- ✅ **Account Linking**: Links Apple account to existing email users
- ✅ **Privacy First**: Apple may hide user email (uses private relay)
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
APPLE_CLIENT_ID=com.yourcompany.socialsignup.web
APPLE_CLIENT_ID_TEAM=ABCD123456
APPLE_KEY_ID=XYZ789ABCD
APPLE_PRIVATE_KEY_PATH=./AuthKey_ABC123456.p8
```

**Production:**
- Update redirect URI to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### Apple Sign In Scopes

The application uses these Apple scopes:
- `name`: Access to user's first and last name (only on first login)
- `email`: Access to user's email address (may be hidden)

### Private Key File

Place your downloaded `.p8` file in your backend directory:
```
backend/
├── AuthKey_ABC123456.p8  # Your private key file
├── .env
├── index.js
└── package.json
```

## 🐛 Troubleshooting

### Common Issues:

1. **"invalid_client" Error**
   - Verify your Service ID, Team ID, and Key ID are correct
   - Ensure your private key file exists and is readable
   - Check that your App ID has "Sign In with Apple" enabled

2. **"redirect_uri_mismatch" Error**
   - Check that the redirect URI in Apple Developer Portal matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/apple/callback`

3. **"Key not found" Error**
   - Ensure the private key file path is correct
   - Check file permissions (should be readable by Node.js)
   - Verify the Key ID matches your downloaded key

4. **"invalid_grant" Error**
   - The authorization code may have expired
   - Try the authentication flow again
   - Check system time synchronization

5. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that the frontend URL is in the CORS allowed origins

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In Apple Strategy callback
console.log('Apple profile:', profile);
console.log('Existing user:', existingUser);
console.log('New user:', newUser);
```

## 🔒 Security Considerations

1. **Private Key Security**: Never commit `.p8` files to version control
2. **Environment Variables**: Never commit `.env` files to version control
3. **HTTPS**: Use HTTPS in production (required by Apple)
4. **Session Security**: Set `secure: true` for cookies in production
5. **Token Expiration**: JWT tokens expire in 24 hours (configurable)

## 📱 Testing the Application

1. **Start both servers** (backend on 5000, frontend on 5173)
2. **Open frontend** in browser
3. **Click "Sign up with Apple"**
4. **Complete Apple authentication**
5. **Verify user is created** in MongoDB
6. **Check user data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "apple"` and their Apple profile data.

## 🎨 Customization

### Handle Hidden Email

Apple may hide user emails. The implementation automatically handles this:

```javascript
const email = profile.email || `${profile.id}@privaterelay.appleid.com`;
```

### Customize User Data:

Modify the Apple strategy callback to extract additional user information:

```javascript
const newUser = new User({
  appleId: profile.id,
  username: displayName.replace(/\s+/g, '').toLowerCase(),
  email: email,
  firstName: profile.name?.firstName,
  lastName: profile.name?.lastName,
  authMethod: 'apple'
});
```

## 📚 Apple Sign In Documentation

- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Apple Developer Program](https://developer.apple.com/programs/)
- [Passport.js Apple Strategy](https://www.passportjs.org/packages/passport-apple/)

## 🔄 Multiple OAuth Providers

Your application now supports:
- ✅ **Email/Password**: Traditional registration
- ✅ **Google OAuth**: One-click Google signup
- ✅ **LinkedIn OAuth**: Professional LinkedIn signup
- ✅ **Apple Sign In**: Secure, privacy-focused signup

### Key Differences for Apple:

- **Privacy First**: Apple may hide user emails
- **Name Only Once**: User name is provided only on first login
- **Private Relay**: Uses masked email addresses when user hides email
- **Strict Security**: Requires HTTPS in production
- **Developer Account**: Requires paid Apple Developer membership

## 🚨 Important Notes

1. **Apple Developer Account**: Required ($99/year)
2. **HTTPS Required**: Apple requires HTTPS in production
3. **Private Key**: Download and secure your `.p8` file
4. **Email Privacy**: Users may choose to hide their email
5. **Name Availability**: Names are only provided on first login

---

**🎉 Your Apple Sign In OAuth is now ready!** Users can sign up with their Apple ID securely and privately.
