@echo off
for /f %%A in ('dir ^| find "File(s)"') do set cnt=%%A
echo File count = %cnt%