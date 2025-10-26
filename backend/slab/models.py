from django.db import models

# Create your models here.
class SlabLevel(models.Model):
    id = models.AutoField(primary_key=True)
    slab_level = models.CharField(max_length=50, unique=True)
    upper_range = models.IntegerField()
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    created_user = models.TextField()
    
    def __str__ (self):
        return self.slab_level