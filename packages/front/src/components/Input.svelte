<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type InputProps = HTMLInputAttributes;

  export let htmlFor: string;
  export let inputValue: string;
  export let label: string;
  export let inputProps: InputProps;
</script>

<div class="form-item-container">
  <label for={htmlFor}>{label}</label>
  <input bind:value={inputValue} {...inputProps} />
</div>

<style>
  div.form-item-container {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 8px;
  }
  label {
    text-align: left;
    width: 100%;
  }
</style>
