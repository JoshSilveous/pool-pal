import { GameController } from '@/hooks/useGameLogic'
import React from 'react'
import {
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AddPlayerInput from './components/AddPlayerInput'
import RandomizeTeamsButton from './components/RandomizeTeamsButton'
import TeamsViewer from './components/TeamsViewer'

interface Props {
	setCurPage: React.Dispatch<React.SetStateAction<string>>
	gameCtrl: GameController
}
export default function TeamsSetup({ setCurPage, gameCtrl }: Props) {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			{/* TouchableWithoutFeedback allows keyboard closure by tapping anywhere */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				{/* GestureHandlerRootView allows drag/drop for player tiles */}
				<View style={styles.container}>
					<Text style={styles.title}>Team Setup</Text>
					<TeamsViewer gameCtrl={gameCtrl} />
					<AddPlayerInput gameCtrl={gameCtrl} />
					<RandomizeTeamsButton gameCtrl={gameCtrl} />
					<Button title='Start Game' onPress={() => setCurPage('active_game')} />
				</View>
			</GestureHandlerRootView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f9ff',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		padding: 8,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 24,
	},
	addPlayerInput: {
		marginTop: 'auto',
	},
})
