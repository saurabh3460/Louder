from django.urls import path
from django.conf.urls import static

from Louder import settings
from SoundPot.views import *

urlpatterns = [
    path('', pot_1, name='soundpot'),
    path('fetch-song/', FetchSong, name='fetch-song'),

]
if settings.DEBUG:
    urlpatterns += static.static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)