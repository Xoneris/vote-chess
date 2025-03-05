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

        if (fieldInfo.canBeMoved === true) {

            if (fieldInfo.canBeMoved && fieldInfo.piece.color === currentPlayer) {

                const selectedPieceMovement = pieceMovement.filter((piece) => piece.name === fieldInfo.piece.type)
                const currentBoardState = [...chessState]
                let updatedChessState

                console.log("step 1")
                console.log(selectedPieceMovement)

                if (selectedPieceMovement[0]?.fullRange === true) {
                    // calculate movement for Rook, Bishop and Queen
                    

                    
                } else {
                    // calculate movement for Knight, King and Pawns
                    console.log("step 2")
                    updatedChessState = currentBoardState.map((field:any) => 
                        selectedPieceMovement[0]?.movement.some(selectedPiece => selectedPiece.x + fieldInfo.position.x === field.position.x && 
                        selectedPiece.y + fieldInfo.position.y === field.position.y)
                        ? field.hasPiece === true
                            ? field.piece.color !== currentPlayer
                                ? {...field, canMoveHere: true, canBeTaken: true}
                                : {...field, canMoveHere: false}
                            : {...field, canMoveHere: true}
                        : {...field, canMoveHere: false}
                    )
                        
                }
                
                console.log(updatedChessState)
                setSelectedField(fieldInfo.name)
                setChessState(updatedChessState)

            }

        } else {

            if (fieldInfo.canMoveHere === true || fieldInfo.canBeTaken === true) {
                
                const currentBoardState = [...chessState]

                if (fieldInfo.canMoveHere === true && fieldInfo.hasPiece === false) {

                    const updatedChessState = currentBoardState.map((field:any) => 
                        field.id === fieldInfo.id 
                        ? {...field, hasPiece: true, piece: {color: currentPlayer, type: "king"}, canMoveHere: false, canBeTaken: false } 
                        : {...field, canMoveHere: false, canBeTaken: false}
                    )

                    setChessState(updatedChessState)
                    setSelectedField("")
                    if (currentPlayer === "white") {
                        setCurrentPlayer("black")
                    } else if (currentPlayer === "black")
                        setCurrentPlayer("white")
                }


            } 
        }
    }


    return (
        <main className="w-screen h-screen bg-gray-600 flex flex-col justify-center items-center gap-4">

            <h1 className="text-2xl text-white">Current Turn: {currentPlayer}</h1>

            <div className="h-[514px] w-[514px] flex flex-wrap-reverse border">
                {
                    chessState.map((fieldInfo:any) => (

                        <div 
                            className={`
                                w-16 h-16 border border-black flex justify-center items-center transition-all
                                ${
                                    
                                    fieldInfo.canMoveHere === true
                                    ? "bg-green-600"
                                    : fieldInfo.canBeTaken === true 
                                        ? "bg-red-600"
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
                                    : null
                                
                            }
                        </div>
                    ))
                }
            </div>

        </main>
    )
}