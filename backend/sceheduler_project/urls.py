from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from rest_framework.decorators import api_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts_app.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
