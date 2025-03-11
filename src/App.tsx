import { useState } from "react"
import InitialBoard from "./initialBoard.json"
import pieceMovement from "./pieceMovment.json"
import { FieldInfo } from "./types"

export default function App () {

    const [currentPlayer, setCurrentPlayer] = useState<string>("white")
    const [selectedField, setSelectedField] = useState<FieldInfo|undefined>()
    const [debugFieldInfo, setDebugFieldInfo] = useState<FieldInfo|undefined>()
    const [chessState, setChessState] = useState<any>(InitialBoard)


    const handleClick = (fieldInfo:FieldInfo) => {

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

        if (fieldInfo.canBeMoved === true && fieldInfo.piece.color === currentPlayer) {

            if (fieldInfo.canBeMoved && fieldInfo.piece.color === currentPlayer) {

                let selectedPieceMovement
                if (fieldInfo.piece.type === "pawn") {
                    selectedPieceMovement = pieceMovement.filter((piece) => piece.name === fieldInfo.piece.type && piece.color === fieldInfo.piece.color)
                } else {
                    selectedPieceMovement = pieceMovement.filter((piece) => piece.name === fieldInfo.piece.type)
                }
                const currentBoardState = [...chessState]
                let updatedChessState

                console.log("step 1")
                console.log(selectedPieceMovement)

                if (selectedPieceMovement[0]?.fullRange === true) {
                    // calculate movement for Rook, Bishop and Queen
                    
                    return

                    
                } else {
                    // calculate movement for Knight, King and Pawns
                    console.log("step 2")
                    updatedChessState = currentBoardState.map((field:FieldInfo) => 
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
                setSelectedField(fieldInfo)
                setChessState(updatedChessState)

            }

        } else {
            if (fieldInfo.canMoveHere === true || fieldInfo.canBeTaken === true) {
                
                const currentBoardState = [...chessState]
                let updatedChessState

                if (fieldInfo.canMoveHere === true) {

                    // Update the currently selected & newly clicked Field
                    updatedChessState = currentBoardState.map((targetField:FieldInfo) => 
                        targetField.id === fieldInfo.id 
                        ? {...targetField, hasPiece: true, piece: {color: currentPlayer, type: selectedField?.piece?.type}, canBeMoved: true, canMoveHere: false, canBeTaken: false } 
                        : targetField.id === selectedField?.id 
                            ? {...targetField, hasPiece: false, piece: {color: "", type: ""}, canBeMoved: false, canMoveHere: false, canBeTaken: false}
                            : {...targetField, canMoveHere: false, canBeTaken: false} 
                    )
                }

                setChessState(updatedChessState)
                setSelectedField(undefined)
                if (currentPlayer === "white") {
                    setCurrentPlayer("black")
                } else if (currentPlayer === "black")
                    setCurrentPlayer("white")

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
                                    fieldInfo.canBeTaken === true
                                    ? "bg-red-600"
                                    : fieldInfo.canMoveHere === true 
                                        ? "bg-green-600"
                                        : selectedField?.name === fieldInfo.name 
                                            ? "bg-orange-500" 
                                            : (fieldInfo.position.x + fieldInfo.position.y) % 2 === 0
                                                ? "bg-gray-800"
                                                : "bg-white"
                                }
                            `}
                            onClick={() => handleClick(fieldInfo)}
                            onMouseOver={() => setDebugFieldInfo(fieldInfo)}
                            key={fieldInfo.id}
                        >
                            {
                                fieldInfo.hasPiece === true && fieldInfo.piece.color === "white"
                                ? <img src={"/chess-figures/"+fieldInfo.piece.type+"-w.svg"} />
                                // ? fieldInfo.name
                                : fieldInfo.hasPiece === true && fieldInfo.piece.color === "black"
                                    ? <img src={"/chess-figures/"+fieldInfo.piece.type+"-b.svg"} />
                                    // ? fieldInfo.name
                                    : null
                                
                            }
                        </div>
                    ))
                }

                

            </div>

            <div className="flex gap-2">
                <div className="w-[500px] rounded-lg p-2 border flex flex-col gap-2">
                    <p>Hover Field</p>
                    <p>id: {debugFieldInfo?.id}</p>
                    <p>name: {debugFieldInfo?.name}</p>
                    <p>x: {debugFieldInfo?.position.x}</p>
                    <p>y: {debugFieldInfo?.position.y}</p>
                    <p>has piece: {debugFieldInfo?.hasPiece === true ? "true" : "false"}</p>
                    <p>color: {debugFieldInfo?.piece.color}</p>
                    <p>piece: {debugFieldInfo?.piece.type}</p>
                    <p>can be moved: {debugFieldInfo?.canBeMoved === true ? "true" : "false"}</p>
                    <p>can be Taken: {debugFieldInfo?.canBeTaken === true ? "true" : "false"}</p>
                    <p>can move here: {debugFieldInfo?.canMoveHere === true ? "true" : "false"}</p>
                </div>
                <div className="w-[500px] rounded-lg p-2 border flex flex-col gap-2">
                    <p>Currently Clicked Field</p>
                    <p>id: {selectedField?.id}</p>
                    <p>name: {selectedField?.name}</p>
                    <p>x: {selectedField?.position?.x}</p>
                    <p>y: {selectedField?.position?.y}</p>
                    <p>has piece: {selectedField?.hasPiece === true ? "true" : "false"}</p>
                    <p>color: {selectedField?.piece?.color}</p>
                    <p>piece: {selectedField?.piece?.type}</p>
                    <p>can be moved: {selectedField?.canBeMoved === true ? "true" : "false"}</p>
                    <p>can be Taken: {selectedField?.canBeTaken === true ? "true" : "false"}</p>
                    <p>can move here: {selectedField?.canMoveHere === true ? "true" : "false"}</p>
                </div>
            </div>

        </main>
    )
}