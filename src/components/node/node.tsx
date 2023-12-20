import React, { useMemo, useLayoutEffect, useRef } from 'react'
import {
    Handle,
    Position,
    HandleType,
    NodeProps,
    Node,
    useNodeId,
} from 'reactflow'

import cls from './node.module.scss'
import { NodeType } from '../../model/types'

export type HandlerInfo = {
    type: HandleType,
    position: Position,
    id: string,
    left?: number,
    top?: number,
}

export type NodeData = {
    type: NodeType
    label: string
    handlers: HandlerInfo[]
    onInputChange?: (nodeID: string, newValue: string) => void
};

export type CustomNode = Node<NodeData>;

const getNodeLabel = (type: NodeType, label: string): string => {
    switch (type) {
        case NodeType.PARALLEL:
            return "*"
        case NodeType.IMPLICATION:
            return "->"
        case NodeType.END_NODE:
            return ""
        default:
            return label
    }
}

const getNodeClass = (type: NodeType): string => {
    switch (type) {
        case NodeType.CONSTANT:
        case NodeType.PARAMETER:
        case NodeType.EXT_FUNCTION:
            return "node-rectangle"
        case NodeType.PARALLEL:
        case NodeType.IMPLICATION:
            return "node-circle"
        case NodeType.ROOT_NODE:
            return "node-root"
        case NodeType.END_NODE:
            return "node-end"
        default:
            return ""
    }
}

export const MyNode: React.FC<NodeProps<NodeData>> = ({ data: props }): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLInputElement>(null);

    const nodeLabel: string = useMemo(() => {
        return getNodeLabel(props.type, props.label)
    }, [props.type, props.label])

    const nodeID = useNodeId();

    useLayoutEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${props.label.length * 8}px`;

            if (!divRef || !divRef.current) {
                return
            }

            if (props.type === NodeType.ROOT_NODE) {
                divRef.current.style.height = `${props.label.length * 8}px`;
            }
        }
    }, [props.label.length]);

    return (
        <>
            {
                props.handlers.map((v, index) => {
                    const style = {
                        left: v.left,
                        top: v.top,
                    };

                    return <Handle
                        key={`handle_${index}`}
                        type={v.type}
                        position={v.position}
                        id={v.id}
                        style={style}
                    />
                })
            }
            <div ref={divRef} className={cls.Node + " " + cls[getNodeClass(props.type)]}>
                {props.type === NodeType.PARALLEL || props.type === NodeType.IMPLICATION ?
                    <label
                        className={cls.node_label}
                    >{nodeLabel}</label>
                    :
                    <></>
                }
                {
                    props.type === NodeType.CONSTANT ||
                        props.type === NodeType.ROOT_NODE ||
                        props.type === NodeType.EXT_FUNCTION ?
                        <input
                            className={cls.node_input}
                            ref={inputRef}
                            value={nodeLabel}
                            onChange={(e) => props.onInputChange ?
                                props.onInputChange(nodeID || "", e.target.value)
                                : null}
                        />
                        : props.type === NodeType.PARAMETER ?
                            <>
                                <span>[</span>
                                <input
                                    className={cls.node_input}
                                    ref={inputRef}
                                    value={nodeLabel}
                                    onChange={(e) => props.onInputChange ?
                                        props.onInputChange(nodeID || "", e.target.value)
                                        : null}
                                />
                                <span>]</span>
                            </>
                            :
                            <></>
                }

            </div>
        </>
    )
}
