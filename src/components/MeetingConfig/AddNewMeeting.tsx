import React, { useState } from "react"

export interface AddNewMeetingProps {
	addMeeting: Function
}
 
const AddNewMeeting: React.SFC<AddNewMeetingProps> = ({addMeeting}) => {

	const handleMeetingAddition = () => {
		addMeeting(name, host, date, start, end, {name: destinationName, link: destinationLink})
	}

	// Vars for new meeting
	const [name, setName] = useState("")
	const [host, setHost] = useState("")
	const [date, setDate] = useState("")
	const [start, setStart] = useState("")
	const [end, setEnd] = useState("")
	const [destinationLink, setDestinationLink] = useState("")
	const [destinationName, setDestinationName] = useState("")

	return (
		<div className="addNewMeeting">
			<div className="inputGroup">
				<label htmlFor="name">Meeting Name</label>
				<input 
					type="text"
					id="name" 
					value={name} 
					placeholder="Zoom Meeting"
					required
					onChange={(e) => {setName(e.target.value)}}/>
			</div>
			<div className="inputGroup">
				<label htmlFor="host">Meeting Host</label>
				<input 
					type="text"
					id="host" 
					value={host} 
					placeholder="Meeting Host" 
					onChange={(e) => {setHost(e.target.value)}}/>
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
				<label htmlFor="link">Destination Name</label>
				<input 
					type="text"
					id="link" 
					value={destinationName} 
					placeholder="z.B. Zoom, Raum 200"
					onChange={(e) => {setDestinationName(e.target.value)}}/>
			</div>
			<div className="inputGroup">
				<label htmlFor="destinationLink">Destination URL</label>
				<input 
					type="url"
					id="destinationLink" 
					value={destinationLink} 
					onChange={(e) => {setDestinationLink(e.target.value)}}/>
			</div>
			<button onClick={handleMeetingAddition}>Add Meeting</button>
		</div>
	);
}
 
export default AddNewMeeting;