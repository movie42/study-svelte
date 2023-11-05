<script lang="ts">
  import { Button, Input, Message } from "./components";

  let error: string = "";
  let userId: string = "";
  let userPassword: string = "";
  let isLogin: boolean = false;

  $: if (!userId || !userPassword) {
    error = "";
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!e.currentTarget) {
      return;
    }
    if (!userId || !userPassword) {
      return (error = "아이디 또는 비밀번호를 입력해주세요.");
    }

    if (userId && userPassword) {
      isLogin = true;
    }
  }
</script>

<main>
  <h1>오우야 svelte</h1>
  <div class="input-container">
    {#if (userId || userPassword) && !isLogin}
      <h2>{userId}</h2>
      <h2>{userPassword}</h2>
    {/if}
    {#if isLogin}
      <h2>로그인 되었어용!😅</h2>
    {/if}
  </div>

  <form on:submit={handleSubmit}>
    <Input
      label="아이디"
      htmlFor="id"
      bind:inputValue={userId}
      inputProps={{ id: "id", type: "text", name: "id" }}
    />
    <Input
      label="비밀번호"
      htmlFor="password"
      bind:inputValue={userPassword}
      inputProps={{ id: "password", type: "password", name: "password" }}
    />
    <Message message={error} />
    <Button>로그인</Button>
  </form>
</main>

<style>
  h1 {
    margin: 0;
  }
  div.input-container {
    display: flex;
    gap: 10px;
  }
  div.input-container > h2 {
    font-size: 12px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
