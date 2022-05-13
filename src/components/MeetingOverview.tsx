import dayjs from "dayjs";
import React, {useState} from "react";
import Meeting from "./Meeting"
import MeetingConfig from "./MeetingConfig/MeetingConfig"

function useStickyState(defaultValue: any, key: string) {
	const [value, setValue] = React.useState(() => {
	  const stickyValue = window.localStorage.getItem(key);
	  return stickyValue !== null
		? JSON.parse(stickyValue)
		: defaultValue;
	});

	React.useEffect(() => {
	  window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
  }


export interface MeetingOverviewProps {
	
}
 
const MeetingOverview: React.FunctionComponent<MeetingOverviewProps> = () => {
	const currentWeekday = dayjs().format("dddd")

	const [meetings, setMeetings] = useStickyState([
		// meetings go in here
		// example meeting
		{
			id: 0,
			name: "Meeting",
			host: "Meeting Host",
			date: "Monday",
			start: "12:00",
			end: "13:00",
			destination: {
				name: "Zoom",
				link: "#"
			},
			links: [
				{
					name: "Miro",
					link: "#"
				}
			]
		}
	], "meetingData")

	const addMeeting = (name: string, host: string, date: string, start: string, end: string, destination: {name: string, link: string}, links: Array<{name: string, link: string}>) => {
		event?.preventDefault()

		console.log(meetings.length);
		

		// Sets last id to 0 if array is empty and to the last one if it isn't
		const lastId = meetings.length != 0 ? meetings[meetings.length-1].id : 0

		setMeetings([
			...meetings, 
			{
				id: lastId + 1,
				name,
				host,
				date,
				start,
				end,
				destination,
				links
			}
		])
	}

	const deleteMeeting = (id: number) => {
		console.log("meeting deletion initiated");

		const _meetings = [...meetings]
		const index = _meetings.map((e: any) => e.id).indexOf(id);
		if (index !== -1) {
			_meetings.splice(index, 1)
		}		

		setMeetings([
			..._meetings
		])
	}

	const [visibility, setVisibility] = useState(false)

	console.log(meetings)

	return ( 
		<div className="meetingOverview">
			<h1>Meetings</h1>
			<button className="round" onClick={() => {setVisibility(!visibility)}}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<line x1="9" y1="6" x2="20" y2="6" />
					<line x1="9" y1="12" x2="20" y2="12" />
					<line x1="9" y1="18" x2="20" y2="18" />
					<line x1="5" y1="6" x2="5" y2="6.01" />
					<line x1="5" y1="12" x2="5" y2="12.01" />
					<line x1="5" y1="18" x2="5" y2="18.01" />
				</svg>
			</button>
			<MeetingConfig addMeeting={addMeeting} deleteMeeting={deleteMeeting} meetings={meetings} visibility={visibility}/>

			<div className="meetingGrid">
				{
					// Todo: Time Sorting
					meetings.map((meeting: any) => {
						if (meeting.date == currentWeekday) {
							return (<Meeting meetingData={meeting} />)
						}
					})
				}
			</div>

		</div>
	 );
}
 
export default MeetingOverview;