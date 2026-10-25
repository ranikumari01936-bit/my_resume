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
- `css/style.css` contains the design, colors, hover transitions, preview controls, and responsive layouts.
- `js/main.js` controls the mobile menu, desktop/mobile preview buttons, smooth in-page navigation, and contact-form alert.
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
- **Add a project:** copy one `<article class="project">...</article>` inside the `.projects-grid` in `index.html`, then update its heading and description. Add a screenshot to `assets/images/projects/` (create the folder when needed) and an `<img>` element with its relative path if you want to display it. Add a GitHub link as an `<a href="...">` in that project card.
- **Replace or add a profile photo:** no profile photo is currently used by this site. Put your own image in `assets/images/profile/` (create the folder), then add an `<img src="assets/images/profile/your-photo.jpg" alt="Portrait of Rani Kumari">` where you want it in the hero section of `index.html`. Update the filename to match your image.
- **Colors and font:** change the CSS variables at the top of `css/style.css` (`--palette-blue`, `--palette-purple`, `--palette-violet`, `--page-background`, `--card-background`, `--field-background`, `--accent-lavender`, and `--font-family`).
- **Add a certificate:** copy the certificate into `assets/certificates/`, then add a link or image to the relevant card in `index.html`. Use a relative path such as `assets/certificates/my-certificate.pdf`.
- **Social media and contact links:** update the LinkedIn, GitHub, and `mailto:` links in the `.social-cards` section of `index.html`.
- **Navigation and footer:** edit the sidebar links in `index.html`. This portfolio currently has no footer; add one before `</div>` closing `#site-preview` if you want one.
- **Animations and responsive layout:** edit the transitions and `@media` rules in `css/style.css`. The mobile menu, preview-size switch, smooth scrolling, and form alert are in `js/main.js`.

## Notes

- The contact form currently displays a confirmation alert only; it does not send or store messages. A secure backend or trusted form service is required to receive submissions. Do not put API keys or private credentials in these public frontend files.
- Font Awesome icons and two Education images load from external providers, so those items require an internet connection. The school image and certificates are stored locally.
- There is no profile photo or college ID card feature in the existing project; none has been invented or added.
- VS Code is configured to launch Chrome at `http://localhost:8080`. Start the local server first.
