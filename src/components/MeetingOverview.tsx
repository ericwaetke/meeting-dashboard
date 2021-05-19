import dayjs from "dayjs";
import React from "react";
import Meeting from "./Meeting"

export interface MeetingOverviewProps {
	
}
 
const MeetingOverview: React.FunctionComponent<MeetingOverviewProps> = () => {
	const currentWeekday = dayjs().format("dddd")

	const meetings = [
		// meetings go in here
		// example meeting
		{
			name: "Meeting",
			date: "Monday",
			start: "12:00",
			end: "13:00",
			link: "https://..."
		}
	]

	return ( 
		<div className="meetingOverview">
			<h1>Upcoming Meetings</h1>
			{
				meetings.map((meeting) => {
					if (meeting.date == currentWeekday) {
						return (<Meeting meetingData={meeting} />)
					}
				})
			}
		</div>
	 );
}
 
export default MeetingOverview;