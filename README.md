# Rani Kumari's Portfolio

A static portfolio built with HTML, CSS, and vanilla JavaScript. There is no framework, package manager, or build step.

## Folder structure

```text
myresume/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── certificates/
│   │   ├── convcup-fifa-bot-4th-place.pdf
│   │   └── edufabrica-generative-agentic-ai-certificate.png
│   └── images/
│       └── education/
│           └── rkm-lady-indra-singh-school.png
└── .vscode/
    ├── launch.json
    └── settings.json
```

## What each file does

- `index.html` contains the page sections, text, navigation, links, and image/document references.
- `css/style.css` contains the design, colors, hover transitions, and responsive layouts.
- `js/main.js` controls the mobile menu, smooth in-page navigation, and contact-form alert.
- `assets/certificates/` contains the Edufabrica workshop certificate and ConvCup PDF.
- `assets/images/education/` contains the local school image used in the Education section.
- `.vscode/` contains editor and browser-launch settings; it is not the website entry point.

## Run the website locally

Open a terminal in the project folder and run:

```powershell
py -m http.server 8080
```

Then open <http://localhost:8080>. Stop the server with `Ctrl+C`. Alternatively, use the VS Code Live Server extension; this project's Live Server port is set to `5501`.

## Common edits

- **Name, introduction, bio, section text, education, skills, experience, and projects:** edit the matching text in `index.html`.
- **Add a project:** copy one `<article class="project">...</article>` inside the `.projects-grid` in `index.html`, then update its heading and description. Add a screenshot to `assets/images/projects/` and an `<img>` element with its relative path if you want to display it. Add a GitHub link as an `<a href="...">` in that project card.
- **Upload, crop, or replace your profile photo:** select the camera button beside your name in the sidebar and choose an image. Drag the image in the circular crop preview, use the zoom slider or arrow keys, and select **Save photo**. The cropped image is saved in that browser's local storage; it is not uploaded to a server and is not included when you publish the site. Choose a photo again to replace it. To remove the saved photo, clear this site's local storage in your browser's developer tools.
- **Colors and font:** change the CSS variables at the top of `css/style.css` (`--palette-blue`, `--palette-purple`, `--palette-violet`, `--page-background`, `--card-background`, `--field-background`, `--accent-lavender`, and `--font-family`).
- **Add a certificate:** copy the certificate into `assets/certificates/`, then add a link or image to the relevant card in `index.html`. Use a relative path such as `assets/certificates/my-certificate.pdf`.
- **Social media and contact links:** update the LinkedIn, GitHub, and `mailto:` links in the `.social-cards` section of `index.html`.
- **Navigation and footer:** edit the sidebar links in `index.html`. This portfolio currently has no footer; add one inside `<main>`, after the final section, if you want one.
- **Animations and responsive layout:** edit the transitions and `@media` rules in `css/style.css`. The mobile menu, smooth scrolling, and email-form behavior are in `js/main.js`.

## Notes

- The contact form opens the visitor's email app with a prefilled message addressed to `ranikumari01936@gmail.com`. The visitor must review and send it in that app. A direct email link is also available if their app does not open. The website itself does not send or store messages.
- The contact form uses native required-field and email validation, explicit labels, keyboard-visible focus, and an announcement for screen readers.
- The profile photo uploader stores a resized copy only in the current browser. Visitors to the published portfolio cannot see your browser's saved photo; to publish a photo for everyone, add an image file to `assets/images/profile/` and reference that file from `index.html`.
- Do not put API keys or private credentials in these public frontend files.
- Font Awesome icons and two Education images load from external providers, so those items require an internet connection. The school image and certificates are stored locally.
- There is no profile photo or college ID card feature in the existing project; none has been invented or added.
- VS Code is configured to launch Chrome at `http://localhost:8080`. Start the local server first.
