@ECHO off
ECHO Deploy for production
TYPE .gitignore_deploy > .gitignore
call git add .
call git commit -m "Deploy for production"
call git push deploy main
TYPE .gitignore_original > .gitignore
EXIT 