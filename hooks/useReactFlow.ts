import { useCallback, useEffect } from "react";
import {
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useAppDispatch, useAppSelector } from "./redux";
import { RootState } from "@/store/store";
import {
  updateNodePosition,
  addConnection,
  removeNode,
  removeConnection,
} from "@/store/workflowSlice";

export const useReactFlow = () => {
  const dispatch = useAppDispatch();
  const workflow = useAppSelector((state: RootState) => state.workflow);
  const storeNodes = (workflow as any).nodes ?? [];
  const storeConnections = (workflow as any).connections ?? [];

  const initialNodes: Node[] = storeNodes.map((node: any) => ({
    id: node.id,
    type: "customNode",
    position: node.position,
    data: {
      name: node.name,
      description: node.description,
      iconName: node.iconName,
      iconColor: node.iconColor,
      onDelete: () => dispatch(removeNode(node.id)),
    },
  }));

  const initialEdges: Edge[] = storeConnections.map((conn: any) => ({
    id: conn.id,
    source: conn.from,
    target: conn.to,
    type: "smoothstep",
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [storeNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [storeConnections]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target) {
        dispatch(
          addConnection({
            from: params.source,
            to: params.target,
          })
        );
      }
    },
    [dispatch]
  );

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      dispatch(
        updateNodePosition({
          id: node.id,
          position: node.position,
        })
      );
    },
    [dispatch]
  );

  const onEdgeDelete = useCallback(
    (edge: Edge) => {
      dispatch(removeConnection(edge.id));
    },
    [dispatch]
  );

  const onEdgesDelete = useCallback(
    (edges: Edge[]) => {
      edges.forEach((edge) => dispatch(removeConnection(edge.id)));
    },
    [dispatch]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onEdgeDelete,
    onEdgesDelete,
  };
};
