import { useEffect, useState } from "react";
import { apiFetch } from "./helpers/apiFetch";

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    const match = await apiFetch("match/current");
    match.vetos = match.vetos.splice(0, 7);
    const team1 = await apiFetch("teams/" + match.left.id);
    const team2 = await apiFetch("teams/" + match.right.id);
    setData({
      match: match,
      teams: [team1, team2],
    })
    console.log("Data");
    setTimeout(() => getData(), 1000);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="content">
        {data && data.match.vetos.map((veto, i) => {
          if (veto.mapName === "") {
            return (
              <div className="map-card hidden" key={i}></div>
            )
          }
          return (
            <div className={`map-card ${veto.mapName} ${veto.type}`} key={veto.mapName}>
              <div className="map-card-name">{veto.mapName.split("_")[1]}</div>
              <div className="map-card-pickedBy">
                {
                  veto.type !== "decider" ?
                  data.teams.find(team => team._id === veto.teamId).name :
                  "Decider"
                }
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
