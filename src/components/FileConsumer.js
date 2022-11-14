import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["TXT"];

export default function FileConsumer() {
  const [files, setFiles] = useState([]);
  const handleChange = (file) => {
    setFiles(files => [...files,file]);

    var reader = new FileReader();
    console.log(reader.readAsText(file));
  };

  return (
    <div className="Consumer">
      <h1>Drag & Drop Files for classification.</h1>
      <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes}/>
      <p>{files ? `File name: ${files.length}` : "no files uploaded yet"}</p>
    </div>
  );
}
