require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// Facebook Sign In imports (commented out - uncomment when ready to use)
// const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
// Apple Sign In imports (commented out - uncomment when ready to use)
// const AppleStrategy = require("passport-apple").Strategy;
// const fs = require("fs");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/social-signup")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.googleId && !this.linkedinId && !this.instagramId; // Required only if not social user
    },
    unique: true,
    sparse: true, // Allows multiple null values for unique field
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.linkedinId && !this.instagramId; // Required only if not social user
    },
    minlength: 6,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  linkedinId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // appleId: {
  //   type: String,
  //   unique: true,
  //   sparse: true,
  // },
  // facebookId: {
  //   type: String,
  //   unique: true,
  //   sparse: true,
  // },
  instagramId: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatar: {
    type: String,
  },
  authMethod: {
    type: String,
    enum: ["local", "google", "linkedin", "apple", "facebook", "instagram"],
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = profile.id;
          existingUser.authMethod = "google";
          existingUser.avatar = profile.photos[0].value;
          if (!existingUser.username) {
            existingUser.username = profile.displayName
              .replace(/\s+/g, "")
              .toLowerCase();
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          authMethod: "google",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// LinkedIn OAuth Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/api/auth/linkedin/callback",
      // scope: ["r_emailaddress", "r_liteprofile"],
      scope: ["openid", "profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ linkedinId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          // Link LinkedIn account to existing user
          existingUser.linkedinId = profile.id;
          existingUser.authMethod = "linkedin";
          existingUser.avatar =
            profile.photos?.[3]?.value || profile.photos?.[0]?.value; // LinkedIn provides multiple photo sizes
          if (!existingUser.username) {
            existingUser.username = profile.displayName
              .replace(/\s+/g, "")
              .toLowerCase();
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          linkedinId: profile.id,
          username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
          email: profile.emails[0].value,
          avatar: profile.photos?.[3]?.value || profile.photos?.[0]?.value,
          authMethod: "linkedin",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

// Instagram OAuth Strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/api/auth/instagram/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ instagramId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        const existingUser = await User.findOne({
          email: profile.emails && profile.emails[0].value,
        });

        if (existingUser) {
          // Link Instagram account to existing user
          existingUser.instagramId = profile.id;
          existingUser.authMethod = "instagram";
          existingUser.avatar = profile._json && profile._json.profile_picture;
          if (!existingUser.username) {
            existingUser.username = profile.username
              .replace(/\s+/g, "")
              .toLowerCase();
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          instagramId: profile.id,
          username: profile.username.replace(/\s+/g, "").toLowerCase(),
          email: profile.emails && profile.emails[0].value,
          avatar: profile._json && profile._json.profile_picture,
          authMethod: "instagram",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

// Apple OAuth Strategy (Commented Out - Uncomment when ready to use)
/*
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_CLIENT_ID_TEAM,
      keyID: process.env.APPLE_KEY_ID,
      key: fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH).toString(),
      callbackURL: "/api/auth/apple/callback",
      scope: ["name", "email"],
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        let user = await User.findOne({ appleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Apple provides email and name only on first login
        const email = profile.email || `${profile.id}@privaterelay.appleid.com`;
        const displayName = profile.name 
          ? `${profile.name.firstName} ${profile.name.lastName}`.trim()
          : `user${profile.id.slice(-8)}`;

        // Check if user exists with same email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // Link Apple account to existing user
          existingUser.appleId = profile.id;
          existingUser.authMethod = "apple";
          if (!existingUser.username) {
            existingUser.username = displayName
              .replace(/\s+/g, "")
              .toLowerCase();
          }
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          appleId: profile.id,
          username: displayName.replace(/\s+/g, "").toLowerCase(),
          email: email,
          authMethod: "apple",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
*/

// Validation middleware
const validateSignup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters long" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address" });
  }

  next();
};

// Routes
app.post("/api/signup", validateSignup, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" },
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Google OAuth Routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173?error=google_auth_failed",
    session: false,
  }),
  async (req, res) => {
    try {
      // Create JWT token for Google user
      const token = jwt.sign(
        {
          userId: req.user._id,
          username: req.user.username,
          email: req.user.email,
          authMethod: req.user.authMethod,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      // Redirect to frontend with token
      res.redirect(
        `http://localhost:5173?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            authMethod: req.user.authMethod,
          }),
        )}`,
      );
    } catch (error) {
      console.error("Google auth callback error:", error);
      res.redirect("http://localhost:5173?error=server_error");
    }
  },
);

// LinkedIn OAuth Routes
app.get(
  "/api/auth/linkedin",
  passport.authenticate("linkedin", {
    // scope: ["r_emailaddress", "r_liteprofile"],
    scope: ["openid", "profile", "email"],
  }),
);

app.get(
  "/api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "http://localhost:5173?error=linkedin_auth_failed",
    session: false,
  }),
  async (req, res) => {
    try {
      // Create JWT token for LinkedIn user
      const token = jwt.sign(
        {
          userId: req.user._id,
          username: req.user.username,
          email: req.user.email,
          authMethod: req.user.authMethod,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      // Redirect to frontend with token
      res.redirect(
        `http://localhost:5173?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            authMethod: req.user.authMethod,
          }),
        )}`,
      );
    } catch (error) {
      console.error("LinkedIn auth callback error:", error);
      res.redirect("http://localhost:5173?error=server_error");
    }
  },
);

// Instagram OAuth Routes
app.get("/api/auth/instagram", passport.authenticate("instagram"));

app.get(
  "/api/auth/instagram/callback",
  passport.authenticate("instagram", {
    failureRedirect: "http://localhost:5173?error=instagram_auth_failed",
    session: false,
  }),
  async (req, res) => {
    try {
      // Create JWT token for Instagram user
      const token = jwt.sign(
        {
          userId: req.user._id,
          username: req.user.username,
          email: req.user.email,
          authMethod: req.user.authMethod,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      // Redirect to frontend with token
      res.redirect(
        `http://localhost:5173?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            authMethod: req.user.authMethod,
          }),
        )}`,
      );
    } catch (error) {
      console.error("Instagram auth callback error:", error);
      res.redirect("http://localhost:5173?error=server_error");
    }
  },
);

// Facebook OAuth Routes (Commented Out - Uncomment when ready to use)
/*
app.get(
  "/api/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);

app.get(
  "/api/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173?error=facebook_auth_failed",
    session: false,
  }),
  async (req, res) => {
    try {
      // Create JWT token for Facebook user
      const token = jwt.sign(
        {
          userId: req.user._id,
          username: req.user.username,
          email: req.user.email,
          authMethod: req.user.authMethod,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      // Redirect to frontend with token
      res.redirect(
        `http://localhost:5173?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            authMethod: req.user.authMethod,
          }),
        )}`,
      );
    } catch (error) {
      console.error("Facebook auth callback error:", error);
      res.redirect("http://localhost:5173?error=server_error");
    }
  },
);
*/

// Apple OAuth Routes (Commented Out - Uncomment when ready to use)
/*
app.get(
  "/api/auth/apple",
  passport.authenticate("apple", { scope: ["name", "email"] }),
);

app.get(
  "/api/auth/apple/callback",
  passport.authenticate("apple", {
    failureRedirect: "http://localhost:5173?error=apple_auth_failed",
    session: false,
  }),
  async (req, res) => {
    try {
      // Create JWT token for Apple user
      const token = jwt.sign(
        {
          userId: req.user._id,
          username: req.user.username,
          email: req.user.email,
          authMethod: req.user.authMethod,
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "24h" },
      );

      // Redirect to frontend with token
      res.redirect(
        `http://localhost:5173?token=${token}&user=${encodeURIComponent(
          JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            authMethod: req.user.authMethod,
          }),
        )}`,
      );
    } catch (error) {
      console.error("Apple auth callback error:", error);
      res.redirect("http://localhost:5173?error=server_error");
    }
  },
);
*/

// Get current user info (protected route)
app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret",
    );
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        authMethod: user.authMethod,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
