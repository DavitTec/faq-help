# Project Title: Mobile-First Implementation

OPENED Issue: https://github.com/DavitTec/faq-help/issues/2

GIT Branch: feat/#2-mobile-first-responsive

- [x] docs: add Mobile-First Implimentation Doc

- [ ] **INPUT**

  - [x] original `styles/style.scss`

  - [x] Current state: Basic SCSS/CSS with no or minimal media queries

  - [x] Baseline version: v0.3.4  (git tag)

  - [x] Assets: **scss/main.scss,** public/css/style.css, slides in data/faq-help/

**PROCESS**

- Decide on structured folder and SASS or SCSS (Decide?)
- Define SCSS variables & mixins for breakpoints
- Apply base styles for mobile-small
- Add progressive enhancements (mobile-large → tablet → laptop → desktop)
- Handle portrait/landscape orientations
- Manual testing with browser dev tools (emulate iPhone SE, Galaxy, iPad, etc.)
- Update build to compile updated SCSS

**OUTPUT**

- Expected version: v0.3.0 (minor feature)
- Validations: No horizontal scroll on <768px, readable text, adaptive padding
- Deployed site shows correct layout on mobile emulation

**CHECKLOOP**

- Test cases: Portrait small phone, landscape large phone, tablet rotation
- Tools: Chrome/Firefox dev tools device mode
- Success criteria: Lighthouse mobile score >80 (accessibility/performance)

## Description

### Feature Branch for Mobile-First Implementation

- [x] Create branch

To implement the "mobile-first" responsive design strategy in your `faq-help` project (https://github.com/DavitTec/faq-help), we'll create a dedicated feature branch. This keeps development isolated, allows for iterative commits, and ensures clean integration back to `main`. The strategy uses your real project as an example: starting with base mobile styles in SCSS (e.g., for small phones), then progressively enhancing for larger mobiles, tablets, laptops, and desktops via media queries and mixins, as outlined in the previous response. We'll test locally with browser dev tools emulating devices (e.g., iPhone SE for small mobile, Galaxy S20 for large mobile) and orientations.

After completing and merging this branch in `faq-help`, you'll replicate the process in your upstream "presentation-engine" project (assuming it's the template/source repo that generated `faq-help`). This ensures the mobile-first refinements propagate to the core engine for future projects.

#### Suggested Branch Name

- [x] branch name: feat/#2-mobile-first-responsive

Use a descriptive, kebab-case name following Git Flow conventions: `feature/mobile-first-responsive`.  
This indicates it's a feature branch focused on mobile-first design implementation.

#### Branch Objectives

- **Primary Goal**: Refactor SCSS/CSS to adopt a mobile-first approach, defining breakpoints for mobile (small/large), tablet, laptop, and desktop, with orientation handling.
- **Why SCSS over SASS:**
  1. **Familiar Syntax** - Uses standard CSS syntax with `{}` and `;`, making it easier for anyone who knows CSS
  2. **Better Adoption** - More widely used in the industry with better tooling and community support
  3. **CSS Compatibility** - All valid CSS is valid SCSS, making it easy to migrate existing stylesheets
  4. **Easier Collaboration** - Team members can adopt it faster
  5. **Better IDE Support** - More extensions and plugins available for SCSS
- **Scope**:
  - Add SCSS variables and mixins for breakpoints.
  - Update styles for existing elements (e.g., `.slide`, body, headings) to start mobile-small and enhance progressively.
  - Test responsiveness on emulated devices, ensuring no overflows, readable fonts, and adaptive layouts (e.g., flex in landscape).
  - No new features—just responsive refinements.
