import { Dispatch, SetStateAction, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move } from 'chess.js';
import { type Square } from '@/types/chess';
import { MoveHistory } from '@/types';

interface ChessTableProps {
  fen: string;
  setMovesHistory: Dispatch<SetStateAction<MoveHistory[]>>;
  movesHistory: MoveHistory[];
  game: Chess;
  setGame: Dispatch<SetStateAction<Chess | undefined>>;
}

const pieces = [
  'wP',
  'wN',
  'wB',
  'wR',
  'wQ',
  'wK',
  'bP',
  'bN',
  'bB',
  'bR',
  'bQ',
  'bK',
];

const customPieces = () => {
  const pieceComponents = {} as any;
  pieces.forEach((piece) => {
    pieceComponents[piece] = ({ squareWidth }: any) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/pieces/${piece}.png)`,
          backgroundSize: '100%',
        }}
      />
    );
  });
  return pieceComponents;
};

const ChessTable = ({ setMovesHistory, game, setGame }: ChessTableProps) => {
  const [moveFrom, setMoveFrom] = useState('');
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const makeMove = (move: Move) => {
    const steps = game.move(move);
    setMovesHistory((prev) => [
      ...prev,
      { ...steps, ...move, description: '' },
    ]);
    setGame(new Chess(game.fen()));
  };

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: string) {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? 'q',
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {} as any;
    moves.map((move: any) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
    return true;
  }

  const onSquareClick = (square: Square) => {
    setRightClickedSquares({});

    // from square
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // to square
    if (!moveTo) {
      // check if valid move before showing dialog
      const moves = game.moves({
        moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m: any) => m.from === moveFrom && m.to === square,
      );
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);
        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : '');
        return;
      }

      // valid move
      setMoveTo(square);

      // if promotion move
      if (
        (foundMove.color === 'w' &&
          foundMove.piece === 'p' &&
          square[1] === '8') ||
        (foundMove.color === 'b' &&
          foundMove.piece === 'p' &&
          square[1] === '1')
      ) {
        setShowPromotionDialog(true);
        return;
      }

      // is normal move
      const gameCopy = JSON.parse(JSON.stringify(game));
      const move = makeMove({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      // setGame(gameCopy);

      // setTimeout(makeRandomMove, 300);
      setMoveFrom('');
      setMoveTo(null);
      setOptionSquares({});
    }
  };

  function onSquareRightClick(square: Square) {
    const colour = '#ED7E6A';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  function onPromotionPieceSelect(piece: any) {
    // if no piece passed then user has cancelled dialog, don't make move and reset
    if (piece) {
      const gameCopy = JSON.parse(JSON.stringify(game));

      makeMove({
        from: moveFrom,
        to: moveTo,
        promotion: piece[1].toLowerCase() ?? 'q',
      });

      // setGame(gameCopy);
      // setTimeout(makeRandomMove, 300);
    }

    setMoveFrom('');
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  return (
    <Chessboard
      id="ClickToMove"
      animationDuration={200}
      arePiecesDraggable={false}
      boardOrientation="black"
      areArrowsAllowed={true}
      onSquareClick={onSquareClick}
      onSquareRightClick={onSquareRightClick}
      customBoardStyle={{
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      }}
      customSquareStyles={{
        ...moveSquares,
        ...optionSquares,
        ...rightClickedSquares,
      }}
      promotionToSquare={moveTo}
      onPromotionPieceSelect={onPromotionPieceSelect}
      showPromotionDialog={showPromotionDialog}
      // onPieceDrop={onDrop}
      // customDropSquareStyle={{
      //   boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)',
      // }}

      customDarkSquareStyle={{ backgroundColor: '#779952' }}
      customLightSquareStyle={{ backgroundColor: '#edeed1' }}
      customPieces={customPieces}
      position={game.fen()}
    />
  );
};

export default ChessTable;
