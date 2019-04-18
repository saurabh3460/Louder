from os import remove
from os.path import join
from django.db import models
from Louder import settings


class SoundPot(models.Model):
    id = models.CharField(max_length=9, default='', unique=True)
    album = models.CharField(max_length=150, primary_key=True, default='', unique=True)
    language = models.CharField(max_length=100, default='')
    artist = models.CharField(max_length=120, default='')
    genre = models.CharField(max_length=120, default='')
    image = models.ImageField(upload_to=f'images', blank=True, unique=True)
    song = models.FileField(upload_to='songs', blank=True, unique=True)

    def __str__(self):
        return self.album

    def delete(self, using=None, keep_parents=False):
        remove(join(settings.MEDIA_ROOT, self.image.name))
        remove(join(settings.MEDIA_ROOT, self.song.name))
        super(SoundPot, self).delete(using, keep_parents)
