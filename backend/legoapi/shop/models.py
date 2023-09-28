from django.db import models
from django.contrib.auth.models import User
import uuid

class CustomerUser(models.Model): # weird naming converntion because Django has a default customer with other fields that clash with this one and I want to define my own model
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=244, null=False, blank=False)
    email = models.EmailField(max_length=244, null=False, blank=False)

class Product(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=244)
    description = models.CharField(max_length=244, default="No description", null=True)
    price = models.FloatField(null=False)

class Order(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    paid = models.BooleanField(default=False)
    CustomerUser_id = models.ForeignKey(CustomerUser, on_delete=models.CASCADE)
    products = models.JSONField()
    total = models.FloatField()