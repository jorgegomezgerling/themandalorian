from django.contrib import admin
from django.urls import path, include
from chapters.views import chapter_list, reserve_chapter, confirm_payment
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
        <h1>Bienvenido a Mandalorian Rental</h1>
        <a href="/api/chapters/">Ver capítulos</a>
    """)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/chapters/', chapter_list, name='chapter-list'),
    path('api/reserve/<int:chapter_id>/', reserve_chapter, name='reserve-chapter'),
    path('api/confirm/<int:chapter_id>/', confirm_payment, name='confirm-payment'),
]