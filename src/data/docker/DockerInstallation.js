const dockerInstallation = {
  id: 'docker-installation',
  title: 'Docker Installation',
  description:
    'Install Docker correctly on Windows and Linux with production-style verification, troubleshooting, and real-world setup scenarios.',
  content: `
# Docker Installation (Hands-on)

Installing Docker is easy in theory, but in real projects installation quality directly impacts development speed.  
Many beginners install Docker once, run one command, and assume everything is ready. Later they face issues such as:

- daemon not running
- WSL backend errors
- permission denied on Linux
- container networking issues
- image pull failures in office networks

This guide gives a complete installation workflow with practical checks and real-world troubleshooting.

## Why installation quality matters

If Docker is not configured properly:

- team onboarding slows down
- local development differs from project docs
- Compose stacks fail unexpectedly
- debugging becomes harder than actual coding

A good installation means:

- Docker daemon starts reliably
- CLI commands work without sudo pain
- containers can run with ports and volumes
- image pull/push operations work in your network

## Before installation: system prerequisites

### Windows prerequisites

- Windows 10/11 with virtualization support
- BIOS virtualization enabled
- WSL2 support enabled
- enough RAM (recommended 8 GB+ for backend learning)

### Linux prerequisites

- 64-bit OS
- kernel with cgroups support
- root/sudo privileges
- internet access to Docker repositories

## Install on Windows (Docker Desktop + WSL2)

### Step 1: Enable virtualization features

Enable:
- Virtual Machine Platform
- Windows Subsystem for Linux

Then restart machine.

### Step 2: Install WSL2 and update kernel

In PowerShell:

\`\`\`powershell
wsl --install
wsl --update
\`\`\`

If WSL is already installed:

\`\`\`powershell
wsl --set-default-version 2
\`\`\`

### Step 3: Install Docker Desktop

1. Download Docker Desktop from official Docker website
2. Run installer
3. Keep WSL2 backend enabled
4. Restart system if prompted

### Step 4: Enable WSL integration in Docker Desktop

Inside Docker Desktop settings:
- open Resources -> WSL Integration
- enable your Linux distro (Ubuntu, etc.)

This is crucial for command-line workflows.

## Install on Linux (Ubuntu example)

### Method A: Quick install (good for learning)

\`\`\`bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
\`\`\`

### Method B: Official Docker repository (recommended for latest stable)

For production-like environments, prefer Docker's official packages over distro-lagged versions.

Typical flow:

\`\`\`bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
\`\`\`

Then add Docker repo and install:

\`\`\`bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
\`\`\`

## Verify Installation

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

If you see the hello-world success message, Docker is installed correctly.

## Deep verification checklist (important)

A real project setup needs more than one hello-world check.

### 1) Verify daemon health

\`\`\`bash
docker info
\`\`\`

If this fails, daemon/socket setup still has issues.

### 2) Verify image pull

\`\`\`bash
docker pull nginx
\`\`\`

Confirms registry connectivity.

### 3) Verify container run + ports

\`\`\`bash
docker run -d -p 8080:80 --name nginx-test nginx
\`\`\`

Then open:
\`\`\`
http://localhost:8080
\`\`\`

### 4) Verify cleanup operations

\`\`\`bash
docker stop nginx-test
docker rm nginx-test
\`\`\`

### 5) Verify Compose command

\`\`\`bash
docker compose version
\`\`\`

If this works, you are ready for multi-container labs.

## Common Installation Errors

### Permission denied (Linux)
\`\`\`bash
sudo usermod -aG docker $USER
\`\`\`
Then logout and login again.

Why this happens:
- your user is not in docker group
- Docker socket requires privileged access

### Docker daemon not running
Start service:
\`\`\`bash
sudo systemctl start docker
\`\`\`

Also enable startup:

\`\`\`bash
sudo systemctl enable docker
\`\`\`

If still failing, check:

\`\`\`bash
sudo systemctl status docker
\`\`\`

### WSL issue on Windows (very common)

Symptoms:
- Docker Desktop opens but containers do not start
- Error mentions WSL backend

Fix checklist:
- Enable "Virtual Machine Platform" feature
- Ensure WSL2 is installed
- Update kernel with \`wsl --update\`
- Enable integration for your distro in Docker Desktop settings

## Real-time scenario 1: New developer cannot run project

Situation:
- teammate clones project
- Docker commands fail with permission denied

Root cause:
- user not in docker group on Linux

Fix:
- add user to docker group
- relogin
- re-verify with \`docker ps\`

## Real-time scenario 2: Docker Desktop starts but build fails

Situation:
- Docker UI opens fine
- \`docker build\` fails with backend/daemon errors

Root cause:
- WSL integration disabled for active distro

Fix:
- enable distro integration in Docker Desktop
- restart Docker Desktop
- retry build

## Real-time scenario 3: Corporate network blocks image pulls

Symptoms:
- \`docker pull\` timeout
- TLS handshake errors

Possible causes:
- proxy restrictions
- firewall inspection
- missing DNS/proxy config in Docker Desktop/daemon

Fix direction:
- configure proxy settings for Docker
- check network team allowlist for Docker Hub/registry domains
- test with small image pull after update

## Real-time scenario 4: Port conflicts right after install

Symptom:
- \`Bind for 0.0.0.0:8080 failed\`

Cause:
- another app/process already uses port 8080

Fix:
- use a different host port:
\`\`\`bash
docker run -d -p 8081:80 nginx
\`\`\`
- or stop conflicting process

## Real-time scenario 5: Compose not recognized

Symptom:
- \`docker compose\` command not found

Cause:
- older Docker setup or missing compose plugin

Fix:
- install Docker Compose plugin (Linux)
- update Docker Desktop (Windows/Mac)

## Post-install best practices

After installation, adopt these habits early:

- verify Docker and Compose versions
- keep Docker Desktop/engine updated
- periodically clean unused resources
- avoid running everything as root unnecessarily
- use versioned image tags in projects

Useful cleanup command:

\`\`\`bash
docker system prune
\`\`\`

Use with care; it removes unused resources.

## Security basics right after installation

Even during local setup:

- do not expose Docker daemon remotely without TLS
- avoid storing secrets directly in images
- use trusted base images
- update Docker regularly for security patches

Installation is not only "make command work"; it is also baseline security.

## Checklist: are you truly ready for Docker projects?

You are ready if all are true:

- \`docker --version\` works
- \`docker info\` works without errors
- \`docker run hello-world\` succeeds
- you can pull images from registry
- you can run and access a container via mapped port
- \`docker compose version\` works
- permissions and daemon startup are stable

If yes, your setup is production-learning-ready.

## Interview-ready explanation

If asked "How do you install and verify Docker?" answer:

I install Docker Engine/Desktop based on OS, ensure daemon is running, verify with \`docker --version\`, \`docker info\`, and \`docker run hello-world\`, then test real behavior with image pull, port mapping, and compose command checks.

This answer shows practical depth, not just command memorization.

## Final takeaway

After installation, always test:
- image pull
- container run
- network port mapping

And for real project readiness, also test daemon health, permissions, and compose support.  
A stable Docker installation saves hours of debugging later and gives you a strong base for all advanced topics.
`
};

export default dockerInstallation;
