interface DownloadFileConfig {
  fileName?: string;
  fileType?: string;
  ignoreFileType?: boolean;
}

export const downloadFile = (
  response: Blob,
  config: DownloadFileConfig = {}
) => {
  const {
    fileName = "download",
    fileType = "csv",
    ignoreFileType = false,
  } = config;

  const href = URL.createObjectURL(response);
  const link = document.createElement("a");

  link.href = href;
  link.setAttribute(
    "download",
    ignoreFileType ? `${fileName}` : `${fileName}.${fileType}`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
