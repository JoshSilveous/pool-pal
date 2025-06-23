import { useState } from 'react'

export default function useGameLogic() {
	const [players, setPlayers] = useState<Players>({})
	const [teams, setTeams] = useState<Teams>({
		one: { playerIDs: [], side: null },
		two: { playerIDs: [], side: null },
	})
	const [curPlayerID, setCurPlayerID] = useState<string>('')
	const [prevPlayerID, setPrevPlayerID] = useState<string>('')
	const [nextPlayerID, setNextPlayerID] = useState<string>('')
    const [curTeam, setCurTeam] = useState<GameState['curTeam']>('one')

	const gotoNextPlayer = () => {
        if (cur)
    }
}

interface GameState {
	players: Players
	setPlayers: React.Dispatch<React.SetStateAction<Players>>
	teams: Teams
	curTeam: 'one' | 'two'
	setTeams: React.Dispatch<React.SetStateAction<Teams>>
	active: {
		curPlayerID: string | null
		prevPlayerID: string | null
		nextPlayerID: string | null
		gotoNextPlayer: () => void
		gotoPrevPlayer: () => void
		teamOneSide: null | 'stripe' | 'solid'
		teamTwoSide: null | 'stripe' | 'solid'
	}
}
