import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import signup from "../assets/svg/signup.svg";
import { loginUser } from "../store/authSlice";
import { REGISTER } from "../utils/graphql";

const Register = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();
  const [registerMutation, { loading }] = useMutation(REGISTER);

  const { register, errors, handleSubmit, setError } = useForm({
    mode: "onChange",
  });

  function addServerErrors(errors, setError) {
    return Object.keys(errors).forEach((key) => {
      setError(key, {
        type: "server",
        message: errors[key],
      });
    });
  }

  const onSubmit = async (values) => {
    try {
      const { data } = await registerMutation({
        variables: values,
      });
      props.history.push("/home");
      dispatch(loginUser(data.register));
    } catch (err) {
      addServerErrors(err.graphQLErrors[0].extensions.errors, setError);
      setTabIndex(0);
    }
  };

  return (
    <Grid
      templateColumns={{ md: "1fr", lg: "repeat(2, 1fr)" }}
      gap={4}
      p="20px"
      maxW="1000px"
      minH="75%"
      bg="white"
      shadow="md"
      rounded="md"
      justifyItems="center"
      alignItems="center"
    >
      <Box w="full" px="64px">
        <Text
          fontSize="4xl"
          fontFamily="inter"
          fontWeight="bold"
          textAlign="center"
        >
          Create Account
        </Text>
        <Text fontSize={18} fontFamily="inter" textAlign="center">
          Create your QuizShare account
        </Text>
        <Stack fontFamily="inter" spacing={2} pt="16px">
          <Tabs
            isFitted
            variant="soft-rounded"
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList h="30px" boxShadow="sm" rounded="20px" mb="20px">
              <Tab
                fontFamily="inter"
                _selected={{
                  color: "white",
                  background: "linear-gradient(to right, #f687b3, #9f7aea)",
                }}
                _focus={{ outline: "none" }}
              >
                First Step
              </Tab>
              <Tab
                fontFamily="inter"
                _selected={{
                  color: "white",
                  background: "linear-gradient(to left, #f687b3, #9f7aea)",
                }}
                _focus={{ outline: "none" }}
              >
                Second Step
              </Tab>
            </TabList>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanels>
                <TabPanel>
                  <FormControl isInvalid={errors.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      id="username"
                      name="username"
                      focusBorderColor="purple.500"
                      placeholder="Enter username"
                      ref={register({
                        required: "username is a required field",
                        minLength: {
                          value: 6,
                          message: "username must be atleast 6 characters",
                        },
                        maxLength: {
                          value: 12,
                          message: "username must not exceed 12 characters",
                        },
                      })}
                      isInvalid={errors.username}
                    />
                    <FormErrorMessage>
                      {errors.username?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      focusBorderColor="purple.500"
                      placeholder="Enter Email"
                      ref={register({
                        required: "email is a required field",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid email address",
                        },
                      })}
                      isInvalid={errors.email}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                  <Button
                    w="full"
                    mt="16px"
                    colorScheme="purple"
                    onClick={() => setTabIndex(1)}
                  >
                    Next
                  </Button>
                </TabPanel>
                <TabPanel>
                  <FormControl isInvalid={errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      focusBorderColor="purple.500"
                      placeholder="Enter password"
                      ref={register({
                        required: "password is a required field",
                        minLength: {
                          value: 6,
                          message: "password must be atleast 6 characters",
                        },
                      })}
                      isInvalid={errors.password}
                    />
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.confirmPassword}>
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      focusBorderColor="purple.500"
                      placeholder="Enter confirm password"
                      ref={register({
                        required: "confirm password is a required field",
                      })}
                      isInvalid={errors.confirmPassword}
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    w="full"
                    mt="16px"
                    colorScheme="purple"
                    type="sumbit"
                    isLoading={loading}
                    loadingText="Registering in"
                  >
                    Register
                  </Button>
                </TabPanel>
              </TabPanels>
            </form>
          </Tabs>
          <Flex justifyContent="center" alignItems="center">
            <Text fontFamily="inter" fontSize="sm">
              Already have an account?
            </Text>
            <Text
              fontFamily="inter"
              color="purple.500"
              fontSize="sm"
              fontWeight="bold"
              paddingX={2}
            >
              <Link to="/login">Sign In!</Link>
            </Text>
          </Flex>
        </Stack>
      </Box>
      <Box w="100%" display={{ base: "none", lg: "block" }}>
        <Image objectFit="cover" src={signup} alt="Sign up Image" />
      </Box>
    </Grid>
  );
};

export default Register;
