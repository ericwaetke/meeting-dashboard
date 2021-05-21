import React from "react"
import dayjs from "dayjs"

export interface MeetingConfigProps {
	meetings: Array<any>,
	addMeeting: Function,
	visibility: Boolean
}
 
const MeetingConfig: React.SFC<MeetingConfigProps> = ({meetings, addMeeting, visibility}) => {
	const currentWeekday = dayjs().format("dddd")
	const currentHour = dayjs().format("HH")
	const currentMinute = dayjs().format("mm")

	const _debugTime = `${currentHour}:${parseInt(currentMinute) + 1}`

	const _addMeeting = () => {
		addMeeting("Testmeeting", currentWeekday, `${currentHour}:${currentMinute}`, `${_debugTime}`, "#")
	}

	return (
		<div className={`meetingConfig card ${visibility ? 'visible' : 'hidden'}`}>
			<h2>Meeting Configuration</h2>
			{
				meetings.map((meeting) => {
					return(
						<p>{meeting.name} - {meeting.date} - {meeting.start} - {meeting.end} - {meeting.link}</p>
					)
				})
			}
			<button onClick={_addMeeting}>Add New Meeting</button>
		</div>
	);
}
 
export default MeetingConfig;