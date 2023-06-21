<script lang="ts">
  import Config from "./Config";
  import MyInput from "./MyInput.svelte";

  export let show: boolean;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();


  let inputFields = {
    name: "",
    code: "",
    category: "",
    brand: "",
    type: "",
    description: "",
  };

  let errors:Array<string> = []

  async function onSave() {
    const uri = `${Config.origin}/api/products`;

    const res = await fetch(uri, {
      method: "POST",
      body: JSON.stringify({
        name: inputFields["name"],
        code: inputFields["code"],
        category: inputFields["category"],
        brand: inputFields["brand"],
        type: inputFields["type"],
        description: inputFields["description"],
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.status !== 200){
        const data = await res.json();
        errors = data['errors'];
        console.log(errors);
        return
    }

    if (res.status === 200){
        // show = false;
        dispatch('success', {})
    }


  }


</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="p-4 rounded-xl bg-white border border-black border-2 border-gray-500">
    <p class="text-2xl mb-2">Create New Product</p>
    <div class="grid grid-cols-1 gap-1 flex justify-center items-center">
    
    {#each errors as error}
        <p class='text-red-500 text-sm italic'>{error}</p>
    {/each}
    <MyInput inputFields={inputFields} name="code" limit={9} title="Code" required={true}/>
    <MyInput inputFields={inputFields} name="name" limit={90} title="Name" required={true}/>
    <MyInput inputFields={inputFields} name="category" limit={28} title="Category" required={true}/>
    <MyInput inputFields={inputFields} name="brand" limit={28} title="Brand"/>
    <MyInput inputFields={inputFields} name="type" limit={21} title="Type" />
    <MyInput inputFields={inputFields} name="description" limit={180} title="Description" isTextArea={true}/>
     
    </div>
    <div class="text-center text-white m-2">
      <button on:click={onSave} class="bg-blue-500 rounded px-4 py-1"
        >Save</button
      >
      <button
        class="bg-red-500 rounded px-4 py-1"
        on:click={() => (show = false)}>Cancel</button
      >
    </div>
  </div>
{/if}
