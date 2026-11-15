# B. Surendra – Personal Website

This is a static, mobile-friendly personal website. It is designed so you can update links and photographs later without changing the page layout.

## Files

- `index.html` – website content and page sections
- `styles.css` – colours, layout and responsive design
- `site-config.js` – editable links, photo list and contact email
- `script.js` – menu, photo slideshow and link rendering
- `assets/` – put your profile photo and gallery photos here

## 1. Change the registration and other links

Open `site-config.js` in a text editor.

Find the `registrationLinks` section and replace the sample URL:

`https://forms.gle/REPLACE_WITH_YOUR_FORM_LINK`

with your real Google Form URL. Do the same for the optional second form, circulars and useful links. You can change the button titles and descriptions too.

For a link you do not need, delete its entire `{ ... }` entry, including the comma where appropriate. Keep the square brackets.

**Important:** Sample links containing `REPLACE_` or `example.com` are intentionally inactive. Replace them before publishing.

## 2. Add your profile photograph

1. Put your photograph in the `assets` folder.
2. Name it `profile-photo.jpg`.
3. Keep that exact file name, or change `profilePhoto` in `site-config.js`.

## 3. Add gallery photographs

1. Put your photos inside `assets/gallery/`.
2. Open `site-config.js`.
3. Add entries inside `galleryImages`, for example:

```js
galleryImages: [
  { src: "assets/gallery/meeting-2026.jpg", caption: "Association meeting, 2026" },
  { src: "assets/gallery/welfare-event.jpg", caption: "Welfare programme" }
],
```

The slideshow automatically rotates every five seconds. Visitors can pause it or move between photos.

## 4. Add your email address

In `site-config.js`, change:

`contactEmail: ""`

to your preferred public contact email, for example:

`contactEmail: "yourname@example.com"`

Only add an address you are comfortable publishing publicly.

## 5. Preview the website

Open `index.html` in a modern browser. For best results, upload the complete folder to your hosting service so the CSS, JavaScript and assets remain together.

## 6. Publish using free GitHub Pages

1. Sign in to GitHub and create a new public repository, for example `bsurendra-personal-website`.
2. Upload all files and folders from this package (not just the ZIP file).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder, then Save.
6. GitHub will provide your website address after publishing.

The exact GitHub Pages URL depends on your GitHub username and repository name.

## Before publishing

- Replace all dummy form and circular links.
- Add your own profile and gallery photos.
- Add only contact details you intend to make public.
- Do not put member PF numbers, dates of birth, phone numbers or private member spreadsheets in this public website.
- Confirm you have permission to publish association material and photographs.
- This is an independently maintained personal website, not an official SBI or association website.
