import React from 'react';
import Plot from 'react-plotly.js';

const NATStudyHabitBoxPlot = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to visualize.</p>;
  }

  // Group NAT results by study habits
  const groupedData = data.reduce((acc, student) => {
    if (!acc[student.studyHabit]) {
      acc[student.studyHabit] = [];
    }
    acc[student.studyHabit].push(student.natResults);
    return acc;
  }, {});

  const plotData = Object.keys(groupedData).map(studyHabit => ({
    type: 'box',
    y: groupedData[studyHabit],
    name: studyHabit,
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8
  }));

  return (
    <div>
      <Plot
        data={plotData}
        layout={{
          title: 'Box Plot of NAT Results by Study Habit',
          width: 1000,  // Set the width
          height: 800,  // Set the height
        }}
      />
    </div>
  );
};

export default NATStudyHabitBoxPlot;
