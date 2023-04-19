<template>
  <main class="mini-messenger">
    <ul class="messages">
      <li v-for="message in messages" :key="message.id" ref="items" class="message">
        {{ message.text }}
      </li>
    </ul>
    <form @submit.prevent="handleSendSubmit">
      <div class="input-group">
        <input v-model="newMessage" type="text" class="form-control messenger__input" placeholder="New message" />
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';

let lastId = 0;

export default defineComponent({
  name: 'MiniMessenger',

  data() {
    return {
      newMessage: '',
      messages: [
        { id: lastId++, text: 'First message' },
        { id: lastId++, text: 'Second message' },
        { id: lastId++, text: 'Third message' },
        { id: lastId++, text: 'Forth message' },
      ],
    };
  },

  methods: {
    handleSendSubmit() {
      this.send();
    },

    send() {
      this.messages.push({
        id: lastId++,
        text: this.newMessage,
      });
      this.newMessage = '';
    },
  },

  computed: {
    list(): HTMLElement {
      return this.$refs.items[0]?.parentElement;
    },
  },

  async updated() {
    if (!this.list) {
      return;
    }

    await nextTick();

    this.list.scrollTop = this.list.scrollHeight;
  },
});
</script>

<style scoped>
.mini-messenger {
  border: 4px solid var(--blue-light);
  width: 250px;
  background-color: var(--white);
}

.messages {
  padding: 0 1rem;
  margin: 0;
  list-style: none;
  height: 300px;
  overflow: auto;
}

.message {
  background-color: var(--grey);
  margin: 1rem 0 1rem auto;
  padding: 0.5rem;
  width: 80%;
  word-break: break-all;
}

.messenger__input {
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-radius: 0;
}
</style>
