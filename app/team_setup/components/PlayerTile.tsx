import { StyleSheet, Text } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

type PlayerTileProps = {
	id: string
	name: string
	teamKey: 'one' | 'two'
	onDrop: (
		playerID: string,
		fromTeam: 'one' | 'two',
		absoluteX: number,
		absoluteY: number
	) => void
}

export default function PlayerTile({ id, name, teamKey, onDrop }: PlayerTileProps) {
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)
	const zIndex = useSharedValue(0)

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx: any) => {
			zIndex.value = 1
			ctx.startX = translateX.value
			ctx.startY = translateY.value
			ctx.
		},
		onActive: (event, ctx: any) => {
			translateX.value = ctx.startX + event.translationX
			translateY.value = ctx.startY + event.translationY
		},
		onEnd: (event, ctx) => {
			runOnJS(onDrop)(id, teamKey, event.absoluteX, event.absoluteY)
			zIndex.value = 0
			translateX.value = withSpring(0)
			translateY.value = withSpring(0)
		},
	})

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
		zIndex: zIndex.value,
		elevation: zIndex.value,
	}))

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View style={[styles.player, animatedStyle]}>
				<Text style={styles.text}>{name}</Text>
			</Animated.View>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	player: {
		padding: 8,
		backgroundColor: '#e1f5fe',
		borderRadius: 8,
		alignSelf: 'stretch',
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
	},
})
