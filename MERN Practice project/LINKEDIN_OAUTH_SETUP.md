# LinkedIn OAuth Setup Guide

This guide will help you set up LinkedIn OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Get LinkedIn OAuth Credentials

1. **Go to LinkedIn Developer Portal**: https://www.linkedin.com/developers/apps/new
2. **Create a new application**:
   - App Name: Your app name (e.g., "Social Signup App")
   - App Logo: Upload a logo (optional)
   - Description: Describe your application
   - Privacy Policy URL: Add a privacy policy URL
   - Contact Email: Your email address
3. **Configure OAuth settings**:
   - Go to "Auth" tab in your app settings
   - Add "Authorization URLs": `http://localhost:5000/api/auth/linkedin/callback`
   - Add "Redirect URLs": `http://localhost:5173`
   - Check "r_emailaddress" and "r_liteprofile" scopes
4. **Get your credentials**:
   - Go to "Auth" tab
   - Copy the **Client ID** and **Client Secret**

### 2. Update Environment Variables

In your `backend/.env` file, replace the placeholder values:

```env
LINKEDIN_CLIENT_ID=your_actual_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_actual_linkedin_client_secret_here
```

### 3. Install Dependencies

```bash
cd backend
npm install passport-linkedin-oauth2
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

### LinkedIn OAuth Flow:

1. **User clicks "Sign up with LinkedIn"** → Redirects to LinkedIn consent screen
2. **User approves** → LinkedIn redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with LinkedIn profile data
- ✅ **Account Linking**: Links LinkedIn account to existing email users
- ✅ **Profile Pictures**: Imports LinkedIn profile picture
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
LINKEDIN_CLIENT_ID=your_dev_client_id
LINKEDIN_CLIENT_SECRET=your_dev_client_secret
```

**Production:**
- Update redirect URI to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### LinkedIn API Scopes

The application uses these LinkedIn scopes:
- `r_emailaddress`: Access to user's primary email address
- `r_liteprofile`: Access to user's basic profile information

### Custom Redirect URL

To change the frontend redirect URL, update this line in `backend/index.js`:

```javascript
res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify({...}))}`);
```

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that the redirect URI in LinkedIn Developer Portal matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/linkedin/callback`

2. **"invalid_client" Error**
   - Verify your Client ID and Client Secret are correct
   - Make sure your LinkedIn app is in "Development" mode

3. **"Insufficient Permission" Error**
   - Check that your app has the required scopes: `r_emailaddress` and `r_liteprofile`
   - Ensure your app is properly configured in LinkedIn Developer Portal

4. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that the frontend URL is in the CORS allowed origins

5. **MongoDB Connection Error**
   - Make sure MongoDB is running on your machine
   - Check the MONGO_URI in your .env file

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In LinkedIn Strategy callback
console.log('LinkedIn profile:', profile);
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
3. **Click "Sign up with LinkedIn"**
4. **Complete LinkedIn authentication**
5. **Verify user is created** in MongoDB
6. **Check profile picture and data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "linkedin"` and their LinkedIn profile data.

## 🎨 Customization

### Add More OAuth Providers:

You can easily add Facebook, GitHub, or other OAuth providers by:

1. Install the appropriate passport strategy
2. Add similar route handlers
3. Update the user schema if needed

### Customize User Data:

Modify the LinkedIn strategy callback to extract additional user information:

```javascript
const newUser = new User({
  linkedinId: profile.id,
  username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
  email: profile.emails[0].value,
  avatar: profile.photos?.[3]?.value || profile.photos?.[0]?.value,
  firstName: profile.name.givenName,
  lastName: profile.name.familyName,
  headline: profile.headline,
  location: profile.location.name,
  authMethod: 'linkedin'
});
```

## 📚 LinkedIn API Reference

- [LinkedIn Authentication Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow)
- [LinkedIn Profile API](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin)
- [Passport.js LinkedIn Strategy](https://www.passportjs.org/packages/passport-linkedin-oauth2/)

## 🔄 Multiple OAuth Providers

Your application now supports:
- ✅ **Email/Password**: Traditional registration
- ✅ **Google OAuth**: One-click Google signup
- ✅ **LinkedIn OAuth**: Professional LinkedIn signup

Users can:
- Sign up with any method
- Link multiple social accounts to the same email
- Switch between authentication methods
- Enjoy a seamless, professional signup experience

---

**🎉 Your LinkedIn OAuth signup is now ready!** Users can sign up with their LinkedIn professional profiles in just one click.
