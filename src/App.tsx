import { useState } from "react"
import InitialBoard from "./initialBoard.json"
import pieceMovement from "./pieceMovment.json"

export default function App () {

    const [currentPlayer, setCurrentPlayer] = useState<string>("white")
    const [selectedField, setSelectedField] = useState<string>("")
    // const [selectedPiece, setSelectedPiece] = useState<string>("")
    const [chessState, setChessState] = useState<any>(InitialBoard)


    const handleClick = (fieldInfo:any) => {

        // Check if a piece is selected 
            // --- YES ---
            // Check if piece can move to this field
                // --- YES ---
                // Move the piece there and do necessary updates like:
                // Remove captured piece (if applicable)
                // Remove possible moves
                // Update player state
                // --- NO ---
                // Nothing
            // --- NO ---
            // Check if clicked piece can be selected for moving
                // --- YES ---
                // Select the current piece
                // Show all possible moves
                // Show all possible captures

        if (selectedField !== "") {

            if (fieldInfo.canMoveHere === true || fieldInfo.canBeTaken === true) {
                
                

            } else if (fieldInfo.canBeMoved && fieldInfo.piece.color === currentPlayer) {
                

                setSelectedField(fieldInfo.name)

            }

        } else {

            if (fieldInfo.canBeMoved && fieldInfo.piece.color === currentPlayer) {

                const selectedPieceMovement = pieceMovement.filter((piece) => piece.name === fieldInfo.piece.type)


                let currentBoardState = [...chessState]
                let updatedChessState

                console.log("step 1")

                if (selectedPieceMovement[0]?.fullRange === true) {
                    // calculate movement for Rook, Bishop and Queen
                    updatedChessState = currentBoardState
                } else {
                    // calculate movement for Knight, King and Pawns
                    console.log("step 2")
                    for (let i=0 ; i < selectedPieceMovement[0]?.movement.length ; i++ ) {

                        updatedChessState = currentBoardState.map((field:any) => {
                            if (fieldInfo.position.x + selectedPieceMovement[0]?.movement[i].x === field.position.x && 
                                fieldInfo.position.y + selectedPieceMovement[0]?.movement[i].y === field.position.y) {
                                    
                                    console.log("yep! - " + field.id)
                                    return { ...field, canMoveHere: true}
                                }
                                return field
                                
                            })
                            
                        }
                }
                
                console.log(updatedChessState)
                setSelectedField(fieldInfo.name)
                setChessState(updatedChessState)

            }
        }
    }


    return (
        <main className="w-screen h-screen bg-gray-600 flex justify-center items-center">

            <div className="h-[514px] w-[514px] flex flex-wrap-reverse border">
                {
                    chessState.map((fieldInfo:any) => (

                        <div 
                            className={`
                                w-16 h-16 border border-black flex justify-center items-center text-red-600
                                ${
                                    fieldInfo.canMoveHere === true
                                    ? "bg-green-600"
                                    : selectedField === fieldInfo.name 
                                        ? "bg-orange-500" 
                                        : (fieldInfo.position.x + fieldInfo.position.y) % 2 === 0
                                            ? "bg-gray-800"
                                            : "bg-white"
                                }
                            `}
                            onClick={() => handleClick(fieldInfo)}
                            key={fieldInfo.id}
                        >
                            {
                                fieldInfo.hasPiece === true && fieldInfo.piece.color === "white"
                                ? <img src={"/chess-figures/"+fieldInfo.piece.type+"-w.svg"} />
                                : fieldInfo.hasPiece === true && fieldInfo.piece.color === "black"
                                    ? <img src={"/chess-figures/"+fieldInfo.piece.type+"-b.svg"} />
                                    : fieldInfo.id
                                
                            }
                        </div>
                    ))
                }
            </div>

        </main>
    )
}