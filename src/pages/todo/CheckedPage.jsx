import { useTaskContext } from "../../context/TaskContext";

function CheckedPage() {
  const { checked } = useTaskContext();

  console.log("Checked", checked);

  return <div></div>;
}

export default CheckedPage;
