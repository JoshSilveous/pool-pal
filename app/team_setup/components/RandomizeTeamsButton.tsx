import { GameController } from '@/hooks/useGameLogic'
import { Button, StyleSheet, View } from 'react-native'

type RandomizeTeamsButtonProps = {
	gameCtrl: GameController
}
export default function RandomizeTeamsButton({ gameCtrl }: RandomizeTeamsButtonProps) {
	const handleRandomizeTeams = () => {
		const playerIDs = Object.keys(gameCtrl.players)

		// Shuffle the array using Fisher-Yates
		for (let i = playerIDs.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[playerIDs[i], playerIDs[j]] = [playerIDs[j], playerIDs[i]]
		}

		// Split into two teams (Team One gets the extra player if odd)
		const half = Math.ceil(playerIDs.length / 2)
		const teamOneIDs = playerIDs.slice(0, half)
		const teamTwoIDs = playerIDs.slice(half)

		gameCtrl.setTeams({
			one: { playerIDs: teamOneIDs, side: null },
			two: { playerIDs: teamTwoIDs, side: null },
		})
	}
	return (
		<View style={styles.container}>
			<Button title='Randomize Teams' onPress={handleRandomizeTeams} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
})
