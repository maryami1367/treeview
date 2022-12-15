import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TreeItem from "@mui/lab/TreeItem";
import RenderTree from "../../models/RenderTree";
import AddCircleIcon from "@mui/icons-material/AddCircle";


const data: RenderTree = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

export default function RichObjectTreeView(props: {
  dataa: RenderTree[];
  deleteItem(id: string): void;
  editTreeVIew(id: string): void;
  value: string;
  setDataa: Dispatch<SetStateAction<RenderTree[]>>;
}) {
  const [selected, setSelected] = useState("");
  const [addNode, setAddNode] = useState<string>("");


  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      <div>
        <button onClick={() => props.deleteItem(nodes.id)}>
          <DeleteIcon />
        </button>
        <button onClick={() => props.editTreeVIew(nodes.id)}>
          <ModeEditOutlineIcon />
        </button>
      </div>
      {nodes.children && nodes.children.map((node) => renderTree(node))}
    </TreeItem>
  );



  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds?.length > 0 ? nodeIds[0] : "");
  };

  // const addHandler = (dataa: RenderTree[],setDataa:Dispatch<SetStateAction<RenderTree[]>>): void => {
  //   if (selected) {
  //     console.log("mary");
  //     setDataa([ ...dataa.append({name:addNode})])
      
  //   }
  //   console.log('dataa', dataa)
  // };

  const addHandler = (nodeId: string,dataa: RenderTree[],setDataa:Dispatch<SetStateAction<RenderTree[]>>) => {
    let d = dataa;
    const res = addItem(d, nodeId);
    setDataa([...res.nodes]);
  };

  function addItem(nodes: RenderTree[], id: string) {
    let add = false;
    for (let index = 0; index < nodes.length; index++) {
      if (nodes[index].id == id) {
      // nodes.append({id:id,name:addNode})
        add = true;
        break;
      }

      if (nodes[index].children) {
        const res = addItem(nodes[index].children ?? [], id);
        if (res.add) {
          nodes[index].children = res.nodes;
          add = true;
          break;
        }
      }
    }
    return { nodes, add };
  }

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        selected={[selected]}
        onNodeSelect={handleSelect}
      >
        {props.dataa.map((item, index) => {
          return renderTree(item);
        })}
      </TreeView>
      <div>
        <input
          value={addNode}
          onChange={(e) => setAddNode(e.target.value)}
          type="text"
        />
        <button>
          <AddCircleIcon />
        </button>
      </div>
    </>
  );
}
