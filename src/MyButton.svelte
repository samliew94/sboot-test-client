<script lang="ts">
  export let color: string;
  export let onClick: any;
  export let title: string;
  export let base:number = 500;

  let stringColor: string;

  $: {
    // if (color === "red")
    //   stringColor = "bg-red-500 hover:bg-red-600 active:bg-red-800";
    // else if (color == "blue")
    //   stringColor = "bg-blue-500 hover:bg-blue-600 active:bg-blue-800";
    //   else if (color == "green")
    //   stringColor = "bg-green-500 hover:bg-green-600 active:bg-green-800";
    //   else if (color == "purple")
    //   stringColor = "bg-purple-500 hover:bg-purple-600 active:bg-purple-800";
    //   else if (color == "purple")
    //   stringColor = "bg-purple-500 hover:bg-purple-600 active:bg-purple-800";
    stringColor = `bg-${color}-${base} hover:bg-${color}-${base+100} active:bg-${color}-${base+300}`
  }
</script>

<button on:click={onClick} class="py-2 px-4 rounded text-white {stringColor}">
  {title}
</button>
