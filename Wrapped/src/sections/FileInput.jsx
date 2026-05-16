import { useState, useRef } from "react";

function FileInput() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileUplouad = (e) => {
    const file = e.target.file[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setJsonData(parsed);
      } catch (err) {
        console.error("Invalid JSON file:", err);
      }
    };
    reader.readAsText(file);
  };
  const addFiles = (newFiles) => {
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...[...newFiles].filter((f) => !names.has(f.name))];
    });
  };

  const removeFile = (i) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const fmt = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 ** 2).toFixed(1) + " MB";
  };

  return (
    <div className="mt-30 w-5/8 mx-auto " id="download">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-all
          ${dragging ? "border-[rgb(200,60,130)] bg-[rgba(200,60,130,0.08)]" : "border-[rgba(200,60,130,0.35)] bg-[rgb(20,35,55)]"}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={() => handleFileUplouad}
          accept=".json"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="w-14 h-14 rounded-full border border-[rgba(200,60,130,0.4)] bg-[rgba(200,60,130,0.12)] flex items-center justify-center">
          <i className="fa-solid fa-upload text-[rgb(200,60,130)] text-xl" />
        </div>
        <p className="text-white font-medium text-base">
          Drop your export files here
        </p>
        <p className="text-gray-400 text-sm">
          Supports <span className="font-bold text-red-700">only</span> JSON
          file type
        </p>
        <span className="mt-1 px-5 py-2 rounded-lg border border-[rgba(200,60,130,0.5)] text-[rgb(200,60,130)] text-sm font-medium">
          Browse files
        </span>
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-[rgb(20,35,55)] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[rgba(40,80,140,0.25)] border border-[rgba(40,80,140,0.4)] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-file text-[rgb(100,140,210)] text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {f.name}
                </p>
                <p className="text-gray-500 text-xs">{fmt(f.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="w-7 h-7 rounded-md bg-white/5 hover:bg-[rgba(200,60,130,0.15)] hover:text-[rgb(200,60,130)] text-gray-400 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-3 w-full py-3 rounded-xl text-white font-medium text-sm bg-linear-to-r from-[rgb(200,60,130)] to-[rgb(40,80,140)] hover:opacity-90 transition-opacity"
        >
          Upload & Continue
        </button>
      )}
    </div>
  );
}

export default FileInput;
