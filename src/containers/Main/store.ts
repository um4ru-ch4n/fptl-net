import {
    Edge,
    EdgeChange,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    Connection,
    addEdge,
    OnConnect,
    Position,
} from 'reactflow';
import { createWithEqualityFn } from 'zustand/traditional';
import { CustomNode } from '../../components/node/node';
import { NodeType } from '../../model/types';

export type RFState = {
    nodes: CustomNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    updateNodeLabel: (nodeID: string, newLabel: string) => void;
    craftNodeTree: () => NodeReq | null;
};

type NodeReqNode = {
    type: NodeType,
    text: string,
    children: NodeReqNode[]
}

export type NodeReq = {
    node: NodeReqNode,
}

const initialNodes: CustomNode[] = [
    {
        id: "20",
        type: "MyCustomNode",
        data: {
            label: "1",
            type: 4,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 398.4009581155626,
            y: 552.3900462796967
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 398.4009581155626,
            y: 552.3900462796967
        }
    },
    {
        id: "19",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 7,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                }
            ]
        },
        position: {
            x: 1000.5999999999998,
            y: 342
        },
        width: 23,
        height: 23,
        selected: false,
        positionAbsolute: {
            x: 1000.5999999999998,
            y: 342
        },
        dragging: false
    },
    {
        id: "18",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 2,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 925.5999999999999,
            y: 332
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 925.5999999999999,
            y: 332
        },
        dragging: false
    },
    {
        id: "17",
        type: "MyCustomNode",
        data: {
            label: "mul",
            type: 5,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 833,
            y: 476
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 833,
            y: 476
        }
    },
    {
        id: "16",
        type: "MyCustomNode",
        data: {
            label: "Fact",
            type: 5,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 661,
            y: 416
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 661,
            y: 416
        }
    },
    {
        id: "15",
        type: "MyCustomNode",
        data: {
            label: "sub",
            type: 5,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 563,
            y: 415
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 563,
            y: 415
        }
    },
    {
        id: "14",
        type: "MyCustomNode",
        data: {
            label: "1",
            type: 3,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 400,
            y: 447
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 400,
            y: 447
        }
    },
    {
        id: "13",
        type: "MyCustomNode",
        data: {
            label: "1",
            type: 4,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 400,
            y: 386
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 400,
            y: 386
        }
    },
    {
        id: "12",
        type: "MyCustomNode",
        data: {
            label: "equal",
            type: 5,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 516,
            y: 296
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 516,
            y: 296
        }
    },
    {
        id: "11",
        type: "MyCustomNode",
        data: {
            label: "0",
            type: 3,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 312,
            y: 341
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 312,
            y: 341
        }
    },
    {
        id: "10",
        type: "MyCustomNode",
        data: {
            label: "1",
            type: 4,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 313,
            y: 259
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 313,
            y: 259
        }
    },
    {
        id: "9",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 759,
            y: 477
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 759,
            y: 477
        },
        dragging: false
    },
    {
        id: "8",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 491.4059688349755,
            y: 415
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 491.4059688349755,
            y: 415
        },
        dragging: false
    },
    {
        id: "7",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 420,
            y: 296
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 420,
            y: 296
        },
        dragging: false
    },
    {
        id: "6",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 327.8646770550081,
            y: 422.13532294499186
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 327.8646770550081,
            y: 422.13532294499186
        },
        dragging: false
    },
    {
        id: "5",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 233,
            y: 474
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 233,
            y: 474
        },
        dragging: false
    },
    {
        id: "4",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 1,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 235,
            y: 303
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 235,
            y: 303
        },
        dragging: false
    },
    {
        id: "3",
        type: "MyCustomNode",
        data: {
            label: "1",
            type: 3,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 280,
            y: 180
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 280,
            y: 180
        }
    },
    {
        id: "2",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 2,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 138,
            y: 305
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 138,
            y: 305
        },
        dragging: false
    },
    {
        id: "1",
        type: "MyCustomNode",
        data: {
            label: "",
            type: 2,
            handlers: [
                {
                    id: "input_1",
                    type: "target",
                    position: Position.Left
                },
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ]
        },
        position: {
            x: 50,
            y: 50
        },
        selected: false
    },
    {
        id: "1",
        type: "MyCustomNode",
        data: {
            label: "Fact",
            type: 6,
            handlers: [
                {
                    id: "output_1",
                    type: "source",
                    position: Position.Right
                }
            ],
        },
        position: {
            x: 48,
            y: 305
        },
        width: 48,
        height: 44,
        selected: false,
        positionAbsolute: {
            x: 48,
            y: 305
        },
        dragging: false
    }
]

