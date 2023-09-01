import "./App.css";
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileContainer from './FileContainer';
import { fileData } from './fileData';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function App() {
  const [fileDataState, setFileDataState] = useState([...fileData]);

  const handleFileContentChange = (index, newContent) => {
    const newFileData = [...fileDataState];
    newFileData[index].content = newContent;
    setFileDataState(newFileData);
  };

  const handleRenameFile = (index, newName) => {
    const newFileData = [...fileDataState];
    newFileData[index].name = newName;
    setFileDataState(newFileData);
  };

  const handleDeleteFile = (index) => {
    const newFileData = fileDataState.filter((_, i) => i !== index);
    setFileDataState(newFileData);
  };

  const handleCreateFile = () => {
    const newFileName = `New File ${fileDataState.length + 1}`;
    const newFile = { name: newFileName, content: '' };
    setFileDataState([...fileDataState, newFile]);
  };

  return (
    <div className="App-Padding">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Amaranth Synchronizer
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            Container 1
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">
            Container 2
          </Typography>
        </Grid>

        {fileDataState.map((file, index) => (
          <React.Fragment key={index}>
          <Grid item xs={6}>
            <FileContainer
              file={file}
              onContentChange={(newContent) => handleFileContentChange(index, newContent)}
              onRenameFile={(newName) => handleRenameFile(index, newName)}
              onDeleteFile={() => handleDeleteFile(index)}
            />
          </Grid>

          <Grid item xs={6}>
            <FileContainer
              file={file}
              onContentChange={(newContent) => handleFileContentChange(index, newContent)}
              onRenameFile={(newName) => handleRenameFile(index, newName)}
              onDeleteFile={() => handleDeleteFile(index)}
            />
          </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={6}>
            <Button variant="contained" onClick={handleCreateFile}>Create New File here</Button>
        </Grid>

        <Grid item xs={6}>
            <Button variant="contained" onClick={handleCreateFile}>Create New File here</Button>
        </Grid>

      </Grid>
    </div>
  );
}
export default App;
