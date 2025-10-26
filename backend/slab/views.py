from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SlabLevel
from .serializers import SlabLevelSerializer

@api_view(['GET', 'POST'])
def slab_level_list(request):
    if request.method == 'GET':
        slabs = SlabLevel.objects.all()
        serializer = SlabLevelSerializer(slabs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SlabLevelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def slab_level_detail(request, pk):
    try:
        slab = SlabLevel.objects.get(pk=pk)
    except SlabLevel.DoesNotExist:
        return Response({'error': 'Slab level not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = SlabLevelSerializer(slab)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SlabLevelSerializer(slab, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        slab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)