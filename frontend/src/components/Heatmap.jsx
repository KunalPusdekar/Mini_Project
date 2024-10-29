import React from 'react';

const Heatmap = ({ activityHeatmap }) => {
    const dates = Object.keys(activityHeatmap).map(date => new Date(parseInt(date) * 1000));
    const maxActivity = Math.max(...Object.values(activityHeatmap));
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [...new Set(dates.map(date => date.toLocaleString('default', { month: 'short' })))];


    // Define minimum and maximum lightness for the shades of green
    const minLightness = 40;  // Darkest shade for max activity
    const maxLightness = 75;  // Lightest shade for activity=1

    // Function to calculate color shades based on activity
    const calculateColor = (activity) => {
        if (activity === 0) return '#ebedf0';  // Light gray for no activity

        // Adjust lightness based on activity level, with a minimum bound
        const lightness = maxLightness - (activity / maxActivity) * (maxLightness - minLightness);
        return `hsl(120, 60%, ${lightness}%)`;  // Use hue 120 (green) with fixed saturation
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: '900px', margin: '0 auto', fontSize: '12px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
            {/* Month labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px', paddingLeft: '30px' }}>
                {months.map((month, index) => (
                    <span key={index} style={{ flex: '1', textAlign: 'center', color: '#666' }}>{month}</span>
                ))}
            </div>
            
            <div style={{ display: 'flex' }}>
                {/* Day labels on the side */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: '5px', height: '130px' }}>
                    {daysOfWeek.map(day => (
                        <span key={day} style={{ color: '#666' }}>{day}</span>
                    ))}
                </div>

                {/* Heatmap grid */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${months.length * 4}, 16px)`, gridGap: '4px', backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '4px' }}>
                    {Array.from({ length: 7 * months.length * 4 }).map((_, index) => {
                        const dateIndex = dates.findIndex(date => date.getDay() === index % 7 && Math.floor(index / 7) === dates.indexOf(date));
                        const activity = dateIndex !== -1 ? activityHeatmap[dates[dateIndex].getTime() / 1000] : 0;

                        return (
                            <div
                                key={index}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: calculateColor(activity || 0),
                                    borderRadius: '3px',
                                    position: 'relative'
                                }}
                                title={activity ? `submitted: ${activity}` : 'No activity'}
                            ></div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', marginTop: '10px' }}>
                <span style={{ color: '#666', marginRight: '5px' }}>Less</span>
                <div style={{ display: 'flex', marginRight: '5px' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: calculateColor(1), margin: '0 2px', borderRadius: '3px' }}></div>
                    <div style={{ width: '16px', height: '16px', backgroundColor: calculateColor(Math.floor(maxActivity / 4)), margin: '0 2px', borderRadius: '3px' }}></div>
                    <div style={{ width: '16px', height: '16px', backgroundColor: calculateColor(Math.floor(maxActivity / 2)), margin: '0 2px', borderRadius: '3px' }}></div>
                    <div style={{ width: '16px', height: '16px', backgroundColor: calculateColor(Math.floor(maxActivity * 0.75)), margin: '0 2px', borderRadius: '3px' }}></div>
                    <div style={{ width: '16px', height: '16px', backgroundColor: calculateColor(maxActivity), margin: '0 2px', borderRadius: '3px' }}></div>
                </div>
                <span style={{ color: '#666' }}>More</span>
            </div>
        </div>
    );
};

export default Heatmap;
