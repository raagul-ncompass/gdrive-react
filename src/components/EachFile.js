import prettyBytes from 'pretty-bytes';
export const EachFile = ({
  file,
  DeleteFile,
  fetchFiles,
  pathLoc,
  setPathLoc,
  setCurrentFolder,
  DownloadFolder
}) => {
  return (
    <>
      <td>
        <img src={file.iconLink} alt={"icon"}></img>
      </td>
      <td>{file.name}</td>
      <td>
        {file.mimeType === "application/vnd.google-apps.folder" ? (
          <button
          className="LinktoButton"
            onClick={() => {
              
              // console.log(file.parents)
              setCurrentFolder(file.id);
              setPathLoc([...pathLoc, ...file.parents]);
              setTimeout(() => fetchFiles(file.id), 1000);
            }}
          >
            folder
          </button>
        ) : (
          <></>
        )}
      </td>
      <td>{file.mimeType !== "application/vnd.google-apps.folder" ? (prettyBytes(Number(file.size))):"folder"}</td>
      <td>
        <a className="LinktoButton" href={file.webViewLink}>GO-TO</a>
      </td>
      <td>
      {
        file.mimeType !== "application/vnd.google-apps.folder" ? (
        <a className="LinktoButton" href={file.webContentLink}>DOWNLOAD</a>
        ):<button onClick={()=>DownloadFolder(file.id)} disabled>DOWNLOAD</button>}
      </td>
      <td>
        <button
        className="LinktoButton delbtn"
          onClick={() => {
            DeleteFile(file.id);
          }}
        >
          DELETE
        </button>
      </td>
    </>
  );
};
