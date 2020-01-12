<script>
  import Header from "./UI/Header.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

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
  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      contactEmail: email,
      address
    };
    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    meetups = meetups.map(meetup => {
        if (meetup.id === event.detail) {
          meetup.isFavorite = !meetup.isFavorite;
        }

        return meetup;
    });
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />
<main>
  <form on:submit|preventDefault={addMeetup}>
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
        <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
