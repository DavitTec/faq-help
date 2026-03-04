const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const { stringify } = require('querystring');
const Logger = require('../lib/logger');
const sass = require('sass');


const projects = JSON.parse(fs.readFileSync('config/projects.json'));
const projectName = process.argv[2] || 'default';
const config = projects.projects[projectName];
const log = new Logger(projectName, process.env.MODE);  // projectName from argv

log.info('Starting build', '', 'pre-build');
if (!config) throw new Error(`❌ Project ${projectName} not found`);

const dataDir = config.dataDir;
const slidesDir = path.join(dataDir, 'slides');
const outputDir = config.outputDir;
fs.mkdirSync(outputDir, { recursive: true });  // Create if not exists

const njksDir = config.njksDir;
if (!njksDir) throw new Error(`❌ Project config missing required field: njksDir`);

// Common paths (always)
const commonCssDir = 'public/css';
const commonJsDir = 'public/js';
const assetsDir = 'public/assets';  // For binaries: img, pdf, etc.
fs.mkdirSync(commonCssDir, { recursive: true });
fs.mkdirSync(commonJsDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

// Compile common SASS to public/css/style.css
const sassResult = sass.compile('src/styles/style.scss');
fs.writeFileSync(path.join(commonCssDir, 'style.css'), sassResult.css);

// Copy common JS to public/js/script.js (source: src/js/script.js)
fs.copyFileSync('src/js/script.js', path.join(commonJsDir, 'script.js'));

log.info('Built CSS and Scripts to public dir');

// Project-specific CSS/JS (if defined in config)
let cssPaths = ['/css/style.css'];  // Default common
let jsPaths = ['/js/script.js'];    // Default common

if (config.customCssFiles) {
  const projectCssDir = path.join(outputDir, 'css');
  fs.mkdirSync(projectCssDir, { recursive: true });
  config.customCssFiles.forEach(file => {
    const srcPath = path.join(dataDir, 'css', file);
    if (file.endsWith('.scss') || file.endsWith('.sass')) {
      // Compile SASS
      const compileResult = sass.compile(srcPath);
      const outFile = file.replace(/\.(scss|sass)$/, '.css');
      fs.writeFileSync(path.join(projectCssDir, outFile), compileResult.css);
      cssPaths.push(`./css/${outFile}`);  // Relative to project index.html
    } else if (file.endsWith('.css')) {
      // Copy static CSS
      fs.copyFileSync(srcPath, path.join(projectCssDir, file));
      cssPaths.push(`./css/${file}`);
    }
  });
}

if (config.customJsFiles) {
  const projectJsDir = path.join(outputDir, 'js');
  fs.mkdirSync(projectJsDir, { recursive: true });
  config.customJsFiles.forEach(file => {
    const srcPath = path.join(dataDir, 'js', file);
    fs.copyFileSync(srcPath, path.join(projectJsDir, file));
    jsPaths.push(`./js/${file}`);
  });
}

// Copy project-specific assets (if any) from src/assets/ or dataDir/assets/
const projectAssetsDir = path.join(outputDir, 'assets');
fs.mkdirSync(projectAssetsDir, { recursive: true });
// Placeholder: Copy logic here if config.assetsFiles (e.g., images)

// Load deck
let deck = JSON.parse(fs.readFileSync(path.join(dataDir, config.deckFile)));

// Process each slide
deck.slides.forEach((slide, index) => {
  try {
    if (slide.file) {
      const mdPath = path.join(slidesDir, `${slide.file}.md`);
       log.info(`Processing:  ${mdPath}`);
      if (!fs.existsSync(mdPath)) {
        throw new Error(`Missing file: ${mdPath}`);
      }
      const mdContent = fs.readFileSync(mdPath, 'utf8');
      const { data: frontmatter, content } = matter(mdContent);

     


      slide.content = marked.parse(content);
      Object.assign(slide, frontmatter);
    } else if (!slide.content) { 
      throw new Error(`Slide ${index + 1} missing 'file' or 'content'`);
    }
  } catch (err) {
    log.warn(`No slide content found in  "${slidesDir}"` );
    console.error(`❌ Error processing slide ${index + 1}: ${err.message}`);
    process.exit(1);
  }
});

// Render HTML (pass arrays for multiple <link>/<script>)
const base  = path.join(njksDir, 'base.njk');
// Ensure njksDir and base.njk exist to avoid [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined.
// This error happens if njksDir is missing from config or base.njk does not exist at the expected location.
if (!fs.existsSync(base)) {
  throw new Error(`❌ base.njk not found at ${base}. Check njksDir in your project config.`);
}
const html = nunjucks.render(base, { 
  deck, 
  title: `DAVIT ${projectName}`,
  cssPaths,
  jsPaths
});
fs.writeFileSync(path.join(outputDir, 'index.html'), html);

// Default fallback index.html at public/index.html (points to default project)
const fallbackHtml = `<!doctype html>
<html>
<body>
<h1>WELCOME PAGE</h1>
<p>Go to ✅ <a href="/${projectName}/index.html">${projectName}</a>
</p>
</body>
</html>`;
fs.writeFileSync('public/index.html', fallbackHtml);

log.info(`✅ Built ${projectName} (${deck.slides.length} slides) → ${outputDir}/index.html (CSS: ${cssPaths.length}, JS: ${jsPaths.length})`);