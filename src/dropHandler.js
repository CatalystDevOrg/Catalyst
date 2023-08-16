function dropHandler(ev) {
    console.log("File(s) dropped");
  
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          document.querySelector('.current').src = file.path;
        }
      });
    } else {
        alert('File type unsupported.')
    }
  }
  

  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");
  
    ev.preventDefault();
  }
  