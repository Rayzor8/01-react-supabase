import { useParams } from "react-router-dom";

export default function FormEditor() {
  const { slug } = useParams();

  return <div>Form {slug}</div>;
}
