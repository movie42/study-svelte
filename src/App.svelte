<script lang="ts">
  let userInfo: { id: string; password: string } = { id: '', password: '' };
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!e.currentTarget) {
      return;
    }
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const obj = Object.fromEntries(formData) as { id: string; password: string };
    userInfo = obj;
  }
</script>

<main>
  <h1>오우야 svelte</h1>
  <div class="input-container">
    {#if userInfo.id && userInfo.password}
      <h2>{userInfo.id}</h2>
      <h2>{userInfo.password}</h2>
    {/if}
  </div>

  <form on:submit={handleSubmit}>
    <div class="form-item-container">
      <label for="id">아이디</label>
      <input id="id" type="text" name="id" />
    </div>
    <div class="form-item-container">
      <label for="password">비밀번호</label>
      <input type="password" name="password" />
    </div>

    <button>로그인</button>
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

  form > div.form-item-container {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 8px;
  }
  form > div.form-item-container > label {
    text-align: left;
    width: 100%;
  }
</style>
