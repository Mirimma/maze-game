# Instructions to Manually Trigger GitHub Pages Deployment

## Problem: 404 error on https://mirimma.github.io/maze-game/

## Solution Steps:

### 1. Open GitHub Repository
- Go to: https://github.com/Mirimma/maze-game

### 2. Navigate to Actions Tab
- Click on "Actions" tab (next to "Code", "Issues", etc.)

### 3. Find Workflows
- You should see two workflows:
  - **Deploy to GitHub Pages** (main workflow)
  - **Test Workflow** (test workflow)

### 4. Run Workflow Manually
- Click on "Deploy to GitHub Pages" workflow
- Click the "Run workflow" dropdown button (if visible)
- Select branch: **main**
- Click green "Run workflow" button

### 5. Wait for Completion
- Wait 2-3 minutes for workflow to complete
- Refresh page to see progress

### 6. Check GitHub Pages Settings
- Go to: https://github.com/Mirimma/maze-game/settings/pages
- Ensure:
  - Source: **GitHub Actions**
  - Branch: **main** (or leave empty for GitHub Actions)

### 7. Verify Deployment
- After workflow completes:
  - Go to: https://mirimma.github.io/maze-game/
  - Or: https://mirimma.github.io/maze-game/test.html

## Alternative: Create New Push
If workflows don't appear:

### 1. Make a Small Change
```bash
# Navigate to project folder
cd "C:\Users\Alexr\Documents\ПЭТ-проекты\Лабиринт вэб"

# Create a test file
echo "// Test commit" >> test.txt

# Add and commit
git add test.txt
git commit -m "Test commit to trigger workflows"

# Push to GitHub
git push
```

### 2. Use GitHub CLI (if installed)
```bash
# Authenticate
gh auth login

# Run workflow
gh workflow run "Deploy to GitHub Pages"
```

## Troubleshooting

### If "Run workflow" button not visible:
1. Wait 2-3 minutes after push
2. Refresh Actions page
3. Try creating new file as shown above
4. Check GitHub status: https://www.githubstatus.com/

### If workflow fails:
1. Check Actions → workflow run → logs
2. Common issues:
   - Node.js version mismatch
   - Build errors
   - Missing dependencies

### If still 404 after deployment:
1. Wait 5-10 minutes for DNS propagation
2. Check: https://mirimma.github.io/maze-game/test.html
3. Verify workflow completed successfully
4. Check Pages settings are enabled

## Expected Result
After successful workflow:
- ✅ Green checkmark in Actions
- ✅ Site accessible at https://mirimma.github.io/maze-game/
- ✅ Game shows "Maze Game" page

If issues persist, consider:
1. Using Vercel (vercel.com) for instant deploy
2. Checking repository permissions
3. Contacting GitHub support