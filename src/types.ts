export interface FieldInfo {
    id: string,
    name: string,
    position: {
        x: number,
        y: number
    },
    hasPiece: boolean,
    piece: {
        color: string,
        type: string
    },
    canBeMoved: boolean,
    canBeTaken: boolean,
    canMoveHere: boolean
}