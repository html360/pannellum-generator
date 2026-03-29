#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { html360Gen } from './index.js';

try {
  const bin = html360Gen.getBinaryPath();
  execFileSync(bin, process.argv.slice(2), { stdio: 'inherit' });
} catch (err) {
  // Если ошибка пришла от самого бинарника (у него есть код выхода status)
  if (err.status) {
    process.exit(err.status);
  }
  
  // Если это системная ошибка Node.js (например, файл не найден или ОС не та)
  console.error(err);
  process.exit(1);
}