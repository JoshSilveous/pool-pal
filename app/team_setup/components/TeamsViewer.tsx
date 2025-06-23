import { deepClone } from '@/util/deepClone'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PlayerTile from './PlayerTile'

export type TeamViewerProps = {
	players: Players
	teams: Teams
	setTeams: React.Dispatch<React.SetStateAction<Teams>>
}
export default function TeamsViewer({ players, teams, setTeams }: TeamViewerProps) {
	const teamOneContainerRef = useRef<View>(null)
	const teamTwoContainerRef = useRef<View>(null)

	const handleDrop = (id: string, fromTeam: 'one' | 'two', x: number, y: number) => {
		const teamLayouts = {
			one: { x: 0, y: 0, width: 0, height: 0 },
			two: { x: 0, y: 0, width: 0, height: 0 },
		}

		teamOneContainerRef.current!.measureInWindow((pageX, pageY, width, height) => {
			teamLayouts.one.x = pageX
			teamLayouts.one.y = pageY
			teamLayouts.one.width = width
			teamLayouts.one.height = height
		})
		teamTwoContainerRef.current!.measureInWindow((pageX, pageY, width, height) => {
			teamLayouts.two.x = pageX
			teamLayouts.two.y = pageY
			teamLayouts.two.width = width
			teamLayouts.two.height = height
		})

		const toTeam = Object.entries(teamLayouts).find(([teamKey, layout]) => {
			return (
				x >= layout.x &&
				x <= layout.x + layout.width &&
				y >= layout.y &&
				y <= layout.y + layout.height
			)
		})?.[0] as 'one' | 'two' | undefined

		if (!toTeam || toTeam === fromTeam) return // dropped back in place or invalid

		// move the player
		setTeams((prev) => {
			const clone = deepClone(prev)
			clone[fromTeam].playerIDs = clone[fromTeam].playerIDs.filter((pid) => pid !== id)
			clone[toTeam].playerIDs.push(id)
			return clone
		})
	}

	return (
		<View style={s.container}>
			<View style={s.team_container} ref={teamOneContainerRef}>
				<Text style={s.team_title}>Team 1</Text>
				<View style={s.team_players}>
					{teams.one.playerIDs.map((id) => {
						return (
							<PlayerTile
								key={id}
								id={id}
								name={players[id].name}
								teamKey='one'
								onDrop={handleDrop}
							/>
						)
					})}
				</View>
			</View>
			<View style={s.team_container} ref={teamTwoContainerRef}>
				<Text style={s.team_title}>Team 2</Text>
				<View style={s.team_players}>
					{teams.two.playerIDs.map((id) => {
						return (
							<PlayerTile
								key={id}
								id={id}
								name={players[id].name}
								teamKey='two'
								onDrop={handleDrop}
							/>
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
		padding: 0,
		gap: 12,
		width: '100%',
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
