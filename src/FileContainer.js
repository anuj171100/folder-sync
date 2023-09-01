import "./App.css";
import React, {useState}from 'react';
import { useEffect } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function FileContainer({ file, onContentChange, onRenameFile, onDeleteFile }) {
  const [content, setContent] = useState(file.content);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setContent(file.content);
  }, [file.content]);

  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleFileContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

  const handleRenameFile = () => {
    const newName = prompt('Enter the new name:', file.name);
    if (newName !== null && newName !== '') {
      onRenameFile(newName);
    }
  };

  const handleDeleteFile = () => {
    if (window.confirm(`Going to delete "${file.name}"?`)) {
      onDeleteFile();
    }
  };

  return (
    <div className="container">
      <Typography onClick={handleFileClick}>
        {file.name}
      </Typography>
      <Popover
        open={isPopoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className="fileContent">
          <textarea
            value={content}
            onChange={handleFileContentChange}
            style={{ width: '100%', height: '250px' }}
          />
          <Button variant="outlined" onClick={handleRenameFile}>Rename</Button>
          <Button variant="outlined" onClick={handleDeleteFile}>Delete</Button>
        </Paper>
      </Popover>
    </div>
  );
}

export default FileContainer;
