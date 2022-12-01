import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [olahdata, setOlahdata] = useState({})
  const [pertandinganSaatIni, setPertandinganSaatIni] = useState([])
  const [printLive, setPrintLive] = useState(false)


  useEffect(() => {
    const getData = async() => {
      let res = await fetch('https://worldcupjson.net/matches/?by_date=ASC')
      let values = await res.json();
      let next = []
      let complated = []
      let live = []
      values.forEach(function(value) {
        if(value.status === 'completed') {
          complated.push(value)
        } else if (value.status === 'future_scheduled') {
          next.push(value)
        } else if (value.status === 'in_progress') {
          live.push(value)
        }
      });

      let match = live.length > 1 ? live.at(live.length - 1) : complated.at(-1)
      let data = {
        'next': next,
        'complated': complated,
        'live': live,
        'match': match,
      }
      setOlahdata(data)
      setPrintLive(true)
    }
    getData()
  }, [])

  useEffect(() => {
    if(printLive) {
      let data = []
      data.push(
        <div class='card-pertandingan' style={{border: '1px solid black', borderRadius: "5px", maxWidth: "300px", margin: 'auto', padding: '10px'}}>
      <div class='card-pertandingan--title'>pertandingan saat ini</div>
      <div style={{display: "flex", justifyContent: "center", gap: "20px", paddingTop: "15px"}}>
      <div>
        <div class='away-team'>{olahdata.match.away_team.name}</div>
      </div>
      <div class='score'>
        <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
          <div>{olahdata.match.away_team.goals}</div>
          <div>:</div>
          <div>{olahdata.match.home_team.goals}</div>
        </div>
        <div style={{paddingTop: '10px'}}>{olahdata.match.winner} {olahdata.match.winner !== 'Draw' && null ? 'Win' : ''}</div>
      </div>

      <div>
        <div class='home-team'>{olahdata.match.home_team.name}</div>
      </div>
      </div>
     </div>
      )

      setPertandinganSaatIni(data)
      setPrintLive(false)
    }
  }, [printLive])
  
  return (
    <div className="App">
     <h1>PERTANDINGAN PIALA DUNIA 2022</h1>
     <p>Kamu bisa menyimak skor pertandingan pialadunia dari hp kamu.</p>
      {pertandinganSaatIni}
     
    </div>
  );
}

export default App;
