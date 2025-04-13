import { generateDownloadableCSV } from '../utils/scheduler';

export default function ScheduleTable({ schedule }) {
  const formatSessionTitle = (sessionCode) => {
    const [date, period] = sessionCode.split('-');
    const periodLabel = period === 'M' ? 'Morning (8:30-12:00)' : 'Afternoon (14:30-18:00)';
    return `${date} - ${periodLabel}`;
  };

  const totalCandidates = Object.values(schedule).reduce((sum, names) => sum + names.length, 0);
  if (totalCandidates !== 45) {
    console.warn(`Expected 45 candidates, found ${totalCandidates}`);
  }

  const handleDownload = () => {
    const csv = generateDownloadableCSV(schedule);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview_schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Generated Interview Schedule</h2>
      <div className="session-grid">
        {Object.entries(schedule).map(([session, names]) => (
          <div key={session} className="session-card">
            <div className="session-header">
              <h3>{formatSessionTitle(session)}</h3>
              <span className="candidate-count">{names.length} candidates</span>
            </div>
            <div className="session-divider"></div>
            <ul className="candidate-list">
              {names.length > 0 ? (
                names.map((name, idx) => (
                  <li key={idx} className="candidate-item">
                    <span className="candidate-number">{idx + 1}.</span>
                    <span className="candidate-name">{name}</span>
                  </li>
                ))
              ) : (
                <li className="empty-session">No candidates scheduled</li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <p className="total-count" style={{ textAlign: 'center', marginTop: '1rem', color: '#607D8B' }}>
        Total Candidates: {totalCandidates}
      </p>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Download Schedule
        </button>
      </div>
    </div>
  );
}