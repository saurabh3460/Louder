from django.http import JsonResponse
from django.shortcuts import render
from django.utils.crypto import get_random_string
from .quote import Quotes
from SoundPot.models import SoundPot
'''
Note: when we use all() fun it returns model instances so we can (image.url)
                            but
while using values it returns dic ('image': 'images/i-dont-know.jpg')
'''

def pot_1(request):
    if request.method == 'GET':
        songs = SoundPot.objects.values('album', 'language', 'image', 'artist', 'genre', 'id')
        context = {'songs': songs, 'quotes': Quotes,'user':request.user}
        return render(request, 'pot.html', context=context)

    if request.method == 'POST':
        if request.user.is_authenticated:
            data = {
                'album': request.POST['album'],
                'artist': request.POST['artist'],
                'language': request.POST['language'],
                'image': request.FILES['image'],
                'song': request.FILES['song'],
                'genre': request.POST['genre'],
                'id': get_random_string(8).lower()
            }
            obj = SoundPot(**data)
            if obj:
                obj.save()
                return JsonResponse({'status': '200'})
            else:
                return JsonResponse({'status': '400'})
        else:
            return JsonResponse({'status': '403'})

    if request.method == "DELETE":
        if request.user.is_authenticated:
            id = request.body.decode('utf-8').split('=')
            obj = SoundPot.objects.get(id=id[1])

            if obj:
                obj.delete()
                return JsonResponse({'status': '200'})
            else:
                return JsonResponse({'status': '204'})
        else:
            return JsonResponse({'status': '403'})


def FetchSong(request):

    if request.method == 'GET':
        url = SoundPot.objects.get(id=request.GET['id'])
        return JsonResponse({'url':url.song.url})
