import useGameLogic from '@/hooks/useGameLogic'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ActiveGamePage from './active_game/ActiveGamePage'
import TeamsSetup from './team_setup/TeamsSetup'

export default function App() {
	const [curPage, setCurPage] = useState('entry')

	const gameCtrl = useGameLogic()

	return (
		<View style={s.container}>
			<Text style={s.title}>Pool Pal</Text>
			{curPage === 'entry' && (
				<>
					<View style={s.buttonContainer}>
						<Button
							title='Get Started'
							onPress={() => setCurPage('setup_team')}
						/>
					</View>
				</>
			)}
			{curPage === 'setup_team' && <TeamsSetup {...{ setCurPage, gameCtrl }} />}
			{curPage === 'active_game' && <ActiveGamePage {...{ setCurPage, gameCtrl }} />}
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
