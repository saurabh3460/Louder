# Generated by Django 2.1.3 on 2018-12-09 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SoundPot', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='soundpot',
            name='album',
            field=models.CharField(default='', max_length=150, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='soundpot',
            name='id',
            field=models.CharField(default='', max_length=9, unique=True),
        ),
        migrations.AlterField(
            model_name='soundpot',
            name='image',
            field=models.ImageField(blank=True, unique=True, upload_to='images'),
        ),
        migrations.AlterField(
            model_name='soundpot',
            name='song',
            field=models.FileField(blank=True, unique=True, upload_to='songs'),
        ),
    ]