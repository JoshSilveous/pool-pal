import { GameController } from '@/hooks/useGameLogic'
import { View } from 'react-native'

interface Props {
	setCurPage: React.Dispatch<React.SetStateAction<string>>
	gameCtrl: GameController
}
export default function ActiveGamePage({ setCurPage, gameCtrl }: Props) {
	return <View />
}
