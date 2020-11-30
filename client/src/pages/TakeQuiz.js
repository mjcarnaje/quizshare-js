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
	ScaleFade,
	Spacer,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import failed from '../assets/svg/failed.svg';
import success from '../assets/svg/success.svg';
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

	const { isOpen, onToggle } = useDisclosure();

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
		onToggle();
	};

	const nextQuestion = () => {
		onToggle();
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
		if (questions) {
			setCurrentQuestion(questions[currentIndex]);
		}
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
		<Box w='full' h='full' p='10px' py={['48px', '64px']}>
			<Container
				minH={['80vh', '70vh']}
				maxW='lg'
				bg='white'
				p='15px'
				boxShadow='sm'
				borderRadius='5px'
				display='flex'
				flexDirection='column'
			>
				{finished ? (
					<Grid
						templateColumns='repeat(auto-fit, minmax(250px, 1fr))'
						m='auto'
						w='full'
						p={['5px', '30px']}
					>
						<Box w='full' h='full' textAlign='center'>
							<Box mx='auto'>
								<LazyLoadImage width='80%' src={passed ? success : failed} />
							</Box>
							<Text
								mt='20px'
								fontSize='18px'
								fontFamily='inter'
								color='gray.700'
							>
								{passed ? "You've pass this quiz." : "You've failed this quiz."}
							</Text>
						</Box>
						<Stack
							spacing={['48px', '96px']}
							w='full'
							align='center'
							mt={['50px', '0px']}
							justify='center'
						>
							<Box>
								<Heading
									as='h1'
									fontFamily='montserrat'
									fontWeight='800'
									color='gray.700'
									fontSize='72px'
								>
									{`${score} / ${questions.length}`}
								</Heading>
							</Box>
							<VStack w='70%'>
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
						<Flex py='20px' direction='column' position='relative'>
							<Circle
								m='5px'
								fontFamily='poppins'
								border='1px'
								borderColor='gray.100'
								fontSize='18px'
								color='gray.500'
								size='40px'
								position='absolute'
								left='5px'
								top='5px'
							>
								<span style={{ fontSize: '12px' }}>#</span>
								{currentIndex + 1}
							</Circle>
							<Box px='40px'>
								<Text
									w='full'
									fontSize={{ base: '18px', md: '22px' }}
									fontFamily='inter'
									fontWeight={{ base: '500', md: 'semibold' }}
									textAlign='center'
									color='gray.700'
								>
									{question}
								</Text>
							</Box>
						</Flex>
						<Spacer />
						<Box
							display='flex'
							flexWrap='wrap'
							justifyContent='center'
							h='full'
							py={{ base: '60px', md: '20px' }}
						>
							{choices?.map((choice, i) => (
								<Flex
									key={choice.id}
									as='button'
									onClick={() => selectedAnswer(choice.id)}
									grow={{ base: '1', md: '0' }}
									shrink='1'
									basis='340px'
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
									_hover={{
										bg: recordedAnswers[currentIndex] ? '' : 'gray.50',
									}}
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
						{showExplanation && currentQuestion.explanation !== null && (
							<ScaleFade initialScale={0.9} in={isOpen}>
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
							</ScaleFade>
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
		</Box>
	);
};

export default TakeQuiz;
