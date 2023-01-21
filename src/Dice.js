import './Dice.css'

export default function Dice(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#2B3A55" : "#F2E5E5",
        color: props.isHeld? "white" : "black"
    }

    return(
            <div className="dice__box" style={styles} onClick={props.click}>
                <p>
                    {props.value}
                </p>
            </div>
    )
}