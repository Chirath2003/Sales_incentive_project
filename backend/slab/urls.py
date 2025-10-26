from django.urls import path, include
from . import views

urlpatterns = [
    path('slab-level/', views.slab_level_list, name='slab-level-list'),
    path('slab-level/<int:pk>/', views.slab_level_detail, name='slab-level-detail'),
]

