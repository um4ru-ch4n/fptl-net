import React, { useCallback, useMemo, useState } from "react"
import ReactFlow, {
  Position,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow"
import { shallow } from 'zustand/shallow';

import cls from "./main.module.scss"
import {
  MyNode,
  CustomNode,
  HandlerInfo,
} from "../../components/node/node"
import { NodeType } from "../../model/types"
import { Sidebar } from "../Sidebar/sidebar"
import useStore, { RFState } from './store';
import { fptlAPI } from "./api";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  updateNodeLabel: state.updateNodeLabel,
  onConnect: state.onConnect,
  craftNodeTree: state.craftNodeTree,
});

let nodeId = 0;

const MainInternal: React.FC = (): JSX.Element => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    updateNodeLabel,
    onConnect,
    craftNodeTree,
  } = useStore(
    selector,
    shallow,
  );

  const reactFlowInstance = useReactFlow();
  const nodeTypes = useMemo(() => ({ MyCustomNode: MyNode }), []);

  const [result, setResult] = useState<string>("")
  const [resultErr, setResultErr] = useState<string>("")

  const onExampleNodeClick = useCallback((type: NodeType) => {
    let handlers: HandlerInfo[] = []

    switch (type) {
      case NodeType.CONSTANT:
      case NodeType.PARAMETER:
      case NodeType.EXT_FUNCTION:
      case NodeType.IMPLICATION:
      case NodeType.PARALLEL:
        handlers = [
          {
            id: "input_1",
            type: "target",
            position: Position.Left,
          },
          {
            id: "output_1",
            type: "source",
            position: Position.Right,
          },
        ]
        break;
      case NodeType.ROOT_NODE:
        handlers = [
          {
            id: "output_1",
            type: "source",
            position: Position.Right,
          },
        ]
        break;
      case NodeType.END_NODE:
        handlers = [
          {
            id: "input_1",
            type: "target",
            position: Position.Left,
          },
        ]
        break;
    }

    const newNode: CustomNode = {
      id: `${++nodeId}`,
      type: "MyCustomNode",
      data: {
        label: "",
        type: type,
        handlers: handlers,
        onInputChange: updateNodeLabel,
      },
      position: { x: 50, y: 50 },
    }
    reactFlowInstance.addNodes(newNode)
  }, [])

  const onConvertButtonClick = async () => {
    const tree = craftNodeTree()
    if (!tree) {
      return
    }

    const resp = await fptlAPI.solve(tree)
    if (resp.error) {
      setResult("");
      setResultErr(resp.error);

      return
    }

    if (resp.data) {
      setResultErr("");
      setResult(resp.data.code);
    }
  }

  return (
    <div className={cls.Main}>
      <Sidebar
        onExampleNodeClick={onExampleNodeClick}
        onConvertButtonClick={onConvertButtonClick}
      />
      <div className={cls.content}>
        <ReactFlow
          className={cls.diagram}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onFocus={(e) => { console.log(e) }}
          nodeTypes={nodeTypes}
        />
        <div className={cls.result}>
          <p className={cls.result_code}>{result}</p>
          <p className={cls.result_err}>{resultErr}</p>
        </div>
      </div>
    </div>
  )
}

export const Main: React.FC = (): JSX.Element => {
  return (
    <ReactFlowProvider>
      <MainInternal />
    </ReactFlowProvider>
  )
}