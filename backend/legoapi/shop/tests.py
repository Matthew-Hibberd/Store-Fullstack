from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product, CustomerUser, Order
import json


class ProductAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.product_data = {
            "name": "Some Product 5",
            "description": "Some description",
            "price": 123.4,
            "uuid": "66a23fc2-0891-4d23-bc8c-db7152f46d9b"
        }

    def test_create_product(self):
        url = '/product/'
        response = self.client.post(url, json.dumps(self.product_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.count(), 1)

    def test_get_product(self):
        product = Product.objects.create(**self.product_data)
        url = f'/product/{product.uuid}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_products(self):
        product = Product.objects.create(**self.product_data)
        url = '/remove-products/'
        data = {"ids": [str(product.uuid)]}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_products(self):
        product = Product.objects.create(**self.product_data)
        url = '/products/'
        data = {"ids": [str(product.uuid)]}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update_product(self):
        product = Product.objects.create(**self.product_data)
        url = f'/product/{product.uuid}'
        data = {"price": 99.9}
        response = self.client.put(url, json.dumps(data), content_type='application/json')
        print(response.json())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CustomerUserAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.CustomerUser_data = {
            "name": "CustomerUser 2",
            "email": "CustomerUser02@gmail.com"
        }

    def test_create_CustomerUser(self):
        url = '/customer/'
        response = self.client.post(url, json.dumps(self.CustomerUser_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomerUser.objects.count(), 1)

    def test_delete_CustomerUser(self):
        customer = CustomerUser.objects.create(**self.CustomerUser_data)
        url =f'/customer/{customer.uuid}'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_CustomerUsers(self):
        customer = CustomerUser.objects.create(**self.CustomerUser_data)
        url = '/customers/'
        data = {"ids": [str(customer.uuid)], "emails": []}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class OrderAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.CustomerUser = CustomerUser.objects.create(name="CustomerUser 1", email="CustomerUser01@gmail.com")
        self.product1 = Product.objects.create(name="Product 1", description="Description 1", price=50.0)
        self.product2 = Product.objects.create(name="Product 2", description="Description 2", price=75.0)
        self.order_data = {
            "customer_id": str(self.CustomerUser.uuid),
            "paid": False,
            "products": [str(self.product1.uuid), str(self.product2.uuid)],
            "total": 125.0
        }

    def test_create_order(self):
        url = '/order/'
        response = self.client.post(url, json.dumps(self.order_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Order.objects.count(), 1)

    def test_partial_update_order(self):
        order = Order.objects.create(
            CustomerUser_id = self.CustomerUser,
            paid=self.order_data['paid'],
            products=self.order_data['products'],
            total=self.order_data['total']
        )
        url = f'/order/{order.uuid}'
        data = {"total": 150.0}
        response = self.client.put(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_order(self):
        order = Order.objects.create(CustomerUser_id=self.CustomerUser, total=100.0, products = self.order_data['products'])
        url = f'/order/{order.uuid}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_orders(self):
        order = Order.objects.create(CustomerUser_id=self.CustomerUser, total=100.0, products = self.order_data['products'])
        url = '/orders/'
        data = {"ids": [str(order.uuid)], "CustomerUserId": str(self.CustomerUser.uuid)}
        response = self.client.post(url, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

