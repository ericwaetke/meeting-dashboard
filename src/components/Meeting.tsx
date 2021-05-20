import dayjs from "dayjs";
import React from "react";

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

	const duration = dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.end}`).diff(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`), "minute")

	const progress = Math.abs(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`).diff(dayjs(), "minute")) / duration * 100

	const delta = dayjs().diff(dayjs(`${dayjs().format("YYYY-MM-DD ")} ${props.meetingData.start}`), "minute")
	
	let indicator;
	if (delta > 0) {
		// Currently Running
		indicator = <span className="progress running" style={{width: `${progress}%`}}></span>
	} else{
		// Not running
		indicator = <span className="progress upcoming">Meeting in: <span className="time">{Math.abs(delta)} min</span></span>
	}

	return ( 
		<a href={props.meetingData.link} target="_blank" className="meeting running">
			{indicator}
			<h2>{props.meetingData.name}</h2>
			<p>{props.meetingData.start} - {props.meetingData.end}</p>
			{/* <h2>It is {new Date().toLocaleTimeString()}.</h2> */}
		</a>
	 );
}
 
export default Meeting;