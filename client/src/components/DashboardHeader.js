import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  IconButton,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import { GET_USER } from "../utils/graphql";

const DELETE_USER = gql`
  mutation deleteUserData {
    deleteUserData
  }
`;

const DashboardHeader = () => {
  const cache = useApolloClient();
  const toast = useToast();
  const dispatch = useDispatch();
  const hide = useBreakpointValue({ base: false, md: true });
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { loading: currentUserLoading, data: { currentUser } = {} } =
    useQuery(GET_USER);

  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    update() {
      localStorage.removeItem("token");
      cache.clearStore();
      dispatch(logoutUser());
      onClose();
      history.push("/home");
      toast({
        title: "Account deleted.",
        description:
          "We've deleted all your data for you. Thank you for using this personal website",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  if (currentUserLoading) {
    return (
      <Box w="full" textAlign="center">
        <Spinner thickness="2px" speed=".7s" color="purple.500" size="30px" />
      </Box>
    );
  }
  const { username, avatar, email } = currentUser;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      bg="white"
      py="24px"
      px="10px"
    >
      <Box display="flex" alignItems="center" w="full">
        <Avatar name={username} src={avatar} />
        <Box ml="15px">
          <Text
            fontFamily="inter"
            fontWeight="bold"
            fontSize="20px"
            color="blue.900"
          >
            {username}
          </Text>
          <Text
            fontFamily="inter"
            fontSize="14px"
            fontWeight="300"
            color="gray.700"
            lineHeight="1"
          >
            {email}
          </Text>
        </Box>
        <Box ml="auto">
          {hide ? (
            <Button
              leftIcon={<MdDeleteForever />}
              colorScheme="red"
              onClick={onOpen}
              size="sm"
            >
              Delete Account
            </Button>
          ) : (
            <IconButton
              isRound
              icon={<MdDeleteForever />}
              colorScheme="red"
              onClick={onOpen}
              size="sm"
            />
          )}

          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent borderRadius="8px">
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                fontFamily="inter"
              >
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody fontFamily="inter">
                All your data will be deleted. Are you sure? You can't undo this
                action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} fontFamily="inter">
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={deleteUser}
                  ml={3}
                  fontFamily="inter"
                  loadingText="Deleting data..."
                  isLoading={loading ? true : false}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
