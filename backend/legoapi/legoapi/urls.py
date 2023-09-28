"""
URL configuration for legoapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.urls import include, path
from rest_framework import routers
from shop import views

class OptionalSlashRouter(routers.DefaultRouter): # Had to hack this for the tests not having trailing slashes

    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'

router = OptionalSlashRouter()
router.register('product', views.ProductViewSet, 'Create Product')
router.register('products', views.ListProductsViewSet, 'Fetch Products')
router.register('product/<uuid:uuid>', views.ProductViewSet, 'Update Product')
router.register('remove-products', views.DeleteProductsViewSet, 'Bulk Remove Products')
router.register('customer', views.CreateCustomerUserViewSet, 'Create CustomerUser')
router.register('customers', views.ListCustomerUsersViewSet, 'Fetch CustomerUsers')
router.register('customer/<uuid:uuid>', views.ListCustomerUsersViewSet, "Delete CustomerUser")
router.register('order', views.OrderViewSet, 'Create Order')
router.register('orders', views.ListOrdersViewSet, 'Fetch Orders')
router.register('order/<uuid:uuid>', views.OrderViewSet, 'Update Order')
router.register('order/<uuid:uuid>', views.OrderViewSet, 'Get Order')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
