import MemodCell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import React from 'react';
import { TETROMINOS } from "../../setup";

export type STAGECELL = [keyof typeof TETROMINOS, string]
type STAGE = STAGECELL[][];

type Props = {
    stage: STAGE;
}

const Stage: React.FC<Props> = ({ stage }) => {
    return (
        <StyledStage>
            {stage.map(row => row.map((cell, x) => <MemodCell key={x} type={cell[0]} />))}
        </StyledStage>
    )
}

export default Stage;