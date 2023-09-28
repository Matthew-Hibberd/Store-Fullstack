import React from 'react'
import {
    ChakraProvider,
    theme,
    Text,
    Heading,
    Card,
    CardBody,
    CardHeader,
    Stack,
    StackDivider,
    Box,
    List,
    ListItem
  } from "@chakra-ui/react"
import orders from '../data/orders';

const OrdersList: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      {orders.length === 0 ? (
        <Text>You have no orders.</Text>
      ) : (
        <List spacing={3}>
            {orders.map((orderItem) => {
                const order = orders.find((item) => item === orderItem);
                if (order) {
                    return (
                        <ListItem key={order.uuid}>
                        <Card>
                            <CardHeader>
                                <Heading size='md'>{order.uuid}</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Products
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    <List >
                                        <ListItem>
                                        {order.products.map((productuuid) => {
                                            return (<Text>{productuuid}</Text>)
                                        })}
                                        </ListItem>
                                    </List>
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Total
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {order.total}
                                    </Text>
                                </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        </ListItem>
                    );
                }
                return null;
            })}
        </List>
      )}
    </ChakraProvider>
  );
};

export default OrdersList;
