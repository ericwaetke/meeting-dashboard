import dayjs from "dayjs";
import React, {useState} from "react";
import Meeting from "./Meeting"
import MeetingConfig from "./MeetingConfig"

export interface MeetingOverviewProps {
	
}
 
const MeetingOverview: React.FunctionComponent<MeetingOverviewProps> = () => {
	const currentWeekday = dayjs().format("dddd")

	const [meetings, setMeetings] = useState([
		// meetings go in here
		// example meeting
		{
			name: "Meeting",
			date: "Monday",
			start: "12:00",
			end: "13:00",
			link: "https://..."
		}
	])

	const addMeeting = (name: string, date: string, start: string, end: string, link: string) => {
		event?.preventDefault()
		setMeetings([
			...meetings, 
			{
				name,
				date,
				start,
				end,
				link
			}
		])
	}

	return ( 
		<div className="meetingOverview">
			<h1>Upcoming Meetings</h1>
			<button className="round">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<line x1="9" y1="6" x2="20" y2="6" />
					<line x1="9" y1="12" x2="20" y2="12" />
					<line x1="9" y1="18" x2="20" y2="18" />
					<line x1="5" y1="6" x2="5" y2="6.01" />
					<line x1="5" y1="12" x2="5" y2="12.01" />
					<line x1="5" y1="18" x2="5" y2="18.01" />
				</svg>
			</button>
			<MeetingConfig addMeeting={addMeeting} meetings={meetings} />
			{
				// Todo: Time Sorting
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