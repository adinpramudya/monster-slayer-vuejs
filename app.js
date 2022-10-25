function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      healthMonster: 100,
      healthPlayer: 100,
      currentRound: 0,
      winner: null,
      addBattleLog: [],
    };
  },
  computed: {
    monsterBarHealth() {
      if (this.healthMonster < 0) {
        return { width: "0%" };
      }
      return { width: this.healthMonster + "%" };
    },
    playerBarHealth() {
      if (this.healthPlayer < 0) {
        return { width: "0%" };
      }
      return { width: this.healthPlayer + "%" };
    },
    mayUseSpecial() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    healthMonster(value) {
      if (value <= 0 && this.healthPlayer <= 0) {
        //draw

        this.winner = "draw";
      } else if (value <= 0) {
        //won player
        this.winner = "player";
      }
    },
    healthPlayer(value) {
      if (value <= 0 && this.healthMonster <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //won player
        this.winner = "monster";
      }
    },
  },
  methods: {
    newGame() {
      this.healthMonster = 100;
      this.healthPlayer = 100;
      this.currentRound = 0;
      this.winner = null;
      this.addBattleLog = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.healthMonster -= attackValue;
      this.attackPlayer();
      this.showBattleLog("player", "attack", attackValue);
    },
    attackPlayer() {
      this.currentRound++;
      const attackValue = getRandomValue(8, 15);
      this.healthPlayer -= attackValue;
      this.showBattleLog("monster", "attack", attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.healthMonster -= attackValue;
      this.showBattleLog("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      this.healthPlayer += healValue;
      if (this.healthPlayer + healValue > 100) {
        this.healthPlayer = 100;
      }
      this.showBattleLog("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    showBattleLog(who, what, value) {
      this.addBattleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
