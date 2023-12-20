import React from 'react'

import cls from './sidebar.module.scss'
import { NodeType } from '../../model/types'

type SidebarProps = {
    onExampleNodeClick: (type: NodeType) => void
    onConvertButtonClick: () => void
}

export const Sidebar: React.FC<SidebarProps> = (props): JSX.Element => {
    return (
        <div className={cls.Sidebar}>
            <ul>
                <li><div
                    className={`${cls["node-example"]} ${cls.circle} ${cls["root-node"]}`}
                    onClick={() => props.onExampleNodeClick(NodeType.ROOT_NODE)}
                ></div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.circle}`}
                    onClick={() => props.onExampleNodeClick(NodeType.PARALLEL)}
                >*</div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.circle}`}
                    onClick={() => props.onExampleNodeClick(NodeType.IMPLICATION)}
                >&rarr;</div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.rectangle}`}
                    onClick={() => props.onExampleNodeClick(NodeType.PARAMETER)}
                >[n]</div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.rectangle}`}
                    onClick={() => props.onExampleNodeClick(NodeType.CONSTANT)}
                >1</div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.rectangle}`}
                    onClick={() => props.onExampleNodeClick(NodeType.EXT_FUNCTION)}
                >extFunc</div></li>
                <li><div
                    className={`${cls["node-example"]} ${cls.circle} ${cls["end-node"]}`}
                    onClick={() => props.onExampleNodeClick(NodeType.END_NODE)}
                ></div></li>
            </ul>
            <button
                className={cls.convert}
                onClick={props.onConvertButtonClick}
            >Convert</button>
        </div>
    )
}
