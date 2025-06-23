import { View } from 'react-native'

interface Props {
	players: Players
	setPlayers: React.Dispatch<React.SetStateAction<Players>>
	teams: Teams
	setTeams: React.Dispatch<React.SetStateAction<Teams>>
}
export default function ActiveGamePage({ players, setPlayers, teams, setTeams }: Props) {
	return <View />
}
