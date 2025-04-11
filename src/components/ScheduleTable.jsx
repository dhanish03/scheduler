export default function ScheduleTable({ schedule }) {
    // Function to convert session codes to readable format
    const formatSessionTitle = (sessionCode) => {
      const [date, period] = sessionCode.split('-');
      const periodLabel = period === 'M' ? 'Morning (8:30-12:00)' : 'Afternoon (14:30-18:00)';
      return `${date} - ${periodLabel}`;
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
      </div>
    );
  }