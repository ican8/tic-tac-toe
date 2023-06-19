import { Position } from "../App";

const Board: React.FC<{
  position: Position;
  onClick: (index: number) => void;
}> = ({ position, onClick }) => {
  return (
    <div className="grid grid-cols-3 max-w-[150px] my-8 mx-auto">
      {position.map((symbol, index) => (
        <div
          onClick={() => onClick(index)}
          className=" border border-gray-950 h-12 w-12"
          key={index}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default Board;
