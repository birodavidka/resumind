import { useDropzone } from "react-dropzone";
import { useCallback, useState, type MouseEvent } from "react";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    },
    [onFileSelect],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
  });

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>
          {file ? (
            <div className="uploader-selected-file">
              <div className="flex items-center gap-3 min-w-0">
                <img src="/images/pdf.png" alt="" className="size-10" />
                <p className="truncate">{file.name}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  className="cursor-pointer p-2"
                  onClick={handleRemove}
                  aria-label="Remove selected file"
                >
                  <img
                    src="/icons/cross.svg"
                    alt=""
                    className="size-4"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <p className="text-lg text-gray-500 ">
                <span className="font-semibold">
                  {isDragActive ? "Drop the file here" : "Click to upload"}
                </span>
                {!isDragActive && " or drag and drop"}
              </p>
              <p className="text-lg text-gray-500">PDF (max 20MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
