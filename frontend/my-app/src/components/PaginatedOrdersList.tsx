import React, { useState } from 'react';
import {
    Button,
    Heading,
    Card,
    CardBody,
    CardHeader,
    Stack,
    StackDivider,
    Box,
    Text,
    List,
    ListItem,
    IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Order } from './OrdersList'

// Define the type for the 'data' prop
type DataProp = Order[];

const itemsPerPage = 10; // Number of items per page

interface PaginatedListProps {
  data: DataProp; // Use the defined type for the 'data' prop
}

const PaginatedOrdersList: React.FC<PaginatedListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page of items
  const currentItems = data.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (<Box>
      <Stack spacing={4}>
        {currentItems.map((order, index) => (
          <Box key={index} borderWidth="1px" p={4} rounded="md">
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
                        <List >
                            <ListItem>
                            {order.products.map((productuuid) => {
                                return (<Text>{productuuid}</Text>)
                            })}
                            </ListItem>
                        </List>
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
          </Box>
        ))}
      </Stack>
      <Stack mt={4} direction="row" spacing={2} justify="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={() => goToPage(currentPage - 1)}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => goToPage(index + 1)}
            variant={index + 1 === currentPage ? 'solid' : 'outline'}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={() => goToPage(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
        />
      </Stack>
    </Box>
  );
};

export default PaginatedOrdersList;
