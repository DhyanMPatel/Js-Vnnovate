# GitHub OAuth Setup Guide

This guide will help you set up GitHub OAuth for your MERN signup application.

## 🚀 Quick Setup

### 1. Create GitHub OAuth App

1. **Go to GitHub Developer Settings**: https://github.com/settings/developers
2. **Create a new OAuth App**:
   - Click "OAuth Apps" → "New OAuth App"
   - Enter app name (e.g., "Social Signup App")
   - Enter homepage URL: `http://localhost:5173`
   - Enter authorization callback URL: `http://localhost:5000/api/auth/github/callback`
   - Enter app description (optional)
   - Click "Register application"

### 2. Get GitHub Credentials

1. **Copy your credentials**:
   - **Client ID**: Found in your OAuth app settings
   - **Client Secret**: Click "Generate a new client secret" to create one

### 3. Update Environment Variables

In your `backend/.env` file, add your GitHub credentials:

```env
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

### 4. Install Dependencies

```bash
cd backend
npm install passport-github2
```

### 5. Start Applications

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

### GitHub OAuth Flow:

1. **User clicks "Sign up with GitHub"** → Redirects to GitHub authorization screen
2. **User approves** → GitHub redirects to your callback URL with authorization code
3. **Backend exchanges code for tokens** → Gets user profile information
4. **Create or find user in database** → Generate JWT token
5. **Redirect back to frontend** → User is logged in automatically

### Features Implemented:

- ✅ **New User Registration**: Creates new user with GitHub profile data
- ✅ **Account Linking**: Links GitHub account to existing email users
- ✅ **Profile Pictures**: Imports GitHub avatar
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices

## 🔧 Configuration Options

### Development vs Production

**Development (.env):**
```env
GITHUB_CLIENT_ID=1234567890abcdef
GITHUB_CLIENT_SECRET=abcdef1234567890abcdef1234567890
```

**Production:**
- Update callback URL to your production domain
- Use HTTPS for all URLs
- Set `cookie: { secure: true }` in session config

### GitHub App Permissions

The app requests these permissions by default:
- `user:email`: Access to user's email address
- `user:profile`: Access to user's public profile information

### Custom Redirect URL

To change the frontend redirect URL, update this line in `backend/index.js`:

```javascript
res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(JSON.stringify({...}))}`);
```

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" Error**
   - Check that the callback URL in GitHub App Settings matches exactly
   - Include the full URL: `http://localhost:5000/api/auth/github/callback`

2. **"bad_client_credentials" Error**
   - Verify your Client ID and Client Secret are correct
   - Make sure you're using the correct credentials from your OAuth app

3. **"access_denied" Error**
   - User denied authorization - this is expected behavior
   - User needs to try signing up again

4. **CORS Issues**
   - Ensure backend is running before frontend
   - Check that frontend URL is in CORS allowed origins

5. **MongoDB Connection Error**
   - Make sure MongoDB is running on your machine
   - Check the MONGO_URI in your .env file

### Debug Mode:

Add these console logs to `backend/index.js` for debugging:

```javascript
// In GitHub Strategy callback
console.log('GitHub profile:', profile);
console.log('Existing user:', existingUser);
console.log('New user:', newUser);
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Use HTTPS in production (required by GitHub)
3. **Session Security**: Set `secure: true` for cookies in production
4. **Token Expiration**: JWT tokens expire in 24 hours (configurable)
5. **Input Validation**: All user inputs are validated on both frontend and backend

## 📱 Testing the Application

1. **Start both servers** (backend on 5000, frontend on 5173)
2. **Open frontend** in browser
3. **Click "Sign up with GitHub"**
4. **Complete GitHub authorization**
5. **Verify user is created** in MongoDB
6. **Check profile picture and data** display correctly

### Database Verification:

Connect to MongoDB and check the users collection:

```javascript
// In MongoDB shell
use social-signup
db.users.find().pretty()
```

You should see users with `authMethod: "github"` and their GitHub profile data.

## 🎨 Customization

### Add More GitHub Permissions:

Modify the GitHub strategy to request additional permissions:

```javascript
app.get(
  "/api/auth/github",
  passport.authenticate("github", { 
    scope: ["user:email", "repo"] 
  }),
);
```

### Customize User Data:

Modify the GitHub strategy callback to extract additional user information:

```javascript
const newUser = new User({
  githubId: profile.id,
  username: profile.username.replace(/\s+/g, "").toLowerCase(),
  email: profile.emails && profile.emails[0].value,
  avatar: profile._json && profile._json.avatar_url,
  fullName: profile._json && profile._json.name,
  bio: profile._json && profile._json.bio,
  location: profile._json && profile._json.location,
  company: profile._json && profile._json.company,
  blog: profile._json && profile._json.blog,
  followers: profile._json && profile._json.followers,
  following: profile._json && profile._json.following,
  publicRepos: profile._json && profile._json.public_repos,
  authMethod: 'github'
});
```

## 📚 GitHub API Reference

- [GitHub OAuth Documentation](https://docs.github.com/en/free-pro-team@latest/apps/building-oauth-apps/)
- [GitHub Developer Settings](https://github.com/settings/developers)
- [Passport.js GitHub Strategy](https://www.passportjs.org/packages/passport-github2/)

## 🔄 Multiple OAuth Providers

Your application now supports:
- ✅ **Email/Password**: Traditional registration
- ✅ **Google OAuth**: One-click Google signup
- ✅ **LinkedIn OAuth**: Professional LinkedIn signup
- ✅ **Instagram OAuth**: Visual social media signup
- ✅ **GitHub OAuth**: Developer-focused signup
- 🔄 **Facebook OAuth**: Social media signup (commented out)
- 🔄 **Apple OAuth**: Secure Apple signup (commented out)

### Key Differences for GitHub:

- **Developer-Focused**: Appeals to developers and technical users
- **Rich Profile Data**: Access to repositories, followers, bio, etc.
- **Professional Network**: GitHub is the professional network for developers
- **Open Source Friendly**: Perfect for open source projects and communities
- **Technical Demographics**: Attracts users with technical backgrounds

## 🚨 Important Notes

1. **GitHub Developer Account**: Required (free)
2. **OAuth App Creation**: Must create GitHub OAuth app
3. **Callback URI**: Must match exactly in GitHub settings
4. **HTTPS Required**: GitHub requires HTTPS in production
5. **Rate Limits**: GitHub has API rate limits for unauthenticated requests
6. **User Consent**: Users must explicitly authorize your application

## 📊 GitHub vs Other OAuth Providers

| Feature | GitHub | Google | LinkedIn | Instagram |
|---------|--------|--------|----------|-----------|
| **Setup Complexity** | Easy | Easy | Medium | Medium |
| **User Base** | 100M+ | 1.8B+ | 900M+ | 2B+ |
| **Profile Data** | Rich | Good | Professional | Visual |
| **Developer Focus** | ✅ High | ❌ Low | Medium | Low |
| **API Access** | Extensive | Full API | Professional API | Basic Display |
| **Cost** | Free | Free | Free | Free |
| **App Review** | Not Required | Not Required | Not Required | May Required |

## 🎯 Best Practices for GitHub OAuth

1. **Clear Value Proposition**: Explain why you need GitHub access
2. **Minimal Permissions**: Only request necessary permissions
3. **Secure Storage**: Store client secrets securely
4. **Error Handling**: Provide clear error messages
5. **User Experience**: Seamless flow with clear feedback
6. **Testing**: Test thoroughly in development environment

---

**🎉 Your GitHub OAuth signup is now ready!** Users can sign up with their GitHub accounts and enjoy seamless developer-focused authentication.
