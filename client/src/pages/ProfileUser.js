import { Center, Container, SlideFade, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ProfileUserHeader from '../components/ProfileUserHeader';
import ProfileUserQuizzes from '../components/ProfileUserQuizzes';

const ProfileUser = (props) => {
	const userId = props.match.params.id;
	const { isOpen, onOpen } = useDisclosure();

	useEffect(() => {
		onOpen();
	}, [onOpen]);
	return (
		<Container py='20px' maxW='3xl'>
			<SlideFade in={isOpen} offsetY='20px'>
				<Center
					bg='white'
					borderRadius='8px'
					boxShadow='md'
					flexDir='column'
					overflow='hidden'
					pb='15px'
					minH='400px'
				>
					<ProfileUserHeader userId={userId} />
				</Center>

				<ProfileUserQuizzes userId={userId} />
			</SlideFade>
		</Container>
	);
};

export default ProfileUser;
