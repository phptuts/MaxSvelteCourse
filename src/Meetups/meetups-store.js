import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 2 hours',
    imageUrl:
      'https://makeawebsitehub.com/wp-content/uploads/2016/02/learn-code-e1455713167295.jpg',
    description:
      'In this meetup, we will have some experts that teach how to code.',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'code@test.com',
    isFavorite: false
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: "Let's go for some swimming",
    description: 'We will swim some rounds!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Butterfly-9318.jpg/2560px-40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Butterfly-9318.jpg',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'swim@test.com',
    isFavorite: false
  }
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  add: (meetupData) => {
    meetups.update((items) => {
      meetupData.id = Math.random();
      meetupData.isFavorite = false;
      return [meetupData, ...items];
    });
  },
  updateMeedup: (id, editedMeetup) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((item) => item.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...editedMeetup };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup(id) {
    meetups.update((items) => {
      return items.filter((item) => item.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update((meetups) => {
      return meetups.map((meetup) => {
        if (meetup.id === id) {
          meetup.isFavorite = !meetup.isFavorite;
        }
        return meetup;
      });
    });
  }
};

export default customMeetupsStore;
