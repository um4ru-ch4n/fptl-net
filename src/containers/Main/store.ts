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
import { v4 as uuidv4 } from 'uuid';

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
            x: 303.2885303807502,
            y: 534.8149237634814
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 303.2885303807502,
            y: 534.8149237634814
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
            x: 1123.1555011832852,
            y: 336.8308463187602
        },
        width: 23,
        height: 23,
        selected: false,
        positionAbsolute: {
            x: 1123.1555011832852,
            y: 336.8308463187602
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
            x: 1030.9332920174918,
            y: 326.6327400206645
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 1030.9332920174918,
            y: 326.6327400206645
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
            x: 914.672628163589,
            y: 467.7293541100164
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 914.672628163589,
            y: 467.7293541100164
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
            x: 718.8945212298861,
            y: 413.9323385275041
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 718.8945212298861,
            y: 413.9323385275041
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
            x: 604.353229449918,
            y: 413.96616926375196
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 604.353229449918,
            y: 413.96616926375196
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
            x: 522.3944482373481,
            y: 294.4224563499475
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 522.3944482373481,
            y: 294.4224563499475
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
            x: 830.3343208011095,
            y: 467.6955233737683
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 830.3343208011095,
            y: 467.6955233737683
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
            x: 514.1502450324306,
            y: 413.966169263752
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 514.1502450324306,
            y: 413.966169263752
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
            x: 428.20171152573425,
            y: 294.17739743872573
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 428.20171152573425,
            y: 294.17739743872573
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
            x: 303.05273938505695,
            y: 420.0676614724959
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 303.05273938505695,
            y: 420.0676614724959
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
            x: 193.8140449326031,
            y: 440.2818526164258
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 193.8140449326031,
            y: 440.2818526164258
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
            x: 200.37055133578883,
            y: 299.35479487745147
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 200.37055133578883,
            y: 299.35479487745147
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
            x: 197.07158346202039,
            y: 167.24178207108008
        },
        width: 63,
        height: 43,
        selected: false,
        dragging: false,
        positionAbsolute: {
            x: 197.07158346202039,
            y: 167.24178207108008
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
            x: 85.88760776209153,
            y: 301.5203010364837
        },
        width: 43,
        height: 43,
        selected: false,
        positionAbsolute: {
            x: 85.88760776209153,
            y: 301.5203010364837
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
            x: -11.190802522047761,
            y: 301.484380894213
        },
        selected: false,
        width: 48,
        height: 44,
        positionAbsolute: {
            x: -11.190802522047761,
            y: 301.484380894213
        },
        dragging: false
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
            ]
        },
        position: {
            x: -11.190802522047761,
            y: 301.484380894213
        },
        width: 48,
        height: 44,
        selected: false,
        positionAbsolute: {
            x: -11.190802522047761,
            y: 301.484380894213
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
        id: "reactflow__edge-1output_1-2input_1",
        type: "smoothstep"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "4",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-4input_1",
        type: "smoothstep"
    },
    {
        source: "4",
        sourceHandle: "output_1",
        target: "10",
        targetHandle: "input_1",
        id: "reactflow__edge-4output_1-10input_1",
        type: "smoothstep"
    },
    {
        source: "4",
        sourceHandle: "output_1",
        target: "11",
        targetHandle: "input_1",
        id: "reactflow__edge-4output_1-11input_1",
        type: "smoothstep"
    },
    {
        source: "11",
        sourceHandle: "output_1",
        target: "7",
        targetHandle: "input_1",
        id: "reactflow__edge-11output_1-7input_1",
        type: "smoothstep"
    },
    {
        source: "10",
        sourceHandle: "output_1",
        target: "7",
        targetHandle: "input_1",
        id: "reactflow__edge-10output_1-7input_1",
        type: "smoothstep"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "3",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-3input_1",
        type: "smoothstep"
    },
    {
        source: "3",
        sourceHandle: "output_1",
        target: "18",
        targetHandle: "input_1",
        id: "reactflow__edge-3output_1-18input_1",
        type: "smoothstep"
    },
    {
        source: "18",
        sourceHandle: "output_1",
        target: "19",
        targetHandle: "input_1",
        id: "reactflow__edge-18output_1-19input_1",
        type: "smoothstep"
    },
    {
        source: "6",
        sourceHandle: "output_1",
        target: "13",
        targetHandle: "input_1",
        id: "reactflow__edge-6output_1-13input_1",
        type: "smoothstep"
    },
    {
        source: "6",
        sourceHandle: "output_1",
        target: "14",
        targetHandle: "input_1",
        id: "reactflow__edge-6output_1-14input_1",
        type: "smoothstep"
    },
    {
        source: "5",
        sourceHandle: "output_1",
        target: "6",
        targetHandle: "input_1",
        id: "reactflow__edge-5output_1-6input_1",
        type: "smoothstep"
    },
    {
        source: "5",
        sourceHandle: "output_1",
        target: "20",
        targetHandle: "input_1",
        id: "reactflow__edge-5output_1-20input_1",
        type: "smoothstep",
        selected: false
    },
    {
        source: "13",
        sourceHandle: "output_1",
        target: "8",
        targetHandle: "input_1",
        id: "reactflow__edge-13output_1-8input_1",
        type: "smoothstep"
    },
    {
        source: "14",
        sourceHandle: "output_1",
        target: "8",
        targetHandle: "input_1",
        id: "reactflow__edge-14output_1-8input_1",
        type: "smoothstep"
    },
    {
        source: "8",
        sourceHandle: "output_1",
        target: "15",
        targetHandle: "input_1",
        id: "reactflow__edge-8output_1-15input_1",
        type: "smoothstep"
    },
    {
        source: "15",
        sourceHandle: "output_1",
        target: "16",
        targetHandle: "input_1",
        id: "reactflow__edge-15output_1-16input_1",
        type: "smoothstep"
    },
    {
        source: "16",
        sourceHandle: "output_1",
        target: "9",
        targetHandle: "input_1",
        id: "reactflow__edge-16output_1-9input_1",
        type: "smoothstep"
    },
    {
        source: "20",
        sourceHandle: "output_1",
        target: "9",
        targetHandle: "input_1",
        id: "reactflow__edge-20output_1-9input_1",
        type: "smoothstep"
    },
    {
        source: "9",
        sourceHandle: "output_1",
        target: "17",
        targetHandle: "input_1",
        id: "reactflow__edge-9output_1-17input_1",
        type: "smoothstep"
    },
    {
        source: "17",
        sourceHandle: "output_1",
        target: "18",
        targetHandle: "input_1",
        id: "reactflow__edge-17output_1-18input_1",
        type: "smoothstep"
    },
    {
        source: "2",
        sourceHandle: "output_1",
        target: "5",
        targetHandle: "input_1",
        id: "reactflow__edge-2output_1-5input_1",
        type: "smoothstep"
    },
    {
        id: "f465f292-81e0-42cb-a6f8-13fcfa5e16d7",
        source: "7",
        target: "12",
        sourceHandle: "output_1",
        targetHandle: "input_1",
        type: "smoothstep"
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
        const newAdge: Edge = {
            id: uuidv4(),
            source: connection.source || "",
            target: connection.target || "",
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            type: 'smoothstep',
        }

        set({
            edges: addEdge(newAdge, get().edges),
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