type Players = { [id: string]: { name: string } }
type Team = { playerIDs: string[]; side: 'solids' | 'stripes' | null }
type Teams = { one: Team; two: Team }
