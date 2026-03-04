# FAQ Help

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/DavitTec/faq-help?style=for-the-badge&logo=github)](https://github.com/DavitTec/faq-help/tag)
[![GitHub open issues](https://img.shields.io/github/issues-raw/DavitTec/faq-help?style=for-the-badge&label=Open%20Issues)](https://github.com/DavitTec/faq-help/issues)
[![GitHub top language](https://img.shields.io/github/languages/top/DavitTec/faq-help?style=for-the-badge)](https://github.com/DavitTec/davit-logger-pro)
[![GitHub license](https://img.shields.io/github/license/DavitTec/faq-help?style=for-the-badge)](https://github.com/DavitTec/davit-logger-pro)

---

## Overview

**faq-help** is a Node.js-based application designed to manage, serve, and render FAQ (Frequently Asked Questions) content. It provides a server-side solution for delivering help documentation, potentially through dynamic templating and data-driven responses. The project uses modern JavaScript tooling with pnpm for dependency management and includes support for styling and templating via SCSS, CSS, and Nunjucks.

This package is part of the Davit ecosystem and serves as a testbed for integrating and evaluating advanced utilities, such as the `davit-logger-pro` logging framework. It allows for experimentation with logging in production-like scenarios, testing procedures, and building FAQ slides.

Also: preview https://davittec.github.io/faq-help/

## Features

- Server-side FAQ content delivery via `server.js`.
- Data storage for FAQs in structured formats (e.g., JSON in `data/faq-help/`).
- Modular structure with libraries (`lib/`), scripts (`scripts/`), and source code (`src/`).
- Configuration options in `config/` for customisation.
- Early-stage integration testing for logging utilities.

#### Structure

- Structure and Organisation:
  - **config/**: For customizable settings.
  - **data/faq-help/**: Stores FAQ data (likely JSON or similar for dynamic rendering).
  - **docs/**: Includes files like TODO.md for planned tasks (e.g., logger integration, testing procedures, FAQ building).
  - **lib/**: Reusable utilities (e.g., potentially replacing logger.sh with davit-logger-pro).
  - **scripts/**: Automation tools, including build scripts for generating the static public/ folder.
  - **src/**: Core application code, handling rendering (e.g., via Nunjucks for templates).
  - **Root files**: `.gitignore`, [CHANGELOG.md](CHANGELOG.md) (tracks updates), [LICENSE.md](LICENSE.md) (MIT), `package.json` (defines dependencies like pnpm, scripts for build/dev), `server.js` (entry point for serving content).
- **GitHub Setup**: Includes `.github/workflows/` with a deployment workflow (e.g., `deploy-pages.yml`) that automates building and pushing the public/ folder to gh-pages on tags.
- **Features and Integrations**:
  - Uses modern tools: pnpm for deps, Nunjucks for templating, SCSS/CSS for styling.
  - Designed for static site generation (outputs to public/), with "dev"/"prod" distinctions (e.g., via MODE env and basePath for paths).
  - Testbed for davit-logger-pro: Good for evaluating logging in production phases.
  - Potential for multiple subdomains/projects, but focuses on "faq-help" for GitHub Pages.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DavitTec/faq-help.git
   cd faq-help
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Usage

1. Start the server:
   ```bash
   node server.js
   
   # or  
   
   pnpm dev   # must build first
   ```

   This will launch the application, potentially serving FAQ content over HTTP. (Note: Specific endpoints and configurations are under development.)

2. For development or testing:
   - Modify FAQ data in `data/faq-help/`.
   - Use scripts in `scripts/` for automation tasks.

## Integration with Davit Logger Pro

This project is being used to test the `davit-logger-pro` package (available at [https://github.com/DavitTec/davit-logger-pro](https://github.com/DavitTec/davit-logger-pro)). It will replace the existing `lib/logger.sh` with adapters from `davit-logger-pro` to evaluate structured logging in Node.js and Bash environments.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

See `./docs/TODO.md` for planned features and tasks.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For questions or support, open an issue on GitHub or contact the maintainer at [DavitTec](https://github.com/DavitTec).

---



