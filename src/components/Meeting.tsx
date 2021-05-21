import dayjs from "dayjs";
import React, {useEffect, useState} from "react";

export interface MeetingProps {
	meetingData: {
		name: string,
		start: string,
		end: string,
		date: string,
		link: string
	}
}
 
const Meeting: React.FunctionComponent<MeetingProps> = (props) => {
	
	// The duration of an meeting
	const duration = dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.end}`).diff(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`), "minute")

	// The progress of a currently running meeting
	const [progress, setProgress] = useState(Math.abs(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`).diff(dayjs(), "minute")) / duration * 100)

	// The Time Delta to an upcoming meeting
	const [delta, setDelta] = useState(dayjs().diff(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`), "minute"))


	// Interval how often the progress and delta gets recalculated in milli-seconds
	const progressInterval = 5000
	
	// Different DOM elements depending on state of meeting
	let indicator;
	if (delta >= 0) {
		// Currently Running
		indicator = <span className="progress running" style={{width: `${progress}%`}}></span>
	} else{
		// Not running
		indicator = <span className="progress upcoming">Meeting in: <span className="time">{Math.abs(delta)} min</span></span>
	}

	// Handling the update mechanics of the meeting UI
	useEffect(() => {
		window.setTimeout(() => {
			// Setting Progress
			setProgress(progress + ((progressInterval/1000/60) / duration * 100))

			// Setting Delta
			setDelta(dayjs().diff(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`), "minute"))
		}, progressInterval)
	})

	return ( 
		<a href={props.meetingData.link} target="_blank" className="meeting card running">
			{indicator}
			<h2>{props.meetingData.name}</h2>
			<p>{props.meetingData.start} - {props.meetingData.end}</p>
		</a>
	 );
}
 
export default Meeting;