import React from "react"

export interface MeetingConfigProps {
    meetings: Array<any>,
    addMeeting: Function
}
 
const MeetingConfig: React.SFC<MeetingConfigProps> = ({meetings, addMeeting}) => {
    console.log(meetings)


    const _addMeeting = () => {
        addMeeting("Testmeeting", "Thursday", "15:00", "16:00", "#")
    }

    return (
        <div className="meetingConfig">
            <p>f</p>
            <button onClick={_addMeeting}>Add New Meeting</button>
        </div>
    );
}
 
export default MeetingConfig;