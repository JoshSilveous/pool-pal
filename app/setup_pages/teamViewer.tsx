import { StyleSheet, Text, View } from 'react-native'

export type TeamViewerProps = {
	players: Player[]
	teams: Teams
}
export default function TeamViewer({ players, teams }: TeamViewerProps) {
	return (
		<View style={s.container}>
			<View style={s.team_container}>
				<Text style={s.team_title}>Team 1</Text>
				<View style={s.team_players}>
					{teams.one.playerIDs.map((id) => {
						return (
							<View style={s.player} key={id}>
								<Text style={s.player_text}>
									{players.find((player) => player.id === id)?.name}
								</Text>
							</View>
						)
					})}
				</View>
			</View>
			<View style={s.team_container}>
				<Text style={s.team_title}>Team 2</Text>
				<View style={s.team_players}>
					{teams.two.playerIDs.map((id) => {
						return (
							<View style={s.player} key={id}>
								<Text style={s.player_text}>
									{players.find((player) => player.id === id)?.name}
								</Text>
							</View>
						)
					})}
				</View>
			</View>
		</View>
	)
}
const s = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 16,
		gap: 12,
	},
	team_container: {
		flex: 1,
		padding: 12,
		backgroundColor: '#f5faff',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 6,
		elevation: 2,
	},
	team_title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
		textAlign: 'center',
	},
	team_players: {
		gap: 8,
	},
	player: {
		padding: 8,
		borderRadius: 8,
		backgroundColor: '#e1f5fe',
	},
	player_text: {
		fontSize: 16,
		textAlign: 'center',
	},
})
