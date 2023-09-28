from django.contrib import admin
from .models import CustomerUser, Order, Product


@admin.register(CustomerUser)#, CustomerUserAdmin)
class CustomerUserAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)#, OrderAdmin)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)#, ProductAdmin)
class ProductAdmin(admin.ModelAdmin):
    pass

# Register your models here.
