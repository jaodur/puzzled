# Generated by Django 2.2.2 on 2019-12-01 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sudoku',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sudoku_hash', models.CharField(max_length=200)),
            ],
        ),
    ]
