const express = require("express");
const fs = require('fs');
const app = express();

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, exiting cleanly');
    process.exit(0);
});

const projects = JSON.parse(fs.readFileSync('config/projects.json'));
const { server: host = 'localhost', port = 3000, ssl = false } = projects;
const projectName = Object.keys(projects.projects)[0]; // Returns "faq-help"
const config = projects.projects[projectName];
const buildDir = config.buildDir;
const outputDir = config.outputDir;
console.log(`Project "${projectName}"`);

//TODO: check if  "${buildDir}" has is created 
if (fs.existsSync(buildDir)) {
    const stats = fs.statSync(buildDir);
    if (stats.isDirectory()) {
        console.log(`Build Directory "${buildDir}"`);
    } else {
        console.log(`"${buildDir}" exists but is not a directory`);
    }
} else {
    console.log(`Directory "${buildDir}" does not exist`);
    // Optionally create it
    fs.mkdirSync(buildDir, { recursive: true });
}

// Check if outputDir exists and is not empty
let outputDirExistsAndNotEmpty = false;
if (fs.existsSync(outputDir)) {
    const stats = fs.statSync(outputDir);
    if (stats.isDirectory()) {
        const files = fs.readdirSync(outputDir);
        if (files.length > 0) {
            outputDirExistsAndNotEmpty = true;
            console.log(`Output Directory "${outputDir}" exists and contains files`);
        } else {
            console.warn(`Directory "${outputDir}" exists but is empty`);
        }
    } else {
        console.log(`"${outputDir}" exists but is not a directory`);
    }
} else {
    console.warn(`Directory "${outputDir}" does not exist`);
}

if (outputDirExistsAndNotEmpty) {
    app.use(express.static(buildDir));
    // If ssl is true, you would need to set up https server here, e.g.,
    // const https = require('https');
    // const privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
    // const certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
    // const credentials = { key: privateKey, cert: certificate };
    // const httpsServer = https.createServer(credentials, app);
    // httpsServer.listen(port, host, () => console.log(`🚀 https://${host}:${port}`));
    // For now, assuming ssl=false
    app.listen(port, host, () => console.log(`🚀 http://${host}:${port} \npress CRTL+c\n to EXIT`));
} else {
    console.log('Shutting down nodemon...');
    console.log('Exit: Ensure build script completes successfully...');
    process.kill(process.ppid, 'SIGINT');
}
