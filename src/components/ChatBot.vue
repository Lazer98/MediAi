
<template>
  <v-row align="center" justify="center">
    <!-- <v-card height="300" width="250"> -->
    <v-img lazy-src="../assets/chat-bot.png" max-height="630" max-width="1000" src="../assets/chat-bot.png"></v-img>
    <v-row justify="center">
      <v-btn color="error" class="btn" @click="overlay = !overlay">
        Chat with me!
      </v-btn>

      <v-overlay :value="overlay">
        <section class="chat-box ">
          <div class="chat-box-list-container " ref="chatbox">
            <ul class="chat-box-list">
              <li class="message" v-for="(message, idx) in messages" :key="idx" :class="message.author">
                <p>
                  <span>{{ message.text }}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="chat-inputs">
            <input type="text" v-model="message" @keyup.enter="sendMessage()" />
            <v-btn color="error" class="mr-4" @click="sendMessage()">Send</v-btn>
          </div>

        </section>

        <!-- closing button -->
        <v-btn color="success" @click="overlay = false">
          Hide Overlay
        </v-btn>
      </v-overlay>
    </v-row>
    <!-- </v-card> -->
  </v-row>
</template>
<script>
import repliesJson from '../replies.json'
import { mapGetters } from 'vuex'

export default {

  name: "new-vue",
  data() {
    return {
      dialog: false,
      message: '',
      messages: [],
      replies: repliesJson.intents,
      reply: '',
      showWindow: false,
      overlay: false,
      finalDiagnoseToSendToAi: [],
      //rootes in the tree : 7 
      root: "-1",
      rootLevel: 1
    }
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    ...mapGetters(['getName', 'getAge', 'getEmail', 'getNationality'])
  },
  methods: {
    findtheRightAnswer(message, replies) {
      var found = false
      var i, j
      for (i = 0; i < replies.length; i++) {
        if (replies[i].tag === this.root) {

          for (j = 0; j < replies[i].patterns.length; j++) {
            if (message.toLowerCase() === replies[i].patterns[j].toLowerCase()) {
              this.reply = replies[i].responses[Math.floor(Math.random() * replies[i].responses.length)]
              found = true
            }
          }
      }
    }
      if (found == false) {
        this.reply = "Sorry ,I didn't understand..."
      }
    },

    sendMessage() {
      const message = this.message
      this.messages.push({
        text: message,
        author: 'client'
      })
      this.message = ''
      // this.$axios.get(`https://www.cleverbot.com/getreply?key=CC8uqcCcSO3VsRFvp5-uW5Nxvow&input=${message}`)

      this.findtheRightAnswer(message, this.replies)
      this.messages.push({
        text: this.reply,
        author: 'server'
      })
      this.$nextTick(() => {
        this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
      })
      if (message === "orthopedia") {
        this.root = "0.";

      }
      if (message === "neurologia") {
        this.root = "1.";

      }
      if (message === "nose,neck,ears") {
        this.root = "2.";

      }
      if (message === "digest") {
        this.root = "3.";

      }
      if (message === "eyes") {
        this.root = "4.";

      }
      if (message === "sexual organ") {
        this.root = "5.";

      }
      if (message === "other") {
        this.root = "6.";

      }
      if(this.reply === "Do you have any other complaints?"){
        this.rootLevel = 1;
        this.root = "ReturnToTheBeginning";
      }
      else if(this.root === "ReturnToTheBeginning" && this.reply === "..."){
        this.welcome();
        this.root = "-1";
      }
      else if(this.root === "ReturnToTheBeginning" && this.reply === "Feel better soon!"){
        //  CLOSE THE PROGRAM 
        this.overlay = false;
      }
      else if(this.root !== "-1" &&  this.reply !== "Sorry ,I didn't understand..."){
        this.rootLevel++;
        let newString= this.root[0];
        let point=".";
        this.root = newString;
        this.root = this.root.concat(point.toString());
        this.root = this.root.concat(this.rootLevel.toString());
      }

    },
    welcome() {
      this.messages.push({
        text: "Welcome " + this.getName + " ,Please choose the symptoms fitting your state:",
        author: 'server'
      })
      this.messages.push({
        text: "orthopedia ;neurologia ;"
          + "nose,hals,ears ;verdauung ;eyes ;geschlechtsorgan ;other",
        author: 'server'
      })
    },
    minimize() {
      this.showWindow = false;
    },
    maximize() {
      this.showWindow = true;
    }
  },
  beforeMount() {
    this.welcome()
  },
}
</script>

<style scoped lang="scss">
.image {
  height: 150px;
  background-repeat: no-repeat;
}

.chat-box {
  background-color: antiquewhite;
}

.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
  width: 100%;
  height: 80%;
}

.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;

  li.message {
    margin: 10px 0;
  }

  span {
    padding: 8px;
    color: white;
    border-radius: 4px;
  }

  .server {
    span {
      background: #99cc00;
    }

    p {
      float: right;
    }
  }

  .client {
    span {
      background: #0070C8;
    }

    p {
      float: left;

    }
  }
}

.chat-box {
  margin: 10px;
  border: 1px solid #999;
  width: 50vw;
  height: 50vh;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}

.btn {
  border: 1px solid #E1E8EE;
  width: 30px;
  background-color: #E1E8EE;
  /*   border-radius: 6px; */
  cursor: pointer;
}

.chat-inputs {
  display: flex;

  input {
    line-height: 3;
    width: 100%;
    border: 1px solid #999;
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }

  v-btn {
    width: 145px;
    color: white;
    background: #0070C8;
    border-color: #999;
    border-bottom: none;
    border-right: none;
    border-bottom-right-radius: 3px;
  }
}
</style>