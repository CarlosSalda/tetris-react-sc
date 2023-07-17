import React from 'react';
import { StyledCell } from './Cell.styles';
import { TETROMINOS } from '../../setup';

type Props = {
    type: keyof typeof TETROMINOS;
}

const Cell: React.FC<Props> = ({ type }) => {
    return(<StyledCell type={type} color={TETROMINOS[type].color} />)
}


const MemodCell = React.memo(Cell);
export default MemodCell;

