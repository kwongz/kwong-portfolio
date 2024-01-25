import React from "react";

const DownloadButton = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <button className="navBarButton" onClick={handleDownload}>
      Resume
    </button>
  );
};

export default DownloadButton;
