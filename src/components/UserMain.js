import { useEffect, useState } from "react";
import axios from "axios";
import { EachFile } from "./EachFile";

export const GetUserData = () => {
  const [pathLoc, setPathLoc] = useState(["root"]);
  const [currentFolder, setCurrentFolder] = useState("");
  const [files, setFiles] = useState([]);
  const fetchFiles = async (id) => {
    // console.log(pathLoc.at(-1))
    const { data } = await axios
      .get(`${process.env.REACT_APP_API}/fetch-files/${id}`)
      .catch((err) => console.log("err occured"));
    setFiles(data);
  };
  useEffect(() => {
    fetchFiles(pathLoc.at(-1));
    console.log(pathLoc);
    // eslint-disable-next-line
  }, []);
  const switchUser = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API}/switch-user-drive`)
      .catch((err) => console.log("err occured"));
    console.log(res);
    fetchFiles(pathLoc.at(-1));
  };
  const DeleteFile = async (id) => {
    console.log(id);
    const payload = {
      fileID: id,
    };

    await axios.post(`${process.env.REACT_APP_API}/delete-file`, payload);

    fetchFiles(pathLoc.at(-1));
  };
  const DownloadFolder = async (id) => {
    console.log(id);
    const res =   await axios.get(`${process.env.REACT_APP_API}/download-folder${id}`).catch((err)=>console.log(err))
    console.log(res);
    fetchFiles(pathLoc.at(-1));
  };

  return (
    <>
    <button className="LinktoButton" onClick={switchUser}>switchUser</button>
      <form
        action={`${process.env.REACT_APP_API}/upload/`}
        method="POST"
        encType="multipart/form-data"
        target="_blank"
        onSubmit={() => {
          setTimeout(() => fetchFiles(pathLoc.at(-1)), 2000);
        }}
      >
        <input className="LinktoButton" id="file" type="file" name="file" />
        <input
          
          id="file"
          type="text"
          value={currentFolder}
          name="path"
          hidden
          readOnly
        />
        <input className="LinktoButton" type="submit" placeholder="upload" />
      </form>

      <br />
      <button
      className="LinktoButton"
        onClick={() => {
          // console.log(pathLoc.at(-1));
          fetchFiles(pathLoc.at(-1));
          let backPath = pathLoc.filter(
            (element) => element !== pathLoc.at(-1)
          );
          backPath = backPath.length !== 0 ? backPath : ["root"];
          // console.log(backPath)
          setPathLoc(backPath);
        }}
      >
        back
      </button>
      <br/>
      <h3 className="header">G-DRIVE</h3>
      <br />
      <div className="scrolltable">
        <table>
          <tbody>
            <tr>
              <th>icon</th>
              <th>file name</th>
              <th>type</th>
              <th>size</th>
              <th>goto content</th>
              <th>download content</th>
              <th>delete</th>
            </tr>
            {files.length ? (
              files.map((file) => {
                return (
                  <tr id={file.id} key={file.id}>
                    <EachFile
                      file={file}
                      DeleteFile={DeleteFile}
                      fetchFiles={fetchFiles}
                      pathLoc={pathLoc}
                      setPathLoc={setPathLoc}
                      setCurrentFolder={setCurrentFolder}
                      DownloadFolder={DownloadFolder}
                    />
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>no files or folders here</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
