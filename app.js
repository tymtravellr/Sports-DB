

const spinner = display => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = display;
}

const allPlayers = () => {
    document.getElementById('player-container').innerHTML = '';
    const searchValue = document.getElementById('search-box').value;
    document.getElementById('search-box').value = '';
    spinner('block');

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => displayPlayer(data.player))
};

const displayPlayer = players => {
    const playerContainer = document.getElementById('player-container');
    players?.forEach(player => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5 m-3">
        <div class="pro-pic">
          <img class="w-25" src="${player.strThumb}" alt="" />
        </div>
        <h2>Name: ${player.strPlayer}</h2>
        <h5>Country: ${player.strNationality}</h5>
        <div class="allbutton">
          <button class="btn btn-danger">Delete</button>
          <button class="btn btn-success" onclick="details('${player.idPlayer}')">Details</button>
        </div>
      </div>
        `;
        spinner('none');
        playerContainer.appendChild(div);
    });
    console.log(players);
}

const details = playerId => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showDetail(data.players[0]))
}

const showDetail = player => {
   const detailContainer = document.getElementById('player-detail');
   const div = document.createElement('div');
   div.classList.add('w-100','mx-auto')
   div.innerHTML = `
   <div class="card mx-auto " style="width: 18rem">
   <img src="${player.strThumb}" class="card-img-top" alt="..." />
   <div class="card-body">
   <h2>Name: ${player.strPlayer}</h2>
   <p>Date-Of-Birth: ${player.dateBorn}</p>
   <p>Signing Date: ${player.dateSigned}</p>
   <p>Height: ${player.strHeight}</p>
   <p>Position: ${player.strPosition}</p>
     <p class="card-text">
  
     </p>
   </div>
 </div>
   `;
   detailContainer.appendChild(div);
}
