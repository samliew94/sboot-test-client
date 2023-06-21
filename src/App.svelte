<script lang="ts">
  import { onMount } from "svelte";
  import Config from "./Config";
  import MainModal from "./MainModal.svelte";
  import CreateProduct from "./CreateProduct.svelte";
  import EditProduct from "./EditProduct.svelte";
  import Success from "./Success.svelte";
  import MyButton from "./MyButton.svelte";

  let page: number = 1;
  let max: number = 10;
  let data: any;
  let showModal: boolean = false;
  let showModalCode: string = "";
  let selectedProductCode: string;

  const maxResults: number[] = [];
  for (let i = 10; i <= 25; i++) {
    maxResults.push(i);
  }

  async function findAllProducts(newPage: number) {
    const uri = `${Config.origin}/api/products?page=${newPage}&max=${max}`;

    const res = await fetch(uri);

    data = await res.json();
    page = data["page"] + 1;
    console.log(`new page is ${page}`);

    max = data["max"];
  }

  async function onFirst() {
    findAllProducts(1);
  }

  async function onPrev() {
    findAllProducts(page - 1);
  }

  async function onNext() {
    findAllProducts(page + 1);
  }

  async function onLast() {
    const uri = `${Config.origin}/api/products/last?max=${max}`;

    const res = await fetch(uri);

    data = await res.json();
    page = data["page"] + 1;
    max = data["max"];
  }

  function onSelected() {
    findAllProducts(page);
  }

  function onCreateProduct() {
    showModal = true;
    showModalCode = "create";
  }

  function onEditProduct(code: string) {
    selectedProductCode = code;
    showModal = true;
    showModalCode = "edit";
  }

  function handleSuccess(event): void {
    showModalCode = "success";
    findAllProducts(page);
  }

  onMount(() => findAllProducts(page));
</script>

<MainModal bind:show={showModal}>
  {#if showModalCode === "create"}
    <CreateProduct bind:show={showModal} on:success={handleSuccess} />
  {:else if showModalCode === "edit"}
    <EditProduct
      bind:show={showModal}
      bind:productCode={selectedProductCode}
      on:success={handleSuccess}
    />
  {:else if showModalCode === "success"}
    <Success bind:show={showModal} />
  {/if}
</MainModal>

<main class="">
  <div class="p-10 ">
    <div class="border border-black rounded-xl p-4">
      <p>Developed by Sam Liew for Fourtitude Asia Spring Boot Test</p>
      <p>Frontend: <span class='font-bold'>Svelte-TS, TailwindCSS</span> </p>
      <p>Backend: <span class='font-bold'>Java 17, Spring Boot 3.1.0</span></p>
      <p class='italic'>Misc: <span class='font-bold'>H2(db), Hibernate, Lombok, JpaRepository</span></p>
      
      <p class="text-4xl font-bold">Products</p>
      <div class="mb-2 text-right">
        <button
          on:click={onCreateProduct}
          class="bg-green-600 text-white p-2 border rounded-lg hover:bg-green-800 active:bg-green-900"
          >Create New Product</button
        >
        <span class="text-right">
          <span>Max Results: </span>
          <select
            bind:value={max}
            on:change={onSelected}
            class="border border-black rounded p-1"
          >
            {#each maxResults as value}
              <option {value}>
                {value}
              </option>
            {/each}
          </select>
        </span>
      </div>
      <div class="text-center text-white mb-4">
        <MyButton onClick={onFirst} color="blue" title="First" />
        <MyButton onClick={onPrev} color="blue" title="Previous" />
        <span class="text-gray-800">Page {page}</span>
        <MyButton onClick={onNext} color="green" base={600} title="Next" />
        <MyButton onClick={onLast} color="green" base={600} title="Last" />
      </div>
      <div class="text-center ">
        <div class="grid grid-cols-11 gap-0 border border-gray-300 ">
          <div class="font-bold text-white text-lg bg-orange-500 py-2">No. </div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Code</div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2 col-span-2">
            Name
          </div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Category</div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Brand</div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Type</div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2 col-span-2">
            Description
          </div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Created At</div>
          <div class="font-bold text-white text-lg bg-orange-500 py-2">Updated At</div>
          {#if data && data["products"]}
            {#each data["products"] as product, i}
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {i + 1}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                <button
                  class="text-white px-4 py-2 border rounded-lg bg-purple-500 hover:bg-purple-600 active:bg-purple-800"
                  on:click={() => onEditProduct(product["code"])}
                  >{product["code"]}</button
                >
              </div>
              <div class="border col-span-2 {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["name"]}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["category"]}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["brand"]}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["type"] ? product["type"] : "-"}
              </div>
              <div class="border col-span-2 {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["description"]}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["createdAt"]}
              </div>
              <div class="border {i % 2 == 0 ? 'bg-zinc-100' : ''}">
                {product["updatedAt"]}
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <div class="text-center text-white mt-4">
        <MyButton onClick={onFirst} color="blue" title="First" />
        <MyButton onClick={onPrev} color="blue" title="Previous" />
        <span class="text-gray-800">Page {page}</span>
        <MyButton onClick={onNext} color="green" base={600} title="Next" />
        <MyButton onClick={onLast} color="green" base={600} title="Last" />
      </div>
    </div>
  </div>
</main>
