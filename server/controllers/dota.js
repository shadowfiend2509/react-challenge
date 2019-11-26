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
  },
  getRadiantWinRate (req, res, next) {
    const id = req.params.id;
    axios({
      method: 'get',
      url: `/heroes/${id}/matches`
    })
      .then(({data}) => {
        let direWin = 0
        let kill = 0
        let death = 0
        let assist = 0
        data.forEach((el, i) => {
          if(!el.radiant_win) {
            direWin++
            kill += el.kills
            death += el.deaths
            assist += el.assists
          }
        })
        setTimeout(() => {
          let mathKill = (kill/direWin).toFixed(2)
          let mathDeath = (death/direWin).toFixed(2)
          let mathAssist = (assist/direWin).toFixed(2)
          let mathWinRate = ((direWin/data.length)*100).toFixed(2)
          res.status(200).json({winRate: mathWinRate, kill: mathKill, death: mathDeath, assist: mathAssist})
        }, 2000);
      })
      .catch(next)
  },
  getAllRole (req, res, next) {
    axios({
      method: 'get',
      url: '/heroStats'
    })
      .then(({data}) => {
        let tempRole = [];
        data.forEach((el, i) => {
          el.roles.forEach((role, j) => {
            if(tempRole.length == 0) {
              tempRole.push(role)
            } else {
              var counter = 0;
              tempRole.forEach((temp, l) => {
                if(temp == role) {
                  counter++
                }
              })
            }
            if(counter == 0) {
              tempRole.push(role)
            }
          })
        })

        res.status(200).json({role: tempRole})
      })
      .catch(next)
  },
  getDireWinRate (req, res, next) {
    const id = req.params.id;
    axios({
      method: 'get',
      url: `/heroes/${id}/matches`
    })
      .then(({data}) => {
        let radiantWin = 0
        let kill = 0
        let death = 0
        let assist = 0
        data.forEach((el, i) => {
          if(el.radiant_win) {
            radiantWin++
            kill += el.kills
            death += el.deaths
            assist += el.assists
          }
        })
        setTimeout(() => {
          let mathKill = (kill/radiantWin).toFixed(2)
          let mathDeath = (death/radiantWin).toFixed(2)
          let mathAssist = (assist/radiantWin).toFixed(2)
          let mathWinRate = ((radiantWin/data.length)*100).toFixed(2)
          res.status(200).json({winRate: mathWinRate, kill: mathKill, death: mathDeath, assist: mathAssist})
        }, 2000);
      })
      .catch(next)
  },
  getByRoleHeroes (req, res, next) {
    const role = req.params.role;
    axios({
      method: 'get',
      url: '/heroStats'
    })
      .then(({data}) => {
        let tempHero = []
        data.forEach((el, i) => {
          el.roles.forEach((tag, j) => {
            if(tag == role) tempHero.push(el.id)
          })
        })
        res.status(200).json({hero: tempHero})
      })
      .catch(next)
  }
}