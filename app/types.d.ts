type Player = { name: string; id: string }
type Team = { playerIDs: string[]; side: 'solids' | 'stripes' | null }
type Teams = { one: Team; two: Team }
