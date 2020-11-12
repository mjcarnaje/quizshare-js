import React from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { array } from 'yup';

const QuestionEditor = ({ name }) => {
	return (
		<Field name={name}>
			{(fieldProps) => (
				<div style={{ marginTop: 10, marginBottom: 10 }}>
					<Field name={`${name}.question`} placeholder='Enter question ' />
					<FieldArray name={`${name}.choices`}>
						{(arrayHelpers) => {
							return (
								<>
									{fieldProps.field.value.choices.map((c, i) => {
										return (
											<div style={{ marginTop: '20px' }}>
												<div key={i} style={{ display: 'inline' }}>
													<Field
														name={`${fieldProps.field.name}.choices.${i}`}
														placeholder='Type your answer'
														type='text'
														value={c}
													/>
												</div>
												<Field
													type='radio'
													name={`${fieldProps.field.name}.answer`}
													value={c}
												/>
												<button
													type='button'
													onClick={() => {
														arrayHelpers.remove(i);
													}}
												>
													x
												</button>
											</div>
										);
									})}

									<button
										type='button'
										onClick={() => {
											arrayHelpers.push('');
										}}
									>
										add
									</button>
								</>
							);
						}}
					</FieldArray>
				</div>
			)}
		</Field>
	);
};

const Testing = () => {
	return (
		<div>
			<Formik
				initialValues={{
					title: '',
					description: '',
					questions: [
						{
							question: '',
							choices: [''],
							answer: null,
						},
					],
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ values }) => (
					<>
						<Form>
							<div>title</div>
							<Field name='title' placeholder='Enter title ' />{' '}
							<div>description</div>
							<Field
								name='description'
								placeholder='Enter description'
								style={{ marginBottom: '20px' }}
							/>
							<FieldArray name='questions'>
								{(arrayHelpers) => {
									return (
										<>
											<button
												type='button'
												style={{ display: 'block' }}
												onClick={() =>
													arrayHelpers.push({
														question: '',
														choices: [''],
														answer: '',
													})
												}
											>
												add question
											</button>
											{values.questions.map((q, i) => {
												return (
													<QuestionEditor
														key={i}
														name={`${arrayHelpers.name}.${i}`}
													/>
												);
											})}
										</>
									);
								}}
							</FieldArray>
						</Form>
						<pre>{JSON.stringify(values, null, 2)}</pre>
					</>
				)}
			</Formik>
		</div>
	);
};

export default Testing;