const initialEdges: Edge[] = [
    {
        source: "1",
        sourceHandle: "output_1",
        target: "2",
        targetHandle: "input_1",
        id: "reactflow__edge-1output_1-2input_1"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "4",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-4input_1"
    },
    {
        source: "4",
        sourceHandle: "output_1",
        target: "10",
        targetHandle: "input_1",
        id: "reactflow__edge-4output_1-10input_1"
    },
    {
        source: "4",
        sourceHandle: "output_1",
        target: "11",
        targetHandle: "input_1",
        id: "reactflow__edge-4output_1-11input_1"
    },
    {
        source: "11",
        sourceHandle: "output_1",
        target: "7",
        targetHandle: "input_1",
        id: "reactflow__edge-11output_1-7input_1"
    },
    {
        source: "10",
        sourceHandle: "output_1",
        target: "7",
        targetHandle: "input_1",
        id: "reactflow__edge-10output_1-7input_1"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "3",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-3input_1"
    },
    {
        source: "3",
        sourceHandle: "output_1",
        target: "18",
        targetHandle: "input_1",
        id: "reactflow__edge-3output_1-18input_1"
    },
    {
        source: "18",
        sourceHandle: "output_1",
        target: "19",
        targetHandle: "input_1",
        id: "reactflow__edge-18output_1-19input_1"
    },
    {
        source: "7",
        sourceHandle: "output_1",
        target: "12",
        targetHandle: "input_1",
        id: "reactflow__edge-7output_1-12input_1"
    },
    {
        source: "6",
        sourceHandle: "output_1",
        target: "13",
        targetHandle: "input_1",
        id: "reactflow__edge-6output_1-13input_1"
    },
    {
        source: "6",
        sourceHandle: "output_1",
        target: "14",
        targetHandle: "input_1",
        id: "reactflow__edge-6output_1-14input_1"
    },
    {
        source: "5",
        sourceHandle: "output_1",
        target: "6",
        targetHandle: "input_1",
        id: "reactflow__edge-5output_1-6input_1"
    },
    {
        source: "5",
        sourceHandle: "output_1",
        target: "20",
        targetHandle: "input_1",
        id: "reactflow__edge-5output_1-20input_1"
    },
    {
        source: "13",
        sourceHandle: "output_1",
        target: "8",
        targetHandle: "input_1",
        id: "reactflow__edge-13output_1-8input_1"
    },
    {
        source: "14",
        sourceHandle: "output_1",
        target: "8",
        targetHandle: "input_1",
        id: "reactflow__edge-14output_1-8input_1"
    },
    {
        source: "8",
        sourceHandle: "output_1",
        target: "15",
        targetHandle: "input_1",
        id: "reactflow__edge-8output_1-15input_1"
    },
    {
        source: "15",
        sourceHandle: "output_1",
        target: "16",
        targetHandle: "input_1",
        id: "reactflow__edge-15output_1-16input_1"
    },
    {
        source: "16",
        sourceHandle: "output_1",
        target: "9",
        targetHandle: "input_1",
        id: "reactflow__edge-16output_1-9input_1"
    },
    {
        source: "20",
        sourceHandle: "output_1",
        target: "9",
        targetHandle: "input_1",
        id: "reactflow__edge-20output_1-9input_1"
    },
    {
        source: "9",
        sourceHandle: "output_1",
        target: "17",
        targetHandle: "input_1",
        id: "reactflow__edge-9output_1-17input_1"
    },
    {
        source: "17",
        sourceHandle: "output_1",
        target: "18",
        targetHandle: "input_1",
        id: "reactflow__edge-17output_1-18input_1"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "5",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-5input_1"
    }
]

const useStore = createWithEqualityFn<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    updateNodeLabel: (nodeID: string, newLabel: string) => {
        set({
            nodes: get().nodes.map(node => {
                if (node.id === nodeID) {
                    node.data = { ...node.data, label: newLabel }
                }

                return node
            }),
        });
    },
    craftNodeTree: () => {
        return buildTree(get().nodes, get().edges)
    }
}));

export default useStore;

const buildTree = (nodes: CustomNode[], edges: Edge[]): NodeReq | null => {
    const rootNode = nodes.find(node => node.data.type === NodeType.ROOT_NODE)
    if (!rootNode) {
        return null
    }

    const getNodeById = (id: string) => nodes.find((node) => node.id === id);

    const rootNodeReq: NodeReqNode = {
        type: rootNode.data.type,
        text: rootNode.data.label,
        children: [],
    };

    const addChildNodes = (parentNodeReq: NodeReqNode, prarentNode: CustomNode) => {
        const childEdges = edges.filter((edge) => edge.source === prarentNode.id);

        childEdges.forEach((edge) => {
            const childNode = getNodeById(edge.target);
            if (childNode) {
                const childNodeReq = {
                    type: childNode.data.type,
                    text: childNode.data.label,
                    children: [],
                };

                parentNodeReq.children.push(childNodeReq);
                addChildNodes(childNodeReq, childNode);
            }
        });
    };

    addChildNodes(rootNodeReq, rootNode);

    return {
        node: rootNodeReq
    };
}