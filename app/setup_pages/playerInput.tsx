import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

type Player = { name: string; id: string }

export default function PlayerInput() {
	const [playerName, setPlayerName] = useState('')
	const [players, setPlayers] = useState<Player[]>([])

	const handleAddPlayer = () => {
		if (playerName.trim().length === 0) return

		const newPlayer: Player = {
			name: playerName,
			id: Math.random().toString(36).substr(2, 9),
		}
		setPlayers((current) => [...current, newPlayer])
		setPlayerName('')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enter Player Names</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Player Name'
					value={playerName}
					onChangeText={setPlayerName}
					autoCapitalize='words'
				/>
				<Button title='Add' onPress={handleAddPlayer} />
			</View>
			<FlatList
				data={players}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Text style={styles.playerItem}>{item.name}</Text>}
				ListEmptyComponent={
					<Text style={styles.emptyMessage}>No players added yet.</Text>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f0f9ff',
	},
	title: {
		fontSize: 24,
		marginBottom: 16,
		fontWeight: '600',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'gray',
		padding: 8,
		marginRight: 8,
		borderRadius: 4,
		backgroundColor: '#fff',
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
})
