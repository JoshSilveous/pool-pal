import { deepClone } from '@/util/deepClone'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import TeamViewer from './teamViewer'

export default function TeamSetup() {
	const [newPlayerName, setNewPlayerName] = useState('')
	const [players, setPlayers] = useState<Player[]>([])

	const [teams, setTeams] = useState<Teams>({
		one: { playerIDs: [], side: null },
		two: { playerIDs: [], side: null },
	})

	const handleAddPlayer = () => {
		if (newPlayerName.trim().length === 0) return

		const newPlayer: Player = {
			name: newPlayerName,
			id: Math.random().toString(36).substr(2, 9),
		}
		setPlayers((current) => [...current, newPlayer])
		setNewPlayerName('')
		setTeams((prev) => {
			const clone = deepClone(prev)
			clone.one.playerIDs = [...clone.one.playerIDs, newPlayer.id]
			return clone
		})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Team Setup</Text>
			<TeamViewer players={players} teams={teams} />
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Player Name'
					value={newPlayerName}
					onChangeText={setNewPlayerName}
					autoCapitalize='words'
				/>
				<Button title='Add' onPress={handleAddPlayer} />
			</View>
			<View style={styles.teams_container}>
				<View style={styles.team_container}></View>
				<View style={styles.team_container}></View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f9ff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	teams_container: {},
	team_container: {},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'gray',
		padding: 8,
		marginRight: 8,
		borderRadius: 4,
		backgroundColor: '#fff',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	playerItem: {
		fontSize: 18,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	emptyMessage: {
		textAlign: 'center',
		fontStyle: 'italic',
		color: '#666',
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
