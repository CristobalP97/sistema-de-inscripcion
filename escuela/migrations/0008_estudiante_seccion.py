# Generated by Django 5.0.6 on 2024-06-29 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0007_estudiante_activo'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiante',
            name='seccion',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]