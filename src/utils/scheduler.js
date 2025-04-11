export function createSchedule(data) {
    const sessions = {
      "April 14-M": [],
      "April 14-A": [],
      "April 15-M": [],
      "April 15-A": [],
      "April 16-M": [],
      "April 16-A": [],
    };
  
    data.forEach(row => {
      const name = row['Name'];
      const prefs = [];
  
      ["April 14", "April 15", "April 16"].forEach(date => {
        const availability = row[date];
        if (availability) {
          if (availability.includes('8:30-12:00')) prefs.push(`${date}-M`);
          if (availability.includes('14:30-18:00')) prefs.push(`${date}-A`);
        }
      });
  
      // Greedy assignment: Assign to session with least count
      prefs.sort((a, b) => sessions[a].length - sessions[b].length);
      for (let session of prefs) {
        if (sessions[session].length < 8) {
          sessions[session].push(name);
          break;
        }
      }
    });
  
    return sessions;
  }
  