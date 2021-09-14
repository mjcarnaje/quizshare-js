import { Avatar, Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import MenuButtons from "./MenuButtons";
import { Link } from "react-router-dom";

const CommentBox = ({
  commentData: { id, createdAt, body, author },
  quizId,
}) => {
  const user = useSelector((state) => state.auth.user);
  let _id, username, avatar, email;
  if (!author) {
    _id = "unknown-user";
    username = "user";
    avatar = "";
    email = "unknown";
  } else {
    _id = author.id;
    username = author.username;
    avatar = author.avatar;
    email = author.email;
  }
  return (
    <>
      <Box
        my="10px"
        bg="white"
        borderRadius="8px"
        p="10px"
        display="flex"
        boxShadow="sm"
        position="relative"
      >
        <Avatar
          as={Link}
          to={`/user/${_id}`}
          name={author ? username : ""}
          src={avatar}
        />
        <Box ml="10px">
          <Box display="flex" alignItems="center">
            <Text fontFamily="inter" fontSize="17px" fontWeight="semibold">
              {username}
            </Text>
            <Text ml="5px" fontFamily="inter" fontSize="14px" color="gray.600">
              {email}
            </Text>
            <Text ml="5px" fontWeight="bold" color="gray.600">
              &#183;
            </Text>
            <Text ml="5px" fontFamily="inter" fontSize="14px" color="gray.600">
              {moment(createdAt).fromNow(true)}
            </Text>
          </Box>

          <Text fontFamily="inter" fontSize="18px" wordBreak="break-all">
            {body}
          </Text>
        </Box>
        {user?.username === username && (
          <Box ml="auto" position="absolute" right="4px" top="4px">
            <MenuButtons deleteOnly commentId={id} quizId={quizId} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default CommentBox;
