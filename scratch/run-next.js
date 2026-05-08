Object.defineProperty(process, 'version', { value: 'v18.18.0', writable: true });
Object.defineProperty(process.versions, 'node', { value: '18.18.0', writable: true });
// Add any other checks Next.js might do
require('../node_modules/next/dist/bin/next');
