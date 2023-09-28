from rest_framework import viewsets, response, status
from rest_framework import permissions
from .models import CustomerUser, Product, Order
from .serializers import (
    CreateCustomerUserSerializer,
    ProductSerializer,
    CreateOrderSerializer,
    ListProductsSerializer,
    UpdateProductSerializer,
    FetchProductSerializer,
    DeleteProductsSerializer,
    ListCustomerUsersSerializer,
    DeleteCustomerUserSerializer,
    ListOrdersSerializer,
    UpdateOrderSerializer,
    FetchOrderSerializer,
)
from django.http import JsonResponse


class CreateCustomerUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CustomerUsers to be viewed or edited.
    """
    queryset = CustomerUser.objects.all()
    def get_serializer_class(self):
        if self.request.method in ["DELETE"]:
            return DeleteCustomerUserSerializer
        if self.request.method in ["POST"]:
            return CreateCustomerUserSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        original_response = super().create(request, *args, **kwargs)
        original_response.status_code = 200 # change status code to 200 for tests because scope is non standard
        return original_response

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()

class ListCustomerUsersViewSet(viewsets.ModelViewSet):
    queryset = CustomerUser.objects.all()
    serializer_class = ListCustomerUsersSerializer

    def create(self, request, *args, **kwargs):
        uuids = request.data.get("ids",[])
        emails = request.data.get("emails", []) # for possible login use
        if uuids:
            self.queryset = self.queryset.filter(uuid__in=uuids)
        if emails:
            self.queryset = self.queryset.filter(email__in=emails)

        return JsonResponse({"customers": list(self.queryset.values())},safe=False)

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CustomerUsers to be viewed or edited.
    """
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return FetchProductSerializer
        if self.request.method in ["POST"]:
            return ProductSerializer
        if self.request.method in ["PATCH", "PUT"]:
            return UpdateProductSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        if self.request.method in ["POST"]:
            original_response = super().create(request, *args, **kwargs)
            original_response.status_code = 200 # change status code to 200 for tests because scope is non standard
            return original_response
        # Don't think I need this...
        if self.request.method in ["PATCH", "PUT"]:
            return super().update(request, *args, **kwargs)
        if self.request.method in ["GET"]:
            return super().retrieve(request)
    def update(self, request, *args, **kwargs):
        original_response = super().update(request, *args, **kwargs)
        original_response.data = {"product": original_response.data}
        return original_response

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse({"product":serializer.data})

class ListProductsViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class = ListProductsSerializer

    def create(self, request, *args, **kwargs): # have to use this because method is POST in tests...
        query_set = Product.objects.all()
        uuids = request.data["ids"]
        if uuids:
            query_set = query_set.filter(uuid__in=uuids)
        return JsonResponse({"products":list(query_set.values())}, safe=False)

class DeleteProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = DeleteProductsSerializer

    def create(self, request, *args, **kwargs):
        uuids = request.data["ids"]
        Product.objects.filter(uuid__in=uuids).delete()
        return response.Response(status=status.HTTP_200_OK)

class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CustomerUsers to be viewed or edited.
    """
    queryset = Order.objects.all()
    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return FetchOrderSerializer
        if self.request.method in ["POST"]:
            return CreateOrderSerializer
        if self.request.method in ["PATCH", "PUT"]:
            return UpdateOrderSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        original_response = super().create(request, *args, **kwargs)
        original_response.status_code = 200 # change status code to 200 for tests because scope is non standard
        return original_response

    def update(self, request, *args, **kwargs):
        original_response = super().update(request, *args, **kwargs)
        original_response.data = {"order": original_response.data}
        return original_response

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse({"order":serializer.data})

class ListOrdersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CustomerUsers to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = ListOrdersSerializer



    def create(self, request, *args, **kwargs):
        uuids = request.data.get("ids",[])
        customerId = request.data.get("customerId", [])
        if uuids:
            self.queryset = self.queryset.filter(uuid__in=uuids)
        if customerId:
            self.queryset = self.queryset.filter(CustomerUser_id__uuid=customerId)
        return JsonResponse({"orders": list(self.queryset.values())},safe=False)
