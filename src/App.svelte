<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";

  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import meetups from './Meetups/meetups-store.js';


  let editMode;
  let page = 'overview';
  let pageData = {};
  let editedId = null;
  
  function saveMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function showdetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = 'overview';
       pageData = {};
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail;
  }
  

  function cancelEdit() {
      editMode = null;
      editedId = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
{#if page == 'overview'}
  {#if editMode == 'edit'}
    <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid on:add={editMode = 'edit'} on:edit="{startEdit}" on:showdetails={showdetails} meetups={$meetups} />
  {:else}
  <MeetupDetail on:close={closeDetails} id={pageData.id} />
{/if}
</main>
