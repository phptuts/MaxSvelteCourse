<script>
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  import meetups from './meetups-store.js';


  import { createEventDispatcher } from 'svelte';
  export let id = null;

  
  

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
        const selectedMeetup = items.find(item => item.id === id);
        title = selectedMeetup.title;
        subtitle = selectedMeetup.subtitle;
        address = selectedMeetup.address;
        email = selectedMeetup.contactEmail;
        description = selectedMeetup.description;
        imageUrl = selectedMeetup.imageUrl;
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher()

    function submitForm() {
      const newMeetup = {
          title,
          subtitle,
          address, 
          email,
          description,
          imageUrl
      };
      if (id) {
        meetups.updateMeedup(id, newMeetup);
      } else {
        meetups.add(newMeetup);
      }

      dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }

    function deleteMeetup() {
        meetups.removeMeetup(id);
        dispatch('save');
    }

</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Sub Title"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />

    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />

    <TextInput
      id="imageUrl"
      label="Image Url"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />

    <TextInput
      id="email"
      label="Email"
      value={email}
      on:input={event => (email = event.target.value)} />

    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      value={description}
      on:input={event => (description = event.target.value)} />
      
  </form>
<div slot="footer" >
              <Button type="button" mode="outline" on:click={cancel}  >Cancel</Button>

              <Button type="button" on:click={submitForm}  >Save</Button>
              {#if id}
                <Button type="button" on:click={deleteMeetup}>Delete</Button>
              {/if}
      </div>
</Modal>
