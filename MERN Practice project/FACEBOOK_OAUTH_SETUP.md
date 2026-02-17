# Facebook OAuth Setup Guide

This guide will help you set up Facebook OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Create Facebook App

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a new app**:
   - Click "My Apps" → "Create App"
   - Select "Business" or "Other" as app type
   - Enter app name (e.g., "Social Signup App")
   - Enter contact email
   - Click "Create App"

3. **Add Facebook Login product**:
   - In your app dashboard, click "Add Product"
   - Select "Facebook Login"
   - Choose "Web" as platform
   - Enter your site URL: `http://localhost:5173`

### 2. Configure Facebook Login Settings

1. **Set up OAuth redirect URI**:
   - Go to "Facebook Login" → "Settings"
   - Add "Valid OAuth Redirect URIs":
   - Enter: `http://localhost:5000/api/auth/facebook/callback`
   - Click "Save Changes"

2. **Get App Credentials**:
   - Go to "Settings" → "Basic"
   - Copy the **App ID** and **App Secret**

### 3. Update Environment Variables

In your `backend/.env` file, replace the placeholder values:

```env
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

### 4. Install Dependencies

```bash
cd backend
npm install passport-facebook
```

### 5. Start the Applications

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

### Facebook OAuth Flow:

1. **User clicks "Sign up with Facebook"** → Redirects to Facebook consent screen
2. **User approves** → Facebook redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with Facebook profile data
- ✅ **Account Linking**: Links Facebook account to existing email users
- ✅ **Profile Pictures**: Imports Facebook profile picture
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
FACEBOOK_APP_ID=1234567890123456
FACEBOOK_APP_SECRET=abcdef1234567890abcdef12345678
```

**Production:**
- Update redirect URI to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### Facebook App Review

For production use, your app may need to go through Facebook's App Review process:
- **Development**: Works with your own Facebook account
- **Production**: Requires approval for public use
- **Permissions**: Default permissions (email, public_profile) are usually pre-approved

### Custom Redirect URL

To change the frontend redirect URL, update this line in `backend/index.js`:

```javascript
res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify({...}))}`);
```

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that the redirect URI in Facebook App Settings matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/facebook/callback`

2. **"invalid_client" Error**
   - Verify your App ID and App Secret are correct
   - Make sure your Facebook app is in "Development" mode

3. **"OAuthException" Error**
   - Check that your app has the Facebook Login product added
   - Ensure the redirect URI is properly configured

4. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that the frontend URL is in the CORS allowed origins

5. **MongoDB Connection Error**
   - Make sure MongoDB is running on your machine
   - Check the MONGO_URI in your .env file

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In Facebook Strategy callback
console.log('Facebook profile:', profile);
console.log('Existing user:', existingUser);
console.log('New user:', newUser);
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Use HTTPS in production (required by Facebook)
3. **Session Security**: Set `secure: true` for cookies in production
4. **Token Expiration**: JWT tokens expire in 24 hours (configurable)
5. **Input Validation**: All user inputs are validated on both frontend and backend

## 📱 Testing the Application

1. **Start both servers** (backend on 5000, frontend on 5173)
2. **Open frontend** in browser
3. **Click "Sign up with Facebook"**
4. **Complete Facebook authentication**
5. **Verify user is created** in MongoDB
6. **Check profile picture and data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "facebook"` and their Facebook profile data.

## 🎨 Customization

### Add More Facebook Permissions:

Modify the Facebook strategy to request additional permissions:

```javascript
app.get(
  "/api/auth/facebook",
  passport.authenticate("facebook", { 
    scope: ["email", "user_birthday", "user_location"] 
  }),
);
```

### Customize User Data:

Modify the Facebook strategy callback to extract additional user information:

```javascript
const newUser = new User({
  facebookId: profile.id,
  username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
  email: profile.emails[0].value,
  avatar: profile.photos[0].value,
  firstName: profile.name.givenName,
  lastName: profile.name.familyName,
  gender: profile.gender,
  location: profile._json?.location?.name,
  authMethod: 'facebook'
});
```

## 📚 Facebook API Reference

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Facebook App Development](https://developers.facebook.com/docs/apps/)
- [Passport.js Facebook Strategy](https://www.passportjs.org/packages/passport-facebook/)

## 🔄 Multiple OAuth Providers

Your application now supports:
- ✅ **Email/Password**: Traditional registration
- ✅ **Google OAuth**: One-click Google signup
- ✅ **LinkedIn OAuth**: Professional LinkedIn signup
- ✅ **Facebook OAuth**: Social media signup

### Key Differences for Facebook:

- **Social Integration**: Leverages Facebook's social graph
- **Rich Profile Data**: Access to comprehensive profile information
- **App Review**: May require Facebook approval for production
- **Wide Adoption**: Most users have Facebook accounts
- **Media Sharing**: Easy integration with Facebook sharing features

## 🚨 Important Notes

1. **Facebook Developer Account**: Required (free)
2. **App Creation**: Must create Facebook app first
3. **Redirect URI**: Must match exactly in Facebook settings
4. **HTTPS Required**: Facebook requires HTTPS in production
5. **App Review**: Production use may require Facebook approval

## 📊 Facebook vs Other OAuth Providers

| Feature | Facebook | Google | LinkedIn | Email |
|---------|----------|--------|----------|-------|
| **Setup Complexity** | Medium | Easy | Medium | Easy |
| **User Base** | 2.9B+ | 1.8B+ | 900M+ | N/A |
| **Profile Data** | Rich | Good | Professional | Basic |
| **App Review** | Required | Not Required | Not Required | N/A |
| **Cost** | Free | Free | Free | N/A |

---

**🎉 Your Facebook OAuth signup is now ready!** Users can sign up with their Facebook accounts and enjoy seamless social authentication.
