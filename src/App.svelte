<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";

  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from './Meetups/EditMeetup.svelte';
  let editMode;
  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      imageUrl:
        "https://makeawebsitehub.com/wp-content/uploads/2016/02/learn-code-e1455713167295.jpg",
      description:
        "In this meetup, we will have some experts that teach how to code.",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will swim some rounds!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Butterfly-9318.jpg/2560px-40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Butterfly-9318.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false
    }
  ];
  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      ...event.detail
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function toggleFavorite(event) {
    meetups = meetups.map(meetup => {
        if (meetup.id === event.detail) {
          meetup.isFavorite = !meetup.isFavorite;
        }

        return meetup;
    });
  }

  function cancelEdit() {
      editMode = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click="{() => editMode = 'add'}" >New Meetup</Button>
  </div>
  {#if editMode == 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
