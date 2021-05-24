import React, {useState} from "react"
import dayjs from "dayjs"
import useCollapse from "react-collapsed"
import AddNewMeeting from "./AddNewMeeting"

export interface MeetingConfigProps {
	meetings: Array<any>,
	addMeeting: Function,
	visibility: boolean
}
 
const MeetingConfig: React.SFC<MeetingConfigProps> = ({meetings, addMeeting, visibility}) => {
	
	const _addMeeting = () => {
		const currentWeekday = dayjs().format("dddd")
		const currentHour = dayjs().format("HH")
		const currentMinute = dayjs().format("mm")
	
		const _debugTime = `${currentHour}:${parseInt(currentMinute) + 1}`

		addMeeting("Debug Meeting", "Eric Wätke", currentWeekday, `${currentHour}:${currentMinute}`, `${_debugTime}`, {name: "Zoom", link: "https://github.com/ericwaetke/meeting-dashboard"}, [{name: "GitHub", link: "https://github.com/ericwaetke/meeting-dashboard"}])
	}

	const {getCollapseProps, getToggleProps} = useCollapse({isExpanded: visibility})

	const [addNewMeetingVisibility, setAddNewMeetingVisibility] = useState(false)

	const AddNewMeetingElement = () => {
		if(addNewMeetingVisibility) {
			return (<AddNewMeeting addMeeting={addMeeting}/>)
		} else {
			return null
		}
	}

	return (
		<div {...getCollapseProps()}>
			<div className={`meetingConfig card`}>
				<h2>Meeting Configuration</h2>
				{
					meetings.map((meeting) => {
						return(
							<p>{meeting.name} - {meeting.date} - {meeting.start} - {meeting.end} - {meeting.link}</p>
						)
					})
				}

				{AddNewMeetingElement()}

				<button onClick={() => {setAddNewMeetingVisibility(!addNewMeetingVisibility); console.log(addNewMeetingVisibility)}}>Add New Meeting</button>
				<button onClick={_addMeeting}>Add New Debug Meeting</button>
			</div>
		</div>
	);
}
 
export default MeetingConfig;