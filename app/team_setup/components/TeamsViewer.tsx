import { GameController } from '@/hooks/useGameLogic'
import { deepClone } from '@/util/deepClone'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import PlayerTile from './PlayerTile'

export type TeamViewerProps = {
	gameCtrl: GameController
}
export default function TeamsViewer({ gameCtrl }: TeamViewerProps) {
	const teamOneContainerRef = useRef<View>(null)
	const teamTwoContainerRef = useRef<View>(null)

	const teamOneZIndex = useSharedValue<undefined | number>(undefined)
	const teamTwoZIndex = useSharedValue<undefined | number>(undefined)

	const teamOneStyle = useAnimatedStyle(() => ({
		zIndex: teamOneZIndex.value,
	}))
	const teamTwoStyle = useAnimatedStyle(() => ({
		zIndex: teamTwoZIndex.value,
	}))

	const handleGrab = (fromTeam: 'one' | 'two') => {
		// swap z-indexes to prevent visual overlap issues
		console.log('running handleGrab', fromTeam)
		if (fromTeam === 'one') {
			teamOneZIndex.value = 10
		} else {
			teamTwoZIndex.value = 10
		}
	}
	const handleDrop = (id: string, fromTeam: 'one' | 'two', x: number, y: number) => {
		teamOneZIndex.value = 0
		teamTwoZIndex.value = 0

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
		gameCtrl.setTeams((prev) => {
			const clone = deepClone(prev)
			clone[fromTeam].playerIDs = clone[fromTeam].playerIDs.filter((pid) => pid !== id)
			clone[toTeam].playerIDs.push(id)
			return clone
		})
	}

	return (
		<View style={s.container}>
			<Animated.View
				style={[s.team_container, teamOneStyle]}
				ref={teamOneContainerRef}
			>
				<Text style={s.team_title}>Team 1</Text>
				<View style={s.team_players}>
					{gameCtrl.teams.one.playerIDs.map((id) => {
						return (
							<PlayerTile
								key={id}
								id={id}
								name={gameCtrl.players[id].name}
								teamKey='one'
								onDrop={handleDrop}
								onGrab={handleGrab}
							/>
						)
					})}
				</View>
			</Animated.View>
			<Animated.View
				style={[s.team_container, teamTwoStyle]}
				ref={teamTwoContainerRef}
			>
				<Text style={s.team_title}>Team 2</Text>
				<View style={s.team_players}>
					{gameCtrl.teams.two.playerIDs.map((id) => {
						return (
							<PlayerTile
								key={id}
								id={id}
								name={gameCtrl.players[id].name}
								teamKey='two'
								onDrop={handleDrop}
								onGrab={handleGrab}
							/>
						)
					})}
				</View>
			</Animated.View>
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
