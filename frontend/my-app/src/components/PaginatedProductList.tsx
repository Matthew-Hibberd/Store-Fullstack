import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  SimpleGrid,
  IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Product } from './ProductDetail';

// Define the type for the 'data' prop
type DataProp = Product[];

const itemsPerPage = 10; // Number of items per page

interface PaginatedListProps {
  data: DataProp; // Use the defined type for the 'data' prop
  onDelete: (selectedProductUuids: string[]) => void;
}

const PaginatedProductList: React.FC<PaginatedListProps> = ({ data, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page of items
  const currentItems = data.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProductSelection = (uuid: string) => {
    if (selectedProducts.includes(uuid)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== uuid));
    } else {
      setSelectedProducts([...selectedProducts, uuid]);
    }
  };

  const deleteSelectedProducts = () => {
    // Make an API request with the selected product UUIDs
    onDelete(selectedProducts);
    // Clear the selection
    setSelectedProducts([]);
  };


  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <SimpleGrid columns={2} spacing={4}>
        {currentItems.map((product) => (
          <Box key={product.uuid} borderWidth="1px" p={4} rounded="md"
          onClick={() => toggleProductSelection(product.uuid)}
            backgroundColor={
              selectedProducts.includes(product.uuid) ? 'blue.100' : 'white'
            }
          >
            <Link to={`/product/${product.uuid}`}>{product.name}</Link>
          </Box>
        ))}
      </SimpleGrid>
      <Stack mt={4} direction="row" spacing={2} justify="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={() => goToPage(currentPage - 1)}
          isDisabled={currentPage === 1}
          aria-label="Previous Page" // Add aria-label here
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
          aria-label="Next Page" // Add aria-label here
        />
      </Stack>
      <Button
        onClick={deleteSelectedProducts}
        disabled={selectedProducts.length === 0}
      >
        Delete Selected
      </Button>
    </Box>
  );
};

export default PaginatedProductList;
