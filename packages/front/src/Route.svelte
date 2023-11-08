<script type="ts">
  import { Route, Router } from "svelte-routing";
  import { navigate } from "svelte-routing/src/history";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import { token } from "./store/stores";

  $: isAuthenticated = $token;
  $: {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  export let url = "";
</script>

<Router {url}>
  <div>
    {#if isAuthenticated}
      <Route path="/" component={Home} />
    {/if}

    <Route path="/login" component={Login} />
  </div>
</Router>

<style>
</style>
