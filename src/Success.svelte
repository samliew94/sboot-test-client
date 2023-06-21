<script lang="ts">
  import MyButton from "./MyButton.svelte";

    export let show:boolean
</script>

<div
  class="grid grid-cols-1 gap-1 bg-white h-1/3 w-1/4 rounded flex justify-center items-center text-center"
>
  <p class="text-black text-2xl">Success</p>
  <div>
    <MyButton color="green" base={600} onClick={()=>(show=false)} title="OK"/>
  </div>
</div>
