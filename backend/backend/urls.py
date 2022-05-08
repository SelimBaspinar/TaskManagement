"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers

from tasks import views as tasks_views
from users import views as users_views
from reminders import views as reminders_views
from translate import views as translate_views

from django.conf.urls.static import static
from django.conf import settings

from tasks import views

router = routers.DefaultRouter()

router.register(r'tasks', tasks_views.TasksView)
router.register(r'users', users_views.UsersView)
router.register(r'reminders', reminders_views.RemindersView)
router.register(r'roles', users_views.RolesView)
router.register(r'translate', translate_views.TranslateView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),




]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)