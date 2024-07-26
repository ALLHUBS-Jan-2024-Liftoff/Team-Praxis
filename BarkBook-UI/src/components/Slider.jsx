/* if you plan to use the slider somewhere,
you need to pass the state and handler as props.
State and Handler examples:

value state
const [sliderValue, setSliderValue] = useState(2.5);

onChange handler
const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
}

You also need to pass in the minimum, maximum, and step values as Strings

Example usage:
<label>Slider Value: {sliderValue}
    <Slider
        value={sliderValue} onChange={handleSliderChange}
        min={"0.5"} max={"5"} step={"0.1"}/>
</label>
*/

export const Slider = ({value, onChange, min, max, step}) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <div className={"mt-2"}>
            <input
                type={"range"}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};