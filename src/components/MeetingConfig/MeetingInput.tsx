import React, { SyntheticEvent } from "react"

export interface MeetingInputProps {
    label: string,
    id: string,
    inputType: string,
    placeholder: string,
    value: string,
    setter: Function
}
 
const MeetingInput: React.SFC<MeetingInputProps> = ({label, id, inputType, placeholder, value, setter}) => {

    const handleInputChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
		console.log(target.value, setter);
        
        setter(target.value)
	}

    return (
        <div>
            <div className="inputGroup">
                <label htmlFor={id}>{label}</label>
                <input 
                    type={inputType} 
                    id={id} 
                    value={value} 
                    placeholder={placeholder} 
                    onChange={handleInputChange}/>
            </div>
        </div>
    );
}
 
export default MeetingInput;