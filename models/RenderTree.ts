export default interface RenderTree {
    id: string;
    name: string;
    children?:RenderTree[];
  }