# Generated by Django 4.0.5 on 2024-06-14 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escuela', '0006_remove_estudiante_literal'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiante',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
