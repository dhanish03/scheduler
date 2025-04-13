import { useState } from 'react';
import FileUploader from './components/FileUploader';
import ScheduleTable from './components/ScheduleTable';
import { createSchedule } from './utils/scheduler';
import './styles/App.css';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDataLoaded = (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const sched = createSchedule(data);
      setSchedule(sched);
    } catch (err) {
      setError(`Error processing data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (message) => {
    setError(message);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Interview Scheduler</h1>
        <p className="app-description">
          Upload your Excel/CSV file with candidate availability to generate an optimized interview schedule
        </p>
      </header>
      
      <main className="app-content">
        <FileUploader onDataLoaded={handleDataLoaded} onError={handleError} />
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Generating schedule...</p>
          </div>
        )}
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        {schedule && !isLoading && <ScheduleTable schedule={schedule} />}
      </main>
      
      <footer className="app-footer">
        <p>© Abdul Dhanish - 2025 Interview Scheduler - Organize your interviews efficiently</p>
      </footer>
    </div>
  );
}

export default App;