- **Expected Outcomes**: Improved user experience on mobile devices; site passes basic responsive tests (e.g., no horizontal scroll on small screens).
- **Expected Version Bump**: Upon merge, bump `package.json` to `0.3.0` (minor version, as it's a feature addition without breaking changes).
- **Dependencies/Risks**: Relies on existing SCSS setup; test build process to ensure compiled CSS works in `public/`.

#### Full Git Cycle Commands (Example Workflow)

Assuming you're starting from a clean `main` branch in your local repo. Run these in your terminal from the repo root.

1. **Prepare and Create the Branch**:

   ```
   git checkout main          # Switch to main
   git pull origin main       # Pull latest changes from remote
   git checkout -b feature/mobile-first-responsive  # Create and switch to new branch
   ```

2. **Development and Milestone Commits**:
   Work iteratively. Use conventional commit messages (e.g., "feat: ...", "refactor: ...") for clarity and to auto-generate changelogs. Here's a task list with example commits—adapt as you implement.
   - **Task 1: Set up SCSS variables and mixins** (Initial setup).
     - Add variables/mixins to `scss/main.scss` (or equivalent).

     ```
     git add scss/main.scss
     git commit -m "feat: add SCSS variables and mixins for mobile-first breakpoints"
     ```

   - **Task 2: Apply base mobile styles** (Focus on small/large mobile with orientations).
     - Update base styles and mobile-specific rules.

     ```
     git add scss/*.scss  # Or specific files
     git commit -m "refactor: implement base mobile-first styles for small and large phones"
     ```

   - **Task 3: Add progressive enhancements** (Tablet, laptop, desktop).
     - Add media queries for larger screens.

     ```
     git add scss/*.scss
     git commit -m "feat: add media queries for tablet, laptop, and desktop breakpoints"
     ```

   - **Task 4: Test and refine** (Manual testing with dev tools; fix issues like font scaling or padding in landscape).

     ```
     git add scss/*.scss public/css/style.css  # If compiling manually
     git commit -m "fix: refine orientations and edge cases in mobile-first implementation"
     ```

   - **Task 5: Update build/docs** (Integrate into build script if needed; add notes to README or TODO.md).

     ```
     git add scripts/build.js docs/TODO.md  # Example files
     git commit -m "docs: update build process and TODO for mobile-first strategy"
     ```

   - **Task 6: Version bump** (Final prep before push).
     - Edit `package.json` version to `0.3.0`.
     ```
     git add package.json
     git commit -m "chore: bump version to 0.3.0 for mobile-first feature"
     ```

3. **Push the Branch**:

   ```
   git push origin feature/mobile-first-responsive  # Push to remote for collaboration/PR
   ```

4. **Create Pull Request (PR) and Merge**:
   - On GitHub: Go to https://github.com/DavitTec/faq-help/pulls, click "New pull request", select base `main` and compare `feature/mobile-first-responsive`.
   - Add a PR title like "feat: implement mobile-first responsive design" and description referencing objectives/tasks.
   - Review changes, test deployed preview if Actions trigger a build.
   - Once approved (self-approve if solo):
     ```
     # Locally, after PR merge on GitHub:
     git checkout main
     git pull origin main  # Pull merged changes
     git branch -d feature/mobile-first-responsive  # Delete local branch
     git push origin --delete feature/mobile-first-responsive  # Delete remote branch
     ```

#### Replication in the "presentation-engine" Project

The "presentation-engine" is your upstream/main package (source for generating projects like `faq-help`). To propagate these mobile-first refinements:

1. **Sync Changes**: After merging in `faq-help`, cherry-pick or manually apply the relevant commits (e.g., SCSS changes) to `presentation-engine`. Or, if `faq-help` is a fork/derivative, rebase it onto the engine.
2. **Repeat the Branch Cycle**:
   - In the `presentation-engine` repo (assuming https://github.com/DavitTec/presentation-engine or similar):
     ```
     git checkout main
     git pull origin main
     git checkout -b feature/mobile-first-responsive
     ```
   - Apply similar tasks/commits as above, adapting to the engine's structure (e.g., templates in `src/` or shared SCSS).
   - Use the same milestone commit messages for consistency.
   - Push: `git push origin feature/mobile-first-responsive`
   - PR and merge as before.
   - Bump engine version (e.g., to `1.1.0`) if it's a shared utility.

3. **Regenerate `faq-help`**: After merging in the engine, update `faq-help` by pulling/reapplying engine changes (e.g., via submodule, copy, or rebuild script).

This workflow ensures traceable, versioned development. If your repos have custom hooks or CI (e.g., linting), run them before pushes. For real-world refinement, start with Task 1 in the branch and preview locally—adjust breakpoints based on how your slides render on emulated iPhone/Samsung sizes. If issues, share repo updates!



---

## Development

Proposed

- **Dart Sass** (`sass` npm package) - The primary, actively maintained implementation

- Build Scripts 

  using pnpm scripts for:

  - Development watch mode with auto-compilation
  - Production build with minification
  - Autoprefixer for browser compatibility

- Additional Tools

  - `postcss` with `autoprefixer` for vendor prefixes
  - `cssnano` for minification
  - Optional: `browser-sync` for live reload during development

```bash
your-package/
├── src/
│   ├── scss/           # Primary styles
│   │   ├── components/ # Buttons, cards, forms, etc.
│   │   ├── globals/    # Variables, mixins, resets
│   │   ├── modules/    # Reusable patterns
│   │   ├── sections/   # Header, footer, navigation
│   │   ├── views/      # Page-specific styles
│   │   └── main.scss   # Main entry point
│   ├── html/
│   ├── js/
│   ├── assets/
│   └── ...
├── site_root/          # Build output
│   ├── css/
│   ├── js/
│   └── assets/
└── package.json
```


To set up this project as a comprehensive SCSS-based static site builder with pnpm support, proper monorepo structure, and Linux Mint-oriented scripts. 

- [ ] create a todo list to track this implementation. 
- [ ] review the current files and then building out the structure.
- [ ] Initialize project structure with src and site_root directories
- [ ] update package.json with pnpm scripts and dependencies
- [ ] Set up SCSS folder structure with components, globals, modules, sections, views
- [ ] Create build scripts (compile, watch, build) with proper headers
- [ ] Create main.scss entry point and base SCSS files
- [ ] Create placeholder files for html, js, and assets directories
- [ ] Testing build configuration
- [ ] **Structure:** Fully organised `src/` directory with SCSS modules, components, sections, views, and placeholder HTML/JS files. Build outputs to `site_root/`.
- [ ] **Build System:** Three scripts with logging:

**SCSS Architecture:**

- Globals (variables, mixins, reset)
- Components (buttons, cards, forms)
- Modules (grid, typography)
- Sections (header, footer, navigation)
- Views (home, about pages)

**Features:**

- Mobile-first responsive design
- 8px spacing system
- Comprehensive colour ramps
- Reusable mixins and utilities
- British English (en-GB) conventions
- 2-space indentation throughout
- Proper Linux shell script headers with version/metadata
- Timestamped logging for all operations

**Monorepo Ready:** Package structure supports integration as a submodule with isolated dependencies.

Both development and production builds have been tested and verified working. CSS compiles cleanly with source maps and proper PostCSS processing.
