import dayjs, { Dayjs } from "dayjs";
import React, {useEffect, useState} from "react";

export interface MeetingProps {
	meetingData: {
		name: string,
		host: string,
		start: string,
		end: string,
		date: string,
		link: string
	}
}
 
const Meeting: React.FunctionComponent<MeetingProps> = (props) => {
	// Time Convertion Helper Functions
	const timeToDate = (time: string) => dayjs(`${dayjs().format("YYYY-MM-DD")} ${time}`)
	const timeToPercentage = (time: number, duration: number) => Math.abs(time) / duration * 100
	const timeDiff = (from: Dayjs, to: Dayjs) => from.diff(to, "minute")
	
	// The duration of an meeting
	const duration = timeDiff(timeToDate(props.meetingData.end), timeToDate(props.meetingData.start))

	// The progress of a currently running meeting
	const [progress, setProgress] = useState(timeToPercentage(timeDiff(timeToDate(props.meetingData.start), dayjs()), duration))

	// The Time Delta to an upcoming meeting
	const [delta, setDelta] = useState(timeDiff(dayjs(), timeToDate(props.meetingData.start)))


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
			setProgress(timeToPercentage(progress + (progressInterval/1000/60), duration))

			// Setting Delta
			setDelta(timeDiff(dayjs(), timeToDate(props.meetingData.start)))
		}, progressInterval)
	})

	return ( 
		<div className="meeting card running">
			<div className="information">
				{indicator}
				<p className="host">{props.meetingData.host}</p>
				<h2>{props.meetingData.name}</h2>
				<p className="time">{props.meetingData.start} - {props.meetingData.end}</p>
			</div>
			<div className="links">
				<a href={props.meetingData.link} target="_blank" className="meeting">Zoom</a>
			</div>
		</div>
	 );
}
 
export default Meeting;