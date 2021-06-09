import React, { useState } from "react"

export interface AddNewMeetingProps {
	addMeeting: Function
}
 
const AddNewMeeting: React.SFC<AddNewMeetingProps> = ({addMeeting}) => {

	const handleMeetingAddition = () => {
		addMeeting(name, host, date, start, end, destination)
	}

	// Vars for new meeting
	const [name, setName] = useState("")
	const [host, setHost] = useState("")
	const [date, setDate] = useState("")
	const [start, setStart] = useState("")
	const [end, setEnd] = useState("")
	const [destination, setDestination] = useState("")

	return (
		<div className="addNewMeeting">
			<div className="inputGroup">
				<label htmlFor="name">Meeting Name</label>
				<input 
					type="text"
					id="name" 
					value={name} 
					placeholder="Zoom Meeting" 
					onChange={(e) => {setName(e.target.value)}}/>
			</div>
			<div className="inputGroup">
				<label htmlFor="day">Meeting Date</label>
				<select 
					name="day" 
					id="day"
					value={date}
					onChange={(e) => setDate(e.target.value)}>
					<option value="Monday">Monday</option>
					<option value="Tuesday">Tuesday</option>
					<option value="Wednesday">Wednesday</option>
					<option value="Thursday">Thursday</option>
					<option value="Friday">Friday</option>
					<option value="Saturday">Saturday</option>
					<option value="Sunday">Sunday</option>
				</select>
			</div>
			<div className="inputGroup">
				<label htmlFor="start">Starting Time</label>
				<input 
					type="time"
					id="start" 
					value={start} 
					onChange={(e) => {setStart(e.target.value)}}/>
			</div>
			<div className="inputGroup">
				<label htmlFor="end">Ending Time</label>
				<input 
					type="time"
					id="end" 
					value={end} 
					onChange={(e) => {setEnd(e.target.value)}}/>
			</div>
			<div className="inputGroup">
				<label htmlFor="link">Meeting URL</label>
				<input 
					type="url"
					id="link" 
					value={destination} 
					onChange={(e) => {setDestination(e.target.value)}}/>
			</div>
			<button onClick={handleMeetingAddition}>Add Meeting</button>
		</div>
	);
}
 
export default AddNewMeeting;