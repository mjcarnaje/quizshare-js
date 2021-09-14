import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { BsPlusSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuid } from "uuid";

const ChoiceArray = ({
  questionIndex,
  answerValue,
  updateMode,
  doneFetching,
}) => {
  const { control, register, errors } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${questionIndex}].choices`,
    keyName: "defaultID",
  });
  useEffect(() => {
    if (updateMode && doneFetching) return;
    append({ id: uuid(), value: "" }, false);
    append({ id: uuid(), value: "" }, false);
  }, [updateMode]);

  return (
    <Box my="10px">
      <Flex>
        <Spacer />
        <Button
          leftIcon={<BsPlusSquare />}
          colorScheme="purple"
          variant="ghost"
          size="xs"
          onClick={() => append({ id: uuid(), value: "" })}
        >
          Add Choice
        </Button>
      </Flex>
      <Controller
        as={<RadioGroup />}
        name={`questions[${questionIndex}].answer`}
        control={control}
        rules={{ required: true }}
        defaultValue={answerValue}
      >
        <Grid
          my="10px"
          templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap={4}
        >
          {fields.map((choice, index) => {
            const ID = choice.id;
            return (
              <Flex
                key={choice.defaultID}
                bg="#f7fafc"
                borderRadius="md"
                h="full"
                direction="column"
              >
                <input
                  type="hidden"
                  ref={register({
                    name: `questions[${questionIndex}].choices[${index}].id`,
                    value: ID,
                  })}
                />
                <FormControl
                  isInvalid={
                    errors.questions?.[questionIndex]?.choices?.[index]
                  }
                >
                  <Input
                    name={`questions[${questionIndex}].choices[${index}].value`}
                    ref={register({ required: true })}
                    defaultValue={choice.value}
                    py="7px"
                    as={TextareaAutosize}
                    type="text"
                    variant="filled"
                    bg="#f7fafc"
                    _focus={{ outline: "none", bg: "gray.50" }}
                    _hover={{ bg: "gray.50" }}
                    fontFamily="inter"
                    placeholder="Type your answer here..."
                    resize="none"
                    overflow="hidden"
                    isInvalid={
                      errors.questions?.[questionIndex]?.choices?.[index]
                        ? true
                        : false
                    }
                  />
                  <FormErrorMessage m="0" px="5px" pb="5px">
                    {`Choice ${index + 1} is required: type or remove it 😉`}
                  </FormErrorMessage>
                </FormControl>
                <Flex
                  bg="gray.100"
                  rounded="md"
                  justifyContent="space-between"
                  mt="auto"
                  alignItems="center"
                  pl="10px"
                >
                  <Flex align="center">
                    <Radio
                      value={ID}
                      colorScheme="green"
                      isInvalid={
                        errors.questions?.[questionIndex]?.answer ? true : false
                      }
                    >
                      correct answer
                    </Radio>
                  </Flex>
                  <IconButton
                    icon={<MdDelete />}
                    size="sm"
                    color="red.300"
                    onClick={() => remove(index)}
                    isDisabled={fields.length === 1 ? true : false}
                  />
                </Flex>
              </Flex>
            );
          })}
        </Grid>
      </Controller>
      <VStack spacing="10px">
        {errors.questions?.[questionIndex]?.answer && (
          <Alert status="error" borderRadius="5px">
            <AlertIcon />
            Please select the correct answer to this question
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default ChoiceArray;
