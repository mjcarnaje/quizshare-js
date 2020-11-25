import { useQuery } from '@apollo/client';
import {
	Box,
	Button,
	Circle,
	Container,
	Flex,
	Grid,
	Heading,
	HStack,
	Image,
	Spacer,
	Spinner,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ_TAKE_DATA } from '../utils/graphql';

const TakeQuiz = (props) => {
	const quizId = props.match.params.id;
	const [questions, setQuestions] = useState();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState();
	const [recordedAnswers, setRecordedAnswers] = useState([]);
	const [showExplanation, setShowExplanation] = useState(false);
	const [score, setScore] = useState(0);
	const [finished, setFinished] = useState(false);

	const questionFromOrignal = questions ? questions[currentIndex + 1] : null;
	const answered = recordedAnswers[currentIndex];

	const { loading, error, data: { getQuiz: questionsData } = {} } = useQuery(
		QUIZ_TAKE_DATA,
		{
			variables: {
				quizId,
			},
		}
	);

	const selectedAnswer = (choiceId) => {
		if (answered) return;
		const correct = currentQuestion.answer === choiceId;
		setShowExplanation(true);
		setRecordedAnswers([...recordedAnswers, { correct, selected: choiceId }]);
		if (correct) setScore((prev) => prev + 1);
	};

	const nextQuestion = () => {
		setShowExplanation(false);
		if (!questionFromOrignal) return setFinished(true);
		setCurrentIndex((prev) => prev + 1);
		setCurrentQuestion(questionFromOrignal);
	};

	const playAgain = () => {
		setFinished(false);
		setCurrentIndex(0);
		setScore(0);
		setRecordedAnswers([]);
	};

	useEffect(() => {
		setQuestions(questionsData?.questions);
	}, [questionsData]);

	useEffect(() => {
		questions && setCurrentQuestion(questions[currentIndex]);
	}, [questions, currentIndex]);

	if (loading) {
		return (
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='purple.500'
				size='xl'
			/>
		);
	}

	if (error) return <p>There is an error</p>;

	const { question, choices, answer, explanation } = currentQuestion || {};
	const passed = score / questions?.length > 0.75;

	return (
		<Container
			maxW='lg'
			bg='white'
			p='15px'
			minH='75%'
			boxShadow='sm'
			borderRadius='5px'
			display='flex'
			flexDirection='column'
			my='4rem'
		>
			{finished ? (
				<Grid templateColumns='repeat(2, 1fr)' m='auto' w='full' p='30px'>
					<Box>
						<Image
							borderRadius='5px'
							src={
								passed
									? 'https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif'
									: 'https://media.giphy.com/media/li0dswKqIZNpm/giphy.gif'
							}
						/>
					</Box>
					<Stack spacing={20} m='auto'>
						<Heading
							as='h1'
							fontFamily='montserrat'
							fontWeight='800'
							color='gray.700'
							fontSize='72px'
						>
							{`${score} / ${questions.length}`}
						</Heading>
						<VStack>
							<Button onClick={playAgain} colorScheme='purple' w='full'>
								Play Again
							</Button>
							<Button
								as={Link}
								to='/home'
								colorScheme='purple'
								variant='outline'
								w='full'
							>
								Home
							</Button>
						</VStack>
					</Stack>
				</Grid>
			) : (
				<>
					<Flex py='20px' px='10px'>
						<Circle
							m='5px'
							fontFamily='poppins'
							border='1px'
							borderColor='gray.100'
							fontSize='18px'
							color='gray.500'
							size='40px'
						>
							<span style={{ fontSize: '12px' }}>#</span>
							{currentIndex + 1}
						</Circle>
						<Text
							w='full'
							fontSize='24px'
							fontFamily='inter'
							fontWeight='600'
							textAlign='center'
							color='gray.700'
						>
							{question}
						</Text>
					</Flex>
					<Spacer />
					<Box display='flex' flexWrap='wrap' justifyContent='center' h='full'>
						{choices?.map((choice, i) => (
							<Flex
								key={choice.id}
								as='button'
								onClick={() => selectedAnswer(choice.id)}
								shrink='1'
								basis='45%'
								p='15px'
								m='5px'
								bg={
									!recordedAnswers[currentIndex]
										? ''
										: recordedAnswers[currentIndex]?.correct &&
										  recordedAnswers[currentIndex]?.selected === choice.id
										? '#68AF15'
										: recordedAnswers[currentIndex]?.correct === false &&
										  recordedAnswers[currentIndex]?.selected === choice.id
										? '#D30000'
										: recordedAnswers[currentIndex]?.correct === false &&
										  choice.id === answer
										? '#68AF15'
										: ''
								}
								borderRadius='5px'
								border='1px'
								borderColor={
									!recordedAnswers[currentIndex]
										? 'purple.500'
										: recordedAnswers[currentIndex]?.correct &&
										  recordedAnswers[currentIndex]?.selected === choice.id
										? '#68AF15'
										: recordedAnswers[currentIndex]?.correct === false &&
										  recordedAnswers[currentIndex]?.selected === choice.id
										? '#D30000'
										: recordedAnswers[currentIndex]?.correct === false &&
										  choice.id === answer
										? '#68AF15'
										: 'purple.500'
								}
								_hover={{ bg: recordedAnswers[currentIndex] ? '' : 'gray.50' }}
								_focus={{ outline: 'none' }}
							>
								<Text
									fontSize='16px'
									fontFamily='inter'
									fontWeight='400'
									color={
										!recordedAnswers[currentIndex]
											? ''
											: recordedAnswers[currentIndex]?.correct &&
											  recordedAnswers[currentIndex]?.selected === choice.id
											? 'white'
											: recordedAnswers[currentIndex]?.correct === false &&
											  recordedAnswers[currentIndex]?.selected === choice.id
											? 'white'
											: recordedAnswers[currentIndex]?.correct === false &&
											  choice.id === answer
											? 'white'
											: ''
									}
								>
									{choice.value}
								</Text>
							</Flex>
						))}
					</Box>
					<Spacer />
					{showExplanation &&
						currentQuestion.explanation !== null &&
						currentQuestion.explanation?.trim() !== '' && (
							<Box
								bg='gray.100'
								borderRadius='8px'
								p='15px'
								w='75%'
								textAlign='center'
								my='15px'
								mx='auto'
							>
								<Text fontFamily='inter' color='gray.700'>
									{explanation}
								</Text>
							</Box>
						)}
					<div className='customForScrolling'>
						<HStack
							spacing='20px'
							bg='gray.50'
							p='5px'
							borderRadius='20px'
							flex='1'
							overflowX='auto'
						>
							{questions?.map((q, i) => (
								<Circle
									as='button'
									onClick={() => {
										if (!recordedAnswers[i]) return;
										setCurrentIndex(i);
									}}
									key={q.key}
									size='30px'
									border='1px'
									borderColor={
										!recordedAnswers[i]
											? 'gray.300'
											: recordedAnswers[i]?.correct
											? '#68AF15'
											: '#D30000'
									}
									bg={
										!recordedAnswers[i]
											? ''
											: recordedAnswers[i]?.correct
											? '#68AF15'
											: '#D30000'
									}
								>
									<Text
										fontFamily='poppins'
										fontSize='14px'
										color={
											!recordedAnswers[i]
												? 'gray.300'
												: recordedAnswers[i]?.correct
												? 'white'
												: 'white'
										}
									>
										{i + 1}
									</Text>
								</Circle>
							))}
						</HStack>
						{recordedAnswers[currentIndex] && (
							<Button
								ml='10px'
								px='30px'
								colorScheme='purple'
								variant='outline'
								onClick={nextQuestion}
							>
								{!questionFromOrignal ? 'Finish' : 'Next'}
							</Button>
						)}
					</div>
				</>
			)}
		</Container>
	);
};

export default TakeQuiz;
