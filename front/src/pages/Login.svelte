<script lang="ts">
  import { AxiosError } from "axios";
  import { navigate } from "svelte-routing/src/history";
  import { Button, Input, Message } from "../components";
  import { api } from "../services/instance";
  import { storage } from "../services/localStorage";
  import { token } from "../store/stores";

  let error: string = "";
  let userId: string = "";
  let userPassword: string = "";

  $: {
    if (!userId || !userPassword) {
      error = "";
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!e.currentTarget) {
      return;
    }
    if (!userId || !userPassword) {
      return (error = "아이디 또는 비밀번호를 입력해주세요.");
    }

    try {
      if (userId && userPassword) {
        const loginResponse = await api.post("/auth/login", {
          username: userId,
          password: userPassword,
        });

        if (loginResponse.status === 200) {
          storage.setStorage("token", loginResponse.data.data);
          token.set(storage.getStorage("token"));
          navigate("/");
          return;
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        error = e.response?.data.message;
      }
    }
  }
</script>

<main>
  <h1>오우야 svelte</h1>

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
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
