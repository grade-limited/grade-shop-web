import React, { useRef } from "react";
import Iconify from "@/components/iconify";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
  docType: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, docType }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = React.useState<string | undefined>();

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded: File | null = event.target.files?.[0] || null;
    setFilename(fileUploaded?.name);
    onFileUpload(fileUploaded);
  };

  return (
    <div className="w-[100%] rounded-lg border-dashed border-2" onClick={handleClick}>
      <div className="bg-slate-50 p-2 rounded-lg h-full flex flex-col items-center">
        <Iconify icon={"majesticons:file-plus-line"} className="w-12 h-12 text-[#d1d5db] mb-3" />
        {/* <h1 className="text-xs">Browse file</h1> */}
        <h2 className="text-md">
          Upload your {docType}{" "}
          <span className="text-[.7rem] hover:text-[#7e22ce]">
            Browse <span className="font-bold">PDF</span> file
          </span>
        </h2>
        <input type="file" ref={hiddenFileInput} multiple={false} accept=".pdf" style={{ display: "none" }} onChange={handleChangeFile} />
        {filename && <h2 className="font-thin text-xs mt-4">{filename}</h2>}
      </div>
    </div>
  );
};

export default FileUpload;
