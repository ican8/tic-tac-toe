import clsx from "clsx";
import { Position } from "../App";

const Board: React.FC<{
  position: Position;
  onClick: (index: number) => void;
}> = ({ position, onClick }) => {
  return (
    <div className="grid grid-cols-3 max-w-[40vw] my-8 mx-auto">
      {position.map((symbol, index) => (
        <div
          onClick={() => onClick(index)}
          className=" border border-gray-950 min-w-[11vw] min-h-[11vw] font-bold "
          key={index}
        >
          <p
            className={clsx(
              "text-3xl sm:text-6xl md:text-9xl my-12",
              symbol === "X" && "text-red-700",
              symbol === "O" && "text-green-700"
            )}
          >
            {symbol}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Board;
