import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Stack spacing={'10px'}> */}
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Input placeholder="Select remarks" size="md" />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input size="md" type="date" />
              <FormErrorMessage>Date is required.</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input placeholder="Amount" size="md" />
            </FormControl>
            <FormControl>
              <FormLabel>Account</FormLabel>
              <Select placeholder="Select account">
                <option value="option1">CIMB Savings</option>
                <option value="option2">KOMO Savings</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select category">
                <option value="option1">Gifts</option>
                <option value="option2">Dining Out</option>
                <option value="option2">Fun Money</option>
              </Select>
            </FormControl>
            {/* </Stack> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={'20px'} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
