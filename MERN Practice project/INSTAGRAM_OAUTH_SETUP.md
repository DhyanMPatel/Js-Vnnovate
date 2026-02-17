# Instagram OAuth Setup Guide

This guide will help you set up Instagram OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Create Instagram App

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a new app**:
   - Click "My Apps" → "Create App"
   - Select "Business" or "Other" as app type
   - Enter app name (e.g., "Social Signup App")
   - Enter contact email
   - Click "Create App"

3. **Add Instagram Basic Display product**:
   - In your app dashboard, click "Add Product"
   - Select "Instagram Basic Display"
   - Configure the Instagram Basic Display settings

### 2. Configure Instagram Basic Display Settings

1. **Set up OAuth redirect URI**:
   - Go to "Instagram Basic Display" → "Settings"
   - Add "Valid OAuth Redirect URIs":
   - Enter: `http://localhost:5000/api/auth/instagram/callback`
   - Click "Save Changes"

2. **Get App Credentials**:
   - Go to "Settings" → "Basic"
   - Copy the **App ID** and **App Secret**

3. **Enable Instagram permissions**:
   - In "Instagram Basic Display" → "Permissions"
   - Add required permissions: `instagram_graph_user_profile`, `instagram_graph_user_media`

### 3. Update Environment Variables

In your `backend/.env` file, replace the placeholder values:

```env
INSTAGRAM_CLIENT_ID=your_instagram_app_id_here
INSTAGRAM_CLIENT_SECRET=your_instagram_app_secret_here
```

### 4. Install Dependencies

```bash
cd backend
npm install passport-instagram
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

### Instagram OAuth Flow:

1. **User clicks "Sign up with Instagram"** → Redirects to Instagram consent screen
2. **User approves** → Instagram redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with Instagram profile data
- ✅ **Account Linking**: Links Instagram account to existing email users
- ✅ **Profile Pictures**: Imports Instagram profile picture
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
INSTAGRAM_CLIENT_ID=1234567890123456
INSTAGRAM_CLIENT_SECRET=abcdef1234567890abcdef12345678
```

**Production:**
- Update redirect URI to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### Instagram App Review

For production use, your app may need to go through Facebook's App Review process:
- **Development**: Works with your own Instagram account
- **Production**: Requires approval for public use
- **Permissions**: Basic Display permissions are usually pre-approved

### Custom Redirect URL

To change the frontend redirect URL, update this line in `backend/index.js`:

```javascript
res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify({...}))}`);
```

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that the redirect URI in Instagram App Settings matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/instagram/callback`

2. **"invalid_client" Error**
   - Verify your App ID and App Secret are correct
   - Make sure your Instagram app is in "Development" mode

3. **"OAuthException" Error**
   - Check that your app has the Instagram Basic Display product added
   - Ensure the redirect URI is properly configured

4. **"Insufficient permissions" Error**
   - Make sure you've requested the correct permissions
   - Check that your app has the necessary Instagram permissions

5. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that the frontend URL is in the CORS allowed origins

6. **MongoDB Connection Error**
   - Make sure MongoDB is running on your machine
   - Check the MONGO_URI in your .env file

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In Instagram Strategy callback
console.log('Instagram profile:', profile);
console.log('Existing user:', existingUser);
console.log('New user:', newUser);
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Use HTTPS in production (required by Instagram)
3. **Session Security**: Set `secure: true` for cookies in production
4. **Token Expiration**: JWT tokens expire in 24 hours (configurable)
5. **Input Validation**: All user inputs are validated on both frontend and backend

## 📱 Testing the Application

1. **Start both servers** (backend on 5000, frontend on 5173)
2. **Open frontend** in browser
3. **Click "Sign up with Instagram"**
4. **Complete Instagram authentication**
5. **Verify user is created** in MongoDB
6. **Check profile picture and data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "instagram"` and their Instagram profile data.

## 🎨 Customization

### Add More Instagram Permissions:

Modify the Instagram strategy to request additional permissions:

```javascript
app.get(
  "/api/auth/instagram",
  passport.authenticate("instagram", { 
    scope: ["basic", "likes", "comments"] 
  }),
);
```

### Customize User Data:

Modify the Instagram strategy callback to extract additional user information:

```javascript
const newUser = new User({
  instagramId: profile.id,
  username: profile.username.replace(/\s+/g, "").toLowerCase(),
  email: profile.emails && profile.emails[0].value,
  avatar: profile._json && profile._json.profile_picture,
  fullName: profile._json && profile._json.full_name,
  bio: profile._json && profile._json.bio,
  website: profile._json && profile._json.website,
  followers: profile._json && profile._json.counts && profile._json.counts.followed_by,
  following: profile._json && profile._json.counts && profile._json.counts.follows,
  authMethod: 'instagram'
});
```

## 📚 Instagram API Reference

- [Instagram Basic Display Documentation](https://developers.facebook.com/docs/instagram-basic-display-api/)
- [Facebook App Development](https://developers.facebook.com/docs/apps/)
- [Passport.js Instagram Strategy](https://www.passportjs.org/packages/passport-instagram/)

## 🔄 Multiple OAuth Providers

Your application now supports:
- ✅ **Email/Password**: Traditional registration
- ✅ **Google OAuth**: One-click Google signup
- ✅ **LinkedIn OAuth**: Professional LinkedIn signup
- ✅ **Instagram OAuth**: Visual social media signup
- 🔄 **Facebook OAuth**: Social media signup (commented out)
- 🔄 **Apple OAuth**: Secure Apple signup (commented out)

### Key Differences for Instagram:

- **Visual Platform**: Leverages Instagram's visual-first approach
- **Basic Display API**: Simplified API compared to Facebook Graph API
- **Profile Integration**: Access to Instagram profile data and media
- **Younger Demographics**: Popular with younger user base
- **Mobile-First**: Optimized for mobile user experience

## 🚨 Important Notes

1. **Facebook Developer Account**: Required (free)
2. **App Creation**: Must create Facebook app first, then add Instagram Basic Display
3. **Redirect URI**: Must match exactly in Instagram settings
4. **HTTPS Required**: Instagram requires HTTPS in production
5. **App Review**: Production use may require Facebook approval
6. **Permission Limits**: Instagram Basic Display has limited permissions compared to Graph API

## 📊 Instagram vs Other OAuth Providers

| Feature | Instagram | Google | LinkedIn | Email |
|---------|-----------|--------|----------|-------|
| **Setup Complexity** | Medium | Easy | Medium | Easy |
| **User Base** | 2B+ | 1.8B+ | 900M+ | N/A |
| **Profile Data** | Visual | Good | Professional | Basic |
| **App Review** | Required | Not Required | Not Required | N/A |
| **Cost** | Free | Free | Free | N/A |
| **API Access** | Basic Display | Full API | Professional API | N/A |

---

**🎉 Your Instagram OAuth signup is now ready!** Users can sign up with their Instagram accounts and enjoy seamless visual social authentication.
