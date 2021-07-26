import "./Bless.css";

function Bless(): JSX.Element {
    return (
        <div className="Bless">
			      {isMorning()?'Good morning':isAfterNoon()?'Good Afternoon':isEvening()?'Good Evening':'Good Night'}

        </div>
    );
}

function isMorning(): boolean {
    const date = new Date();
    const hour = date.getHours();
    return  hour === 7 || hour === 8|| hour ===9|| hour ===10|| hour ===11|| hour ===12;
  }

  function isAfterNoon(): boolean {
    const date = new Date();
    const hour = date.getHours();
    return hour === 13 ||hour === 14 ||hour === 15 ||hour === 16 || hour === 17 ;
  }

  function isEvening(): boolean {
    const date = new Date();
    const hour = date.getHours();
    return hour === 18 || hour === 19 || hour === 20|| hour ===21|| hour === 22 || hour === 23;
  }




export default Bless;
