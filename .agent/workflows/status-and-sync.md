---
description: Project Status & Sync Check
---

# SoonTech Website - Development Status & Sync Workflow

This workflow helps you check the current development status, ensure alignment with best practices, and sync your local branch with remote.

---

## Task 1: Check Build Status

**Command:**
```bash
npm run build
```

**Expected:** Build completes successfully with no errors.

**Verify:**
- ✅ No TypeScript/JavaScript errors
- ✅ No CSS compilation errors  
- ✅ All assets properly bundled
- ✅ Output created in `dist/` folder

---

## Task 2: Start Development Server

**Command:**
```bash
npm run dev
```

**Expected:** Server starts at `http://localhost:5173`

**Verify:**
- ✅ Server starts without errors
- ✅ Hot reload works when editing files
- ✅ No console errors in browser

**Test these pages:**
- `http://localhost:5173/` (Home)
- `http://localhost:5173/ai-solutions.html` (AI Solutions)
- `http://localhost:5173/services-home.html` (Home Services)
- `http://localhost:5173/services-business.html` (Business Services)
- `http://localhost:5173/about-us.html` (About)
- `http://localhost:5173/contact-us.html` (Contact)

---

## Task 3: Check Current Git Branch

**Command:**
```bash
git branch
```

**Expected:** Shows current branch highlighted (usually `main` or `master`)

---

## Task 4: Check Local File Changes

**Command:**
```bash
git status
```

**What to look for:**
- Modified files (red = unstaged, green = staged)
- Untracked files
- Branch ahead/behind remote status

---

## Task 5: View Recent Commits

**Command:**
```bash
git log --oneline -10
```

**Verify:**
- Recent commits are properly documented
- Commit messages are descriptive
- No "WIP" or "temp" commits in main branch

---

## Task 6: Fetch Remote Changes

**Command:**
```bash
git fetch origin
```

**What this does:** Downloads latest changes from remote without merging

---

## Task 7: Check Sync Status with Remote

**Command:**
```bash
git status
```

**Possible outputs:**
- "Your branch is up to date" ✅
- "Your branch is ahead by X commits" → You have local commits to push
- "Your branch is behind by X commits" → Remote has new changes
- "Your branch has diverged" → Both have different commits

---

## Task 8: View Differences with Remote

**Command:**
```bash
git diff origin/main
```

**What to check:**
- Review what changes exist between local and remote
- Ensure no conflicts will occur

---

## Task 9: Pull Remote Changes (if behind)

**Command:**
```bash
git pull origin main
```

**When to run:** Only if Task 7 shows you're behind

**After pulling:**
- Check for merge conflicts
- Run `npm install` if `package.json` changed
- Test the site

---

## Task 10: Install Updated Dependencies

**Command:**
```bash
npm install
```

**When to run:** After pulling changes that modified `package.json`

---

## Task 11: Stage All Changes

**Command:**
```bash
git add .
```

**What this does:** Stages all modified and new files for commit

---

## Task 12: Commit Changes

**Command:**
```bash
git commit -m "Your descriptive message here"
```

**Best practices for commit messages:**
- Start with a verb (Add, Fix, Update, Remove)
- Be specific about what changed
- Keep under 72 characters
- Example: "Add modal functionality to AI solutions cards"

---

## Task 13: Push Local Commits (if ahead)

**Command:**
```bash
git push origin main
```

**When to run:** After committing local changes

**Verify:** Check GitHub/GitLab to confirm commits appear

---

## Task 14: Create Backup Branch

**Command:**
```bash
git checkout -b backup-20260116
```

**When to run:** Before major changes

**Note:** Replace date with current date (YYYYMMDD format)

---

## Task 15: Return to Main Branch

**Command:**
```bash
git checkout main
```

**When to run:** After creating backup or working on another branch

---

## Task 16: Clean Build (if issues occur)

**Command:**
```bash
rm -rf node_modules dist
```

**When to run:** If build or dev server has issues

**Follow with:** Task 10 (npm install) and Task 1 (npm run build)

---

## Task 17: Preview Production Build

**Command:**
```bash
npm run preview
```

**When to run:** To test production build locally

**Expected:** Opens production build at `http://localhost:4173`

---

## Task 18: View All Branches

**Command:**
```bash
git branch -a
```

**Shows:** All local and remote branches

---

## Task 19: Check Uncommitted Changes

**Command:**
```bash
git diff
```

**Shows:** Line-by-line changes in modified files (not yet staged)

---

## Task 20: Check Staged Changes

**Command:**
```bash
git diff --staged
```

**Shows:** Changes that are staged for commit

---

## Handling Merge Conflicts

### Task A: Identify Conflicted Files

**Command:**
```bash
git status
```

**Look for:** Files marked as "both modified"

### Task B: View Conflict in File

Open the conflicted file. Look for:
```
<<<<<<< HEAD
Your local changes
=======
Remote changes
>>>>>>> origin/main
```

**Action:** Edit file to resolve, remove markers, save

### Task C: Mark Conflict as Resolved

**Command:**
```bash
git add <filename>
```

**Replace:** `<filename>` with actual file name

### Task D: Complete Merge

**Command:**
```bash
git commit -m "Resolved merge conflicts"
```

### Task E: Push Resolution

**Command:**
```bash
git push origin main
```

---

## Best Practices Checklist

Before pushing code:

- [ ] Run Task 1: Build succeeds
- [ ] Run Task 2: Dev server works
- [ ] Test in browser: No console errors
- [ ] Test mobile: Responsive design works
- [ ] Check links: All navigation works
- [ ] Verify images: All have alt text
- [ ] Review commit: Message is descriptive
- [ ] Security check: No sensitive data in code

---

## Quick Daily Workflow

**Morning routine:**
1. Task 6: Fetch remote changes
2. Task 7: Check sync status
3. Task 9: Pull if behind
4. Task 10: Install dependencies
5. Task 2: Start dev server

**Before ending work:**
1. Task 4: Check what changed
2. Task 11: Stage changes
3. Task 12: Commit with message
4. Task 13: Push to remote

---

## Troubleshooting

**Issue:** npm run dev fails  
**Solution:** Run Task 16, then Task 10, then Task 2

**Issue:** Merge conflicts  
**Solution:** Follow Tasks A through E above

**Issue:** Forgot what branch I'm on  
**Solution:** Run Task 3

**Issue:** Want to undo last commit  
**Command:** `git reset --hard HEAD~1` (⚠️ careful!)

**Issue:** Want to discard all local changes  
**Command:** `git reset --hard HEAD` (⚠️ careful!)

---

**Last Updated:** 2026-01-16  
**Maintained By:** Development Team
