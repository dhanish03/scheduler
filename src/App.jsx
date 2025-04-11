import { useState } from 'react';
import FileUploader from './components/FileUploader';
import ScheduleTable from './components/ScheduleTable';
import { createSchedule } from './utils/scheduler';
import './styles/App.css';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleData = (data) => {
    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const sched = createSchedule(data);
      setSchedule(sched);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Interview Scheduler</h1>
        <p className="app-description">
          Upload your Excel file with candidate availability to generate an optimized interview schedule
        </p>
      </header>
      
      <main className="app-content">
        <FileUploader onDataLoaded={handleData} />
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Generating schedule...</p>
          </div>
        )}
        
        {schedule && !isLoading && <ScheduleTable schedule={schedule} />}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 Interview Scheduler - Organize your interviews efficiently</p>
      </footer>
    </div>
  );
}

export default App;