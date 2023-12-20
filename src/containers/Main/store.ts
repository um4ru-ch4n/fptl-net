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

const useStore = createWithEqualityFn<RFState>((set, get) => ({
    nodes: [],
    edges: [],
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