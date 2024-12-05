# Generated by Django 4.2 on 2023-06-06 02:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_couninstock_product_countinstock'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.jpg', null=True, upload_to=''),
        ),
    ]
