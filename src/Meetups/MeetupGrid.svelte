<script>
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from './MeetupFilter.svelte';
  import Button from '../UI/Button.svelte';
    import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
  export let meetups;
  let favsOnly = false;
  function setFilter(event) {
    favsOnly = event.detail === 1;
  }

  $: filteredMeetups = favsOnly ? meetups.filter(meetup => meetup.isFavorite) : meetups;

</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
<MeetupFilter on:select={setFilter} />
    <Button on:click="{() => dispatch('add')}" >New Meetup</Button>

</section>
<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id) }
    <MeetupItem
      on:edit
      isFavorite={meetup.isFavorite}
      id={meetup.id}
      title={meetup.title}
      on:showdetails
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      address={meetup.address}
      email={meetup.contactEmail}
      description={meetup.description} />
  {/each}
</section>
