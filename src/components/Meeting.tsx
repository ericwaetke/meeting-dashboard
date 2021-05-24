import dayjs, { Dayjs } from "dayjs";
import React, {useEffect, useState} from "react";

export interface MeetingProps {
	meetingData: {
		name: string,
		host: string,
		start: string,
		end: string,
		date: string,
		destination: {name: string, link: string},
		links: Array<{name: string, link: string}>
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
		indicator = <span className="progress running" style={{width: `calc(${progress.toPrecision(2)}% - 64px)`}}></span>
	} else if (delta > duration) {
		indicator = <span>Meeting over</span>
	} else {
		// Not running yet
		// indicator = <span className="progress upcoming">Meeting in: <span className="time">{Math.abs(delta)} min</span></span>
	}

	// Handling the update mechanics of the meeting UI
	useEffect(() => {
		window.setTimeout(() => {
			// Setting Progress
			const newProgress = timeToPercentage(progress + (progressInterval/1000/60), duration)
			setProgress(newProgress > 100 ? 100 : newProgress)

			// Setting Delta
			setDelta(timeDiff(dayjs(), timeToDate(props.meetingData.start)))
		}, progressInterval)
	})

	return ( 
		<div className="meeting card running">
			<div className={`information ${delta >= 0 && delta < duration ? "running" : ""}`}>
				{indicator}
				<p className="host">{props.meetingData.host}</p>
				<h2>{props.meetingData.name}</h2>
				<p className="time">{props.meetingData.date.slice(0, 3)} {props.meetingData.start} - {props.meetingData.end}</p>
			</div>
			<div className="links">
				{
					(props.meetingData.links || []).map((link) => {
						return (
							<a href={link.link} target="_blank">{link.name}</a>
						)
					})
				}
				<a href={props.meetingData.destination.link} target="_blank" className="meeting">{props.meetingData.destination.name}</a>
			</div>
		</div>
	 );
}
 
export default Meeting;