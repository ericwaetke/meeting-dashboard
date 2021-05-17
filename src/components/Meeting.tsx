import React from "react";

export interface MeetingProps {
	meetingData: {
		name: String,
		time: String,
		date: String,
		link: String
	}
}
 
const Meeting: React.FunctionComponent<MeetingProps> = (props) => {
	const name = "h"
	const time = "hg"



	return ( 
		<a href="#" target="_blank" className="meeting">
			<h2>{props.meetingData.name}</h2>
			<p>{props.meetingData.time}</p>
			{/* <h2>It is {new Date().toLocaleTimeString()}.</h2> */}
		</a>
	 );
}
 
export default Meeting;