@echo off
echo ========================================
echo GitHub Pages Deployment Helper
echo ========================================
echo.
echo This script helps trigger GitHub Pages deployment.
echo.
echo STEPS TO DEPLOY MANUALLY:
echo 1. Open browser to: https://github.com/Mirimma/maze-game/actions
echo 2. Click on "Actions" tab
echo 3. Find "Deploy to GitHub Pages" workflow
echo 4. Click "Run workflow" -> Branch: main -> Run workflow
echo 5. Wait 2-3 minutes
echo 6. Check: https://mirimma.github.io/maze-game/
echo.
echo If "Run workflow" button not visible:
echo 1. Make a small change to trigger workflow:
echo    echo "test" > trigger.txt
echo    git add trigger.txt
echo    git commit -m "Trigger workflow"
echo    git push
echo.
echo ALTERNATIVE: Use Vercel (easier)
echo 1. Go to: https://vercel.com
echo 2. Import Git Repository
echo 3. Select: Mirimma/maze-game
echo 4. Deploy automatically
echo 5. Site: https://maze-game.vercel.app
echo.
echo ========================================
echo Current files ready for deploy:
echo - .github/workflows/deploy.yml (updated)
echo - .github/workflows/test.yml (test)
echo - index.html (test page)
echo - public/test.html (test file)
echo ========================================
echo.
pause