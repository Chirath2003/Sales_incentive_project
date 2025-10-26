from rest_framework import serializers
from .models import SlabLevel

class SlabLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlabLevel
        fields = ['id', 'slab_level', 'upper_range', 'status', 'created_user', 'created_at']
