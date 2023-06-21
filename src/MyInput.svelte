<script lang="ts">
  export let name: string;
  export let title: string;
  export let inputFields: any;
  export let limit: number;
  export let required: boolean = false;
  export let isTextArea: boolean = false;
  export let disabled:boolean = false;

  function onInputChanged(event) {
    let value = event.target.value;
    let name = event.target.name;
    // console.log(`${name}=${value}`);

    if (value.length > limit) {
      inputFields[name] = value.slice(0, -1);
    }
  }
</script>

<div class="grid grid-cols-4 gap-1 flex justify-center items-center">
  <p class="col-span-1">
    {title}: {#if required}
      <span class="text-red-500">*</span>
    {:else}
      <span />
    {/if}
  </p>

  {#if isTextArea}
    <textarea
      class="col-span-3 border border-gray-500 p-2 rounded h-36"
      {name}
      bind:value={inputFields[name]}
      on:input={(e) => onInputChanged(e)}
    />
  {:else}
    <input
        disabled={disabled}
      class="col-span-3 border border-gray-500 p-2 rounded {disabled ? "bg-gray-300" : ''}"
      {name}
      bind:value={inputFields[name]}
      on:input={(e) => onInputChanged(e)}
    />
  {/if}

  <!-- {#if inputFields["error"] && inputFields["error"][name] && inputFields["error"][name].length > 0}
    <p class="text-red-500 text-sm italic">error at {name}</p>
  {/if} -->
</div>
