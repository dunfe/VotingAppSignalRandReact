interface RadioInputProps {
    disable: boolean;
    choice: string;
    onChoiceSelect: (choice: string) => void;
    classType: string;
    index: string;
}

const RadioInput = (props: RadioInputProps) => {
    const {disable, choice, classType, index, onChoiceSelect} = props;
    const classString = disable ? "radio disabled" : "radio";

    const handleClick = () => {
        onChoiceSelect(choice);
    }
    return (
        <div className={classString}>
                <label className={classType}>
                    <input type="radio" name="optionsRadios" id={index} value={choice} onChange={handleClick}  />
                    {choice}
                </label>
            </div>
    )
}

export default RadioInput;