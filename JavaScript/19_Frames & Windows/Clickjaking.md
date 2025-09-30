## Clickjacking

- Clickjacking is for click, no for keyboard.

```html
<!-- Index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>

  <body>
    <style>
      iframe {
        /* iframe from Victim site */
        width: 400px;
        height: 100px;
        position: absolute;
        top: 5px;
        left: -14px;
        opacity: 0;
        z-index: 1;
      }
    </style>

    <div>Click to get rich now:</div>

    <!-- The url from the victim site -->
    <iframe src="facebook.html"></iframe>

    <button>Click here!</button>

    <div>...And you're cool (I'm a cool hacker actually)!</div>
  </body>
</html>
```

- This is Original Display that will display to user also have iframe that redirect to Invisible click which is,

```html
<!-- Facebook.html -->
<!DOCTYPE html>
<html>
  <body style="margin:10px;padding:10px">
    <input
      type="button"
      onclick="alert('Like pressed on facebook.html!')"
      value="I LIKE IT !"
    />
  </body>
</html>
```

- above code will invisible but this operate the Operation.

- this problem has 2 solution
  1. X-Frame-Option
  2. Frame-Ancestors (csp)

## X-Frame-Option

- `x-frame-option` can restrict iframe embedding.
- It must be sent exactly as HTTP-header: `the browser will ignore it if found in HTML <meta> tag`.So, `<meta http-equiv="X-Frame-Options"...>` won’t do anything.
- The header may have 3 values:

  1. `deny` - never ever show inside the frame.
  2. `sameorigin` - only same origin can embed.
  3. `Allow-from <URL>` - allowed only from a specific URL.

- Twitter uses `X-Frame-Options: SAMEORIGIN`.

```html
<iframe src="https://twitter.com"></iframe>
```

- above will not work because Twitter had no added this domain in their `X-Frame-Opacity`
- but in `X-Frame-Option` has Problem. Other sites won’t be able to show our page in a frame, even if they have good reasons to do so.
- there is one solution simple "cover" the page with `div` with style `width/height: 100%/100%`, that will interact all clicks.

# Samesite cookie Attribute

- A cookie with such attribute is only sent to a website if it's opened directly, not via a frame.
- for instance, `Facebook`, had samesite attribute on its authentication cookie, like

  ```
  Set-Cookie: authorization=secret; samesite
  ```

- Then such cookie wouldn’t be sent when Facebook is open in iframe from another site. So the attack would fail.

## Go back to Cross window Communication

- [Cross window Communication](./Cross_window%20Comunication.md)

## Now Learn about Array Buffer, Binary arrays  in Binary Data & files topic

- [Array Buffer, Binary arrays](../20_BinaryData_files/01%20ArrayBuffer.md)