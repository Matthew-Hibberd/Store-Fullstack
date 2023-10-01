from django.forms import ValidationError
from rest_framework import serializers
from .models import CustomerUser, Product, Order


class CreateCustomerUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField
    email = serializers.EmailField

    class Meta:
        model = CustomerUser
        fields = '__all__'

class DeleteCustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUser

class ListCustomerUsersSerializer(serializers.ModelSerializer):
    ids = serializers.JSONField
    emails = serializers.JSONField(required=False)
    class Meta:
        model = CustomerUser
        fields = '__all__'

class ListProductsSerializer(serializers.ModelSerializer):
    ids = serializers.JSONField()
    class Meta:
        model = Product
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'uuid']

    def validate(self, attrs):
        return super().validate(attrs)
    def create(self, validated_data):
        return super().create(validated_data)

class UpdateProductSerializer(serializers.ModelSerializer):
    price = serializers.FloatField(required=False)
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'uuid']

    def validate(self, attrs):
        return super().validate(attrs)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class FetchProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class DeleteProductsSerializer(serializers.ModelSerializer):
    ids = serializers.JSONField
    class Meta:
        model = Product
        fields = '__all__'

class CreateOrderSerializer(serializers.ModelSerializer):
    CustomerUser_id = serializers.CharField(required=False)
    customer_id = serializers.CharField(required=False)
    class Meta:
        model = Order
        fields = '__all__'
    def validate(self, attrs):
        if not 'customer_id' in self.initial_data.keys():
            raise ValidationError("customer_id is a required field")
        attrs["CustomerUser_id"] = CustomerUser.objects.filter(uuid=self.initial_data['customer_id']).first()
        for product in self.initial_data['products']:
            try:
                Product.objects.get(uuid=product)
            except Exception as e:
                raise ValueError(f"{product} is not a real product")
        return super().validate(attrs)
    def create(self, validated_data):
        validated_data.pop('customer_id')
        return super().create(validated_data)

class ListOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class UpdateOrderSerializer(serializers.ModelSerializer):
    paid = serializers.BooleanField(required=False)
    total = serializers.FloatField(required=False)
    products = serializers.JSONField(required=False)
    CustomerUser_id = serializers.CharField(required=False)
    customer_id = serializers.CharField(required=False)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, attrs):
        if 'customer_id' in self.initial_data.keys():
            attrs["CustomerUser_id"] = CustomerUser.objects.filter(uuid=self.initial_data['customer_id']).first()
        if 'products' in self.initial_data.keys():
            for product in self.initial_data['products']:
                try:
                    Product.objects.get(uuid=product)
                except Exception as e:
                    raise ValueError(f"{product} is not a real product")
        return super().validate(attrs)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class FetchOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
