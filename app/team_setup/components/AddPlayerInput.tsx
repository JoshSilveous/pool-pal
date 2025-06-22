import { deepClone } from '@/util/deepClone'
import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'

type AddPlayerInputProps = {
	setPlayers: (value: React.SetStateAction<Players>) => void
	setTeams: (value: React.SetStateAction<Teams>) => void
}
export default function AddPlayerInput({ setPlayers, setTeams }: AddPlayerInputProps) {
	const [newPlayerName, setNewPlayerName] = useState('')
	const [teamToAddTo, setTeamToAddTo] = useState<keyof Teams>('one')

	const handleAddPlayer = () => {
		if (newPlayerName.trim().length === 0) return

		const newPlayerID = Math.random().toString(36).substr(2, 9)

		setPlayers((prev) => ({ ...prev, [newPlayerID]: { name: newPlayerName.trim() } }))
		setNewPlayerName('')
		setTeams((prev) => {
			const clone = deepClone(prev)
			clone[teamToAddTo].playerIDs = [...clone[teamToAddTo].playerIDs, newPlayerID]
			return clone
		})
		setTeamToAddTo((prev) => (prev === 'one' ? 'two' : 'one'))
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Player Name'
				value={newPlayerName}
				onChangeText={setNewPlayerName}
				autoCapitalize='words'
				onSubmitEditing={handleAddPlayer}
				blurOnSubmit={false}
			/>
			<Button title='Add' onPress={handleAddPlayer} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
})
