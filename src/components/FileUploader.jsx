import * as XLSX from 'xlsx';

export default function FileUploader({ onDataLoaded }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      onDataLoaded(sheet); // send data to parent
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  return (
    <div className="upload-container">
      <h2>Upload Schedule Data</h2>
      <div className="upload-area">
        <div className="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L12 8" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11L12 8L15 11" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 16L16 22" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 16L8 22" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="upload-text">Drag & drop or click to upload Excel file</p>
        <label className="upload-button">
          Browse Files
          <input 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleUpload} 
            className="hidden-input"
          />
        </label>
        <p className="upload-hint">Supports .xlsx files</p>
      </div>
    </div>
  );
}