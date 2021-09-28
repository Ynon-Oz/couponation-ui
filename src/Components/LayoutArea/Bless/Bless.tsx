import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./Bless.css";

function Bless(): JSX.Element {
  const [user, setUser] = useState("Visitor");
  const unsubscribe = store.subscribe(() =>
    console.log()
  )

  useEffect(() => {
    //didMount
    store.subscribe(() => { setUser(store.getState().loginAppState.loggedIn != null ? store.getState().loginAppState.loggedIn.name : "Visitor") })
    return () => {
      //unMount
      unsubscribe();
    };
  });

  return (
    <div className="Bless">
      {isMorning() ? 'Good morning' : isAfterNoon() ? 'Good Afternoon' : isEvening() ? 'Good Evening' : 'Good Night'} {user}

    </div>
  );
}

function isMorning(): boolean {
  const date = new Date();
  const hour = date.getHours();
  return hour === 6 || hour === 7 || hour === 8 || hour === 9 || hour === 10 || hour === 11;
}

function isAfterNoon(): boolean {
  const date = new Date();
  const hour = date.getHours();
  return hour === 12 || hour === 13 || hour === 14 || hour === 15 || hour === 16 || hour === 17;
}

function isEvening(): boolean {
  const date = new Date();
  const hour = date.getHours();
  return hour === 18 || hour === 19 || hour === 20 || hour === 21 || hour === 22 || hour === 23;
}




export default Bless;
