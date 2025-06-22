import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import TeamsSetup from './team_setup/TeamsSetup'

export default function HomeScreen() {
	const [count, setCount] = useState(0)
	const [page, setPage] = useState('entry')

	return (
		<View style={s.container}>
			<Text style={s.title}>Pool Pal</Text>
			{page === 'entry' && (
				<>
					<View style={s.buttonContainer}>
						<Button title='Get Started' onPress={() => setPage('setup_team')} />
					</View>
				</>
			)}
			{page === 'setup_team' && <TeamsSetup />}
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f9ff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 24,
	},
	counter: {
		fontSize: 22,
		marginBottom: 16,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 12,
	},
})
