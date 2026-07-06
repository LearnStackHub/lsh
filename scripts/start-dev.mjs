import { execSync, spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiPort = process.env.LOCAL_API_PORT || '8787';

function killPort(port) {
  try {
    if (process.platform === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const pids = new Set();

      for (const line of output.split('\n')) {
        if (!line.includes('LISTENING')) {
          continue;
        }

        const pid = line.trim().split(/\s+/).at(-1);
        if (pid && pid !== '0') {
          pids.add(pid);
        }
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`[dev] freed port ${port} (stopped PID ${pid})`);
        } catch {
          // process may already be gone
        }
      }

      return;
    }

    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
  } catch {
    // port already free
  }
}

function waitForApiReady(port, timeoutMs = 15000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(`http://127.0.0.1:${port}/api/health`, (response) => {
        response.resume();
        if (response.statusCode === 200) {
          resolve();
          return;
        }

        retry();
      });

      request.on('error', retry);
      request.setTimeout(1500, () => {
        request.destroy();
        retry();
      });
    };

    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Local API did not start on port ${port} within ${timeoutMs / 1000}s`));
        return;
      }

      setTimeout(attempt, 250);
    };

    attempt();
  });
}

function run(label, command, args) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, LOCAL_API_PORT: apiPort },
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[dev] ${label} exited with code ${code}`);
    }
  });

  return child;
}

killPort(apiPort);

const api = run('api', 'node', ['--watch', '--env-file=.env', 'scripts/local-api-server.js']);
let vite = null;

waitForApiReady(apiPort)
  .then(() => {
    console.log(`[dev] API ready on http://localhost:${apiPort}`);
    vite = run('vite', 'npx', ['vite']);
  })
  .catch((error) => {
    console.error(`[dev] ${error.message}`);
    api.kill('SIGTERM');
    process.exit(1);
  });

function shutdown() {
  api.kill('SIGTERM');
  if (vite) {
    vite.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
