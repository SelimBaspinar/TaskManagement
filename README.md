# TaskManagement
This project is a website where users can register, log in(Cryptojs library was used to provide login security for users.) and schedule their tasks.

## Frontend
The front side of the site is designed by using css libraries such as Tailwind, bootstrap, reactstrap. React, react-hooks, react-redux technologies were used. Tasks have a name, description, date added, reminder, priority colors that indicate the urgency of the task and label.


<img src="https://user-images.githubusercontent.com/56540379/167271993-81588a04-6ed3-4028-83ac-3ad0c812ce47.png" width="800" height="400">


The user can add new tasks and drag and drop these plans to indicate as done, scheduled or cancelled. In the same way, it can change the rankings by drag and drop in its own area.(To drag and drop, click the edit button on the top right.)

<img src="https://user-images.githubusercontent.com/56540379/167275047-aa1023e3-35e2-41d3-a6ed-b1dda476612a.gif" width="800" height="400">


By logging in, the user can see their own tasks and profile.

<img src="https://user-images.githubusercontent.com/56540379/167275494-3b177ff9-e68d-4a18-b550-a603a053f359.gif" width="800" height="400">


You can filter Tasks by searching

<img src="https://user-images.githubusercontent.com/56540379/167276022-55a3ff61-a8ee-4b48-a7e4-3defa35c205b.gif" width="800" height="400">


Multilanguage supports

<img src="https://user-images.githubusercontent.com/56540379/167275952-1ff54e09-afa3-404b-81cd-ff0ffb0935d8.gif" width="800" height="400">

If you add a reminder, it will be processed on the server side, and the server will send you a warning when the time comes. In the front part, the alert color is determined according to the warning sent. (This is the same as the priority color.) If you want, you can postpone the reminder for 1 hour, or you can turn off the reminder by saying OK.


<img src="https://user-images.githubusercontent.com/56540379/167276010-d6553c1b-71e7-48ce-a092-e8747f989bdd.gif" width="800" height="400">

## Backend
In the backend part, Python django was used. Rest framework was used for API construction. There is a task model to keep task information, a reminder model to keep reminder information, a user model to keep user information, and a role model in case an admin panel is added in the future, but the role model is currently dysfunctional. Websocket is used to send notifications or to establish real-time communication between the server and the client. Notifications are processed on the server side and sent to the frontend.

<img src="https://user-images.githubusercontent.com/56540379/167276201-98db4230-8bad-474c-919a-ed0401777636.png" width="800" height="400">

## What needs to be done to run
Run the bat files in order.
1) `pythonrunserver.bat`
2) `npmstart.bat`
3) `daphne.bat`


# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

### `npm run build` fails to minify


# Creating a Python Django Project
## Install Django
pip install django
## Create Django Project
### `django-admin startproject backend`
cd backend
## Start a new application called `exp` 
### `python manage.py startapp exp`

## Run Migrations

### `python manage.py makemigrations exp`
### `python manage.py migrate exp`

## Run Server

### `python manage.py runserver`

## Daphne Start

### `daphne -p 8001 backend.asgi:application`



