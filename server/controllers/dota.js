const axios = require('../apis/dotaApis');


module.exports = {
  getLive (req, res, next) {
    let randomLive = []
    let dotaLive = [];
    axios({
      method: 'get',
      url: 'live'
    })
      .then(({data}) => {
        for(let i=0; i<1; i++) {
          let random = Math.floor(Math.random() * data.length)
          randomLive.push(data[random])
        }
        randomLive.forEach((el, i) => {
          dotaLive.push({
            spectators: el.spectators,
            radiantScore: el.radiant_score,
            direScore: el.dire_score,
            avg_mmr: el.average_mmr,
            players: el.players
          })
        })
        setTimeout(() => {
          res.status(200).json({ liveGame : dotaLive })
        }, 2000);
      })
      .catch(next);
  },
  getAccountId (req, res, next) {
    const id = req.params.id
    axios({
      method: 'get',
      url: `/players/${id}`
    })
      .then(({data}) => {
        res.status(200).json({
          solo: data.solo_competitive_rank,
          party: data.competitive_rank,
          profile: data.profile
        })
      })
      .catch(next)
  },
  getHeroStats (req, res, next) {
    const id = req.params.id;
    axios({
      method: 'get',
      url: '/heroStats'
    })
      .then(({data}) => {
        let temp 
        data.forEach((el, i) => {
          if(el.id == id) temp = el
        })
        res.status(200).json({hero: temp})
      })
      .catch(next)
  }
}