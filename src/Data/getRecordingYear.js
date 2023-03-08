function getRecordingYear(record) {
    // Returns only the first recording year
    return (record.recording_dates || [])
        .filter(a => a)
        .map(a => Number(a.slice(0, 4)))
        .sort()[0]
}


export { getRecordingYear }