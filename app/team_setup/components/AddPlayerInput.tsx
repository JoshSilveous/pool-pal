import { GameController } from '@/hooks/useGameLogic'
import { useState } from 'react'
import { Button, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

type AddPlayerInputProps = {
	gameCtrl: GameController
	style?: StyleProp<ViewStyle>
}
export default function AddPlayerInput({ gameCtrl, style }: AddPlayerInputProps) {
	const [newPlayerName, setNewPlayerName] = useState('')
	const [teamToAddTo, setTeamToAddTo] = useState<keyof Teams>('one')

	const handleAddPlayer = () => {
		if (newPlayerName.trim().length === 0) return

		gameCtrl.addNewPlayer(newPlayerName, teamToAddTo)
		setNewPlayerName('')
		setTeamToAddTo((prev) => (prev === 'one' ? 'two' : 'one'))
	}

	return (
		<View style={[styles.container, style]}>
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
