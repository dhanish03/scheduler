export function createSchedule(candidates) {
  const sessions = {
    'April 14-M': [],
    'April 14-A': [],
    'April 15-M': [],
    'April 15-A': [],
    'April 16-M': [],
    'April 16-A': [],
  };

  // Map candidates to availability
  const candidateAvailability = candidates.map((candidate) => {
    const availability = [];
    if (candidate['April 14']?.includes('8:30-12:00')) availability.push('April 14-M');
    if (candidate['April 14']?.includes('14:30-18:00')) availability.push('April 14-A');
    if (candidate['April 15']?.includes('8:30-12:00')) availability.push('April 15-M');
    if (candidate['April 15']?.includes('14:30-18:00')) availability.push('April 15-A');
    if (candidate['April 16']?.includes('8:30-12:00')) availability.push('April 16-M');
    if (candidate['April 16']?.includes('14:30-18:00')) availability.push('April 16-A');
    return { name: candidate.Name, availability, assigned: false };
  });

  // Sort by least availability
  candidateAvailability.sort((a, b) => a.availability.length - b.availability.length);

  // Assign candidates
  candidateAvailability.forEach((candidate) => {
    if (candidate.assigned) return;
    const sessionSizes = Object.keys(sessions).map((session) => ({
      session,
      count: sessions[session].length,
    }));
    const availableSessions = sessionSizes
      .filter((s) => candidate.availability.includes(s.session) && s.count < 8)
      .sort((a, b) => a.count - b.count);
    if (availableSessions.length > 0) {
      sessions[availableSessions[0].session].push(candidate.name);
      candidate.assigned = true;
    }
  });

  // Balance sessions
  let balanced = false;
  while (!balanced) {
    const sizes = Object.values(sessions).map((s) => s.length);
    const maxSize = Math.max(...sizes);
    const minSize = Math.min(...sizes);
    if (maxSize - minSize <= 1) break;
    const maxSession = Object.keys(sessions).find((s) => sessions[s].length === maxSize);
    const minSession = Object.keys(sessions).find((s) => sessions[s].length === minSize);
    let moved = false;
    for (const name of sessions[maxSession]) {
      const candidate = candidateAvailability.find((c) => c.name === name);
      if (candidate.availability.includes(minSession)) {
        sessions[maxSession] = sessions[maxSession].filter((n) => n !== name);
        sessions[minSession].push(name);
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }

  return sessions;
}

export function generateDownloadableCSV(sessions) {
  const rows = [['Date', 'Session', 'Candidates']];
  Object.keys(sessions).forEach((session) => {
    const [date, time] = session.split('-');
    const timeLabel = time === 'M' ? 'Morning' : 'Afternoon';
    rows.push([date, timeLabel, sessions[session].join(', ')]);
  });
  return rows.map(row => row.join(',')).join('\n');
}