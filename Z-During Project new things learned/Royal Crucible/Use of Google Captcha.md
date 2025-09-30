# Google Captch implement in Web page

- To add a `Google reCAPTCHA` like in the image (v2 "I'm not a robot" checkbox) to your website, follow these steps:

### Step 1: Register your site with Google reCAPTCHA

1. Go to: [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Register a new site:

   - **Label**: Any name (e.g., My Website)
   - **reCAPTCHA type**: reCAPTCHA v2 → "I'm not a robot" Checkbox
   - **Domains**: e.g., `yourdomain.com` or localhost for testing

3. Submit, and you’ll get:

   - Site key
   - Secret key

### Step 2: Add reCAPTCHA Script to HTML

- In your `<head>` tag:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

### Step 3: Add the reCAPTCHA Widget in Your Form

```html
<!-- Body -->
<form action="/submit" method="POST">
  <!-- Your input fields -->
  
  <div class="g-recaptcha" data-sitekey="6LcZjp0rAAAAADG-4xv3OowjlDLXlOtxOzFzhyLWD"></div>

  <button type="submit">Submit</button>
</form>
```

### Step 4: Validate reCAPTCHA on Server (Backend Required)

- On the backend (Node.js example):

```js
const axios = require("axios");

app.post("/submit", async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const secretKey = "6LcZjp0rAAAAAPgrlV0Hzd6D9Vkx2svbMT8KJPQ9D";

  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  );

  if (data.success) {
    // Proceed with form submission
  } else {
    // Handle failed reCAPTCHA
  }
});

```
