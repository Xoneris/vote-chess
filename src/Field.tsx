

export default function Field ({fieldName,hasPiece,piece,canBeTaken}:any) {


    return (
        <div 
            className={`
                w-16 h-16 border border-white flex justify-center items-center text-white
                ${canBeTaken === true ? "bg-red600" : null}
            `}

            // onClick={clickHandler(fieldName)}

        >
            {
                hasPiece === true 
                ? piece.color === "white"
                    ? <img src={"/chess-figures/"+piece.type+"-w.svg"} />
                    : <img src={"/chess-figures/"+piece.type+"-b.svg"} />
                : fieldName
                
            }
        </div>
    )
}