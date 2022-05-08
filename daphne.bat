@ECHO OFF
cmd /k "cd /d D:\path\venv\Scripts & activate & cd /d     D:\path\backend & daphne -p 8001 backend.asgi:application"
