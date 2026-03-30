#!/usr/bin/env node
/**
 * Gera a pasta dist/ com tudo necessário para deploy:
 * - index.html
 * - css/style.css (Tailwind compilado e minificado)
 * - img/ (com imagens, incluindo .webp)
 * - .htaccess
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function rmDirRecursive(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const cur = path.join(dir, file);
      if (fs.lstatSync(cur).isDirectory()) rmDirRecursive(cur);
      else fs.unlinkSync(cur);
    });
    fs.rmdirSync(dir);
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((name) => {
      copyRecursive(path.join(src, name), path.join(dest, name));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log('Limpando dist/...');
rmDirRecursive(DIST);
fs.mkdirSync(DIST, { recursive: true });
fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'img'), { recursive: true });

console.log('Compilando CSS com Tailwind...');
execSync('npx tailwindcss -i ./src/input.css -o ./dist/css/style.css --minify', {
  cwd: ROOT,
  stdio: 'inherit',
});

console.log('Copiando index.html...');
fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(DIST, 'index.html'));

console.log('Copiando .htaccess...');
if (fs.existsSync(path.join(ROOT, '.htaccess'))) {
  fs.copyFileSync(path.join(ROOT, '.htaccess'), path.join(DIST, '.htaccess'));
}

console.log('Copiando img/...');
if (fs.existsSync(path.join(ROOT, 'img'))) {
  copyRecursive(path.join(ROOT, 'img'), path.join(DIST, 'img'));
}

if (fs.existsSync(path.join(ROOT, 'favicon.ico'))) {
  console.log('Copiando favicon.ico...');
  fs.copyFileSync(path.join(ROOT, 'favicon.ico'), path.join(DIST, 'favicon.ico'));
}

console.log('Build concluído. Saída em dist/');
