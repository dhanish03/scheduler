import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function FileUploader({ onDataLoaded, onError }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (file) => {
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(fileType)) {
      onError('Unsupported file type. Please upload CSV or Excel.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        let data = [];
        if (fileType === 'xlsx' || fileType === 'xls') {
          const workbook = XLSX.read(evt.target.result, { type: 'array' });
          data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        } else if (fileType === 'csv') {
          const parsed = Papa.parse(evt.target.result, { header: true, skipEmptyLines: true });
          if (parsed.errors.length) throw new Error('Invalid CSV format');
          data = parsed.data;
        }

        // Normalize data (same as original logic)
        const normalizedData = data.map((row) => ({
          Name: row.Name || row.name || '',
          'April 14': row['April 14'] || row.april_14 || 'None',
          'April 15': row['April 15'] || row.april_15 || 'None',
          'April 16': row['April 16'] || row.april_16 || 'None',
        }));

        // Validate data
        if (normalizedData.some((row) => !row.Name)) {
          throw new Error('Missing "Name" column or invalid data');
        }

        onDataLoaded(normalizedData);
      } catch (err) {
        onError(`Error parsing file: ${err.message}`);
      }
    };

    if (fileType === 'xlsx' || fileType === 'xls') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files[0]);
  };

  return (
    <div className="upload-container">
      <h2>Upload Schedule Data</h2>
      <div
        className={`upload-area ${isDragging ? 'drag-over' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="upload-text">Drag & drop or click to upload Excel/CSV</p>
        <button className="upload-button">Browse Files</button>
        <p className="upload-hint">Supports .xlsx, .xls, and .csv files</p>
      </div>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        ref={fileInputRef}
        onChange={(e) => handleUpload(e.target.files[0])}
        className="hidden-input"
      />
    </div>
  );
}