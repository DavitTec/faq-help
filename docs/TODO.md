# TODO for faq-help

This document outlines upcoming tasks, features, and improvements for the `faq-help` package (v0.3.0). 

Priorities are marked as [High], [Medium], or [Low].

## Integration and Testing

- [High] Replace `lib/logger.sh` with `davit-logger-pro` adapters (Bash and Node.js/CommonJS).
  - Integrate the logger from [davit-logger-pro](https://github.com/DavitTec/davit-logger-pro).
  - Update relevant scripts and source files to use the new logger.

- [High] Test `davit-logger-pro` in production-like processes.
  - Simulate phases such as build, deployment, and runtime in different package environments.
  - Evaluate handling of debug, info, warn, error, and critical levels.
  - Monitor system inspection features (e.g., CPU temp, memory usage, ping checks) on Linux.

- [Medium] Develop testing procedures.
  - Create unit tests for logger integration using frameworks like Jest (for Node.js) or Bats (for Bash).
  - Set up integration tests to verify logger behaviour in FAQ rendering workflows.
  - Include edge cases: high-load scenarios, error code resolution, and fail-safe defaults.

## FAQ and Content Development

- [High] Build a comprehensive FAQ section.
  - Compile common questions and answers related to the Davit ecosystem.
  - Structure FAQs in `data/faq-help/` using JSON or Markdown formats.

- [Medium] Create answer slides.
  - Design slide templates using Nunjucks for dynamic generation.
  - Integrate with server to render slides as HTML/PDF outputs.
  - Add visual elements (e.g., via SCSS/CSS) for better presentation.

## Documentation and Structure

- [Medium] Expand documentation.
  - Add detailed usage examples to README.md.
  - Create API docs for `server.js` endpoints.
  - Document configuration options in `config/`.

- [Low] Add ROADMAP.md.
  - Outline long-term goals, such as multi-language support or web UI for FAQ management.

## Enhancements and Features

- [Medium] Implement error handling with `davit-logger-pro` codes.
  - Map FAQ-specific errors to the logger's schema (e.g., validation errors for content).

- [Low] Add environment variable support.
  - Align with `davit-logger-pro` for configurable logging levels and themes.

- [Low] Performance optimisations.
  - Benchmark server response times for FAQ queries.
  - Optimise data loading from `data/faq-help/`.

## Miscellaneous

- [Low] Update dependencies and audit for security.
- [Low] Explore global installation options similar to `davit-logger-pro`.
- [Low] Add CI/CD pipelines for automated testing and deployment.

Track progress by checking off items as they are completed. Refer to the `davit-logger-pro` ROADMAP.md for aligned features.