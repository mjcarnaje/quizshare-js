import { useQuery } from '@apollo/client';
import {
	Avatar,
	Box,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	SimpleGrid,
	Spinner,
	useDisclosure,
	Text,
	SlideFade,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
	FaFacebook,
	FaHeart,
	FaInstagram,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GET_ALL_USER } from '../utils/graphql';

const Users = () => {
	const { isOpen, onOpen } = useDisclosure();
	const { loading, error, data: { getAllUser: data } = {} } = useQuery(
		GET_ALL_USER
	);

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	if (loading)
		return (
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='purple.500'
				size='xl'
			/>
		);

	if (error) return <p>Error</p>;

	return (
		<Box h='full' w='full'>
			<SlideFade in={isOpen} offsetY='-20px'>
				<Container maxW='6xl' pb='80px'>
					<Center flexDirection='column' py={{ base: '60px', md: '80px' }}>
						<Heading
							as='h1'
							fontFamily='inter'
							fontWeight='800'
							color='gray.700'
							lineHeight='1'
							textAlign='center'
							fontSize={{ base: '44px', md: '56px' }}
						>
							QuizShare Users
						</Heading>
						<Text
							fontFamily='inter'
							fontSize={{ md: '18px' }}
							py='20px'
							textAlign='center'
						>
							Thank you for using this mini website.{' '}
							<Icon as={FaHeart} color='gray.700' />
						</Text>
					</Center>
					<SimpleGrid columns={{ base: '1', md: '2' }} w='full' gap='32px'>
						{data.map((user) => (
							<Flex key={user.user}>
								<Avatar
									as={Link}
									to={`/user/${user.user}`}
									size='xl'
									src={user.userData.avatar}
								/>
								<Box ml='24px'>
									<Text
										fontFamily='inter'
										fontWeight='semibold'
										color='gray.700'
										fontSize='18px'
									>
										{user.firstName || user.lastName
											? `${user.firstName || ''} ${user.lastName || ''}`
											: user.userData.username}
									</Text>
									<HStack spacing='0' ml='-10px'>
										{user.social.twitter && (
											<IconButton
												as='a'
												target='_blank'
												href={`https://${user.social.twitter}`}
												rel='noreferrer noopener'
												isRound
												variant='ghost'
												colorScheme='purple'
												fontSize='18px'
												icon={<FaTwitter />}
											/>
										)}
										{user.social.youtube && (
											<IconButton
												as='a'
												target='_blank'
												href={`https://${user.social.youtube}`}
												rel='noreferrer noopener'
												isRound
												variant='ghost'
												colorScheme='purple'
												fontSize='18px'
												icon={<FaYoutube />}
											/>
										)}
										{user.social.instagram && (
											<IconButton
												as='a'
												target='_blank'
												href={`https://${user.social.instagram}`}
												rel='noreferrer noopener'
												isRound
												variant='ghost'
												colorScheme='purple'
												fontSize='18px'
												icon={<FaInstagram />}
											/>
										)}
										{user.social.facebook && (
											<IconButton
												as='a'
												target='_blank'
												href={`https://${user.social.facebook}`}
												rel='noreferrer noopener'
												isRound
												variant='ghost'
												colorScheme='purple'
												fontSize='18px'
												icon={<FaFacebook />}
											/>
										)}
									</HStack>
									<Text fontFamily='inter' maxW='350px'>
										{user.bio}
									</Text>
								</Box>
							</Flex>
						))}
					</SimpleGrid>
				</Container>
			</SlideFade>
		</Box>
	);
};

export default Users;
