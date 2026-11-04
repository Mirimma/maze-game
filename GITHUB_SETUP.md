# Instructions for Creating GitHub Repository

## Repository Name: `maze-game`
## GitHub Username: `Mirimma`
## URL: `https://github.com/Mirimma/maze-game`

## Steps to Create Repository:

### 1. Create Repository on GitHub
1. Go to https://github.com/new
2. Fill in:
   - Repository name: `maze-game`
   - Description: `A retro-style maze game built with Phaser.js, TypeScript, and Vite`
   - Visibility: **Private** (can change to Public later)
   - Initialize with: **None** (we have existing files)
   - Add .gitignore: **None** (we have our own)
   - Choose license: **MIT License**

### 2. Connect Local Repository
After creating repository on GitHub, run these commands:

```bash
# Navigate to project folder
cd "C:\Users\Alexr\Documents\ПЭТ-проекты\Лабиринт вэб"

# Add remote origin (use HTTPS or SSH)
# HTTPS (easier, requires login):
git remote add origin https://github.com/Mirimma/maze-game.git

# OR SSH (needs SSH keys setup):
# git remote add origin git@github.com:Mirimma/maze-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
After first push:
1. Go to repository Settings → Pages
2. Source: **GitHub Actions**
3. The workflow `.github/workflows/deploy.yml` will automatically deploy

### 4. First Deployment
1. Push will trigger workflow
2. Game will be available at: `https://mirimma.github.io/maze-game/`
3. Check Actions tab for deployment status

### 5. Repository Settings Recommendations
1. **Branches**:
   - Protect main branch
   - Require pull request reviews
   - Require status checks

2. **Features**:
   - Enable Issues
   - Enable Projects
   - Enable Wiki
   - Enable Discussions (optional)

3. **Security**:
   - Dependabot alerts
   - Code scanning
   - Secret scanning

### 6. Changing Repository Visibility
To make repository Public later:
1. Settings → Danger Zone → Change repository visibility
2. Select "Make public"
3. Confirm

### 7. Additional Configuration
```bash
# Configure git user (if not already)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Set upstream tracking
git branch --set-upstream-to=origin/main main

# Check remote
git remote -v
```

### 8. Useful Commands
```bash
# Push changes
git push

# Pull updates
git pull

# Check status
git status

# View commit history
git log --oneline -10
```

### 9. Troubleshooting
**If push fails due to authentication:**
```bash
# Configure GitHub token
git remote set-url origin https://x-access-token:<TOKEN>@github.com/Mirimma/maze-game.git
# Or use SSH key setup
```

**If workflow fails:**
- Check Actions tab for error details
- Verify Node.js version compatibility
- Check build logs