<script lang="ts">
  export let message = "";
</script>

<div>
  {#if message}
    {message}
  {/if}
</div>

<style>
  div {
    min-height: 15px;
    color: red;
  }
</style>
