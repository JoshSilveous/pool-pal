import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AddPlayerInput from './components/AddPlayerInput'
import RandomizeTeamsButton from './components/RandomizeTeamsButton'
import TeamsViewer from './components/TeamsViewer'

export default function TeamsSetup() {
	const [players, setPlayers] = useState<Players>({})

	const [teams, setTeams] = useState<Teams>({
		one: { playerIDs: [], side: null },
		two: { playerIDs: [], side: null },
	})

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			{/* TouchableWithoutFeedback allows keyboard closure by tapping anywhere */}
			<View style={styles.container}>
				<Text style={styles.title}>Team Setup</Text>
				<TeamsViewer players={players} teams={teams} />
				<AddPlayerInput setPlayers={setPlayers} setTeams={setTeams} />
				<RandomizeTeamsButton players={players} setTeams={setTeams} />
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f9ff',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 24,
	},
})
