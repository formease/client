@ECHO off
ECHO Deploy for production
TYPE deploy.txt > .gitignore
call git add .
call git commit -m "Deploy for production"
call git push deploy main
TYPE original.txt > .gitignore
EXIT 
