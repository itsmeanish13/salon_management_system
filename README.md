# Appointment Booking System

A full-stack appointment booking app built with Django REST Framework for the backend and React + Vite for the frontend.

## Project Structure

- `backend/` - Django backend and APIs
- `frontend/` - React frontend application

## Requirements

- Python 3.10+
- Node.js 18+
- npm
- Git

## 1) Backend Setup (Django)

Open PowerShell in the project root and run:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

The backend will run at:

- http://127.0.0.1:8000

If you are setting up the project for the first time and want to recreate the database tables:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py makemigrations
python manage.py migrate
```

## 2) Frontend Setup (React)

Open a new PowerShell terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

The frontend will run at:

- http://localhost:5173

## 3) Run Both Together

Use two terminals:

Terminal 1 - Backend:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py runserver 0.0.0.0:8000
```

Terminal 2 - Frontend:

```powershell
cd frontend
npm install
npm run dev
```

## 4) Useful Commands

### Backend checks

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py check
python manage.py makemigrations
python manage.py migrate
```

### Frontend build check

```powershell
cd frontend
npm run build
```

### Frontend preview after build

```powershell
cd frontend
npm run preview
```

## 5) API Notes

The frontend uses the Django API at:

- http://127.0.0.1:8000/api/services
- http://127.0.0.1:8000/api/appointments

The app includes:

- Service management
- Appointment booking
- Appointment status updates
- Search by customer name or phone
- Duplicate booking prevention for the same service/date/time

## 6) Troubleshooting

### If Django cannot start

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py check
python manage.py migrate
```

### If React shows dependency issues

```powershell
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### If CORS errors appear in browser

Make sure the Django app includes `corsheaders` and that `CORS_ALLOW_ALL_ORIGINS = True` is enabled in `backend/config/settings.py`.

## 7) Default Development URLs

- Backend: http://127.0.0.1:8000
- Frontend: http://localhost:5173

## 8) Notes

This project is configured for local development only. For production deployment, you should configure a proper database, environment variables, secret keys, and deployment hosting.
