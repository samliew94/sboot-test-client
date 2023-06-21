<script lang="ts">
    export let show: boolean; // boolean
  </script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if show}
    <!-- <div on:click={()=>(show=false)} -->
    <div
      
      class="bg-black/75 flex justify-center items-center fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    >
    <div class='bg-transparent h-5/6 w-full mx-4 rounded-xl flex justify-center items-center'>
      <slot/>
    </div>
  </div>
  {/if}