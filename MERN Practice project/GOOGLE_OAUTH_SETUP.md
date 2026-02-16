# Google OAuth Setup Guide

This guide will help you set up Google OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Get Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth 2.0 Client IDs"
   - Select "Web application"
   - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
   - Copy the **Client ID** and **Client Secret**

### 2. Update Environment Variables

In your `backend/.env` file, replace the placeholder values:

```env
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

```bash
cd frontend/social-signup
npm install
```

### 4. Start the Applications

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

### Google OAuth Flow:

1. **User clicks "Sign up with Google"** → Redirects to Google consent screen
2. **User approves** → Google redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with Google profile data
- ✅ **Account Linking**: Links Google account to existing email users
- ✅ **Profile Pictures**: Imports Google profile picture
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
GOOGLE_CLIENT_ID=your_dev_client_id
GOOGLE_CLIENT_SECRET=your_dev_client_secret
```

**Production:**
- Update redirect URI to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### Custom Redirect URL

To change the frontend redirect URL, update this line in `backend/index.js`:

```javascript
res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify({...}))}`);
```

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that the redirect URI in Google Console matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/google/callback`

2. **"invalid_client" Error**
   - Verify your Client ID and Client Secret are correct
   - Make sure there are no extra spaces or characters

3. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that the frontend URL is in the CORS allowed origins

4. **MongoDB Connection Error**
   - Make sure MongoDB is running on your machine
   - Check the MONGO_URI in your .env file

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In Google Strategy callback
console.log('Google profile:', profile);
console.log('Existing user:', existingUser);
console.log('New user:', newUser);
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Use HTTPS in production
3. **Session Security**: Set `secure: true` for cookies in production
4. **Token Expiration**: JWT tokens expire in 24 hours (configurable)
5. **Input Validation**: All user inputs are validated on both frontend and backend

## 📱 Testing the Application

1. **Start both servers** (backend on 5000, frontend on 5173)
2. **Open frontend** in browser
3. **Click "Sign up with Google"**
4. **Complete Google authentication**
5. **Verify user is created** in MongoDB
6. **Check profile picture and data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "google"` and their Google profile data.

## 🎨 Customization

### Add More OAuth Providers:

You can easily add Facebook, GitHub, or other OAuth providers by:

1. Install the appropriate passport strategy
2. Add similar route handlers
3. Update the user schema if needed

### Customize User Data:

Modify the Google strategy callback to extract additional user information:

```javascript
const newUser = new User({
  googleId: profile.id,
  username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
  email: profile.emails[0].value,
  avatar: profile.photos[0].value,
  firstName: profile.name.givenName,
  lastName: profile.name.familyName,
  authMethod: 'google'
});
```

## 📚 Additional Resources

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://reactjs.org/)

---

**🎉 Your Google OAuth signup is now ready!** Users can sign up with their Google accounts in just one click.
