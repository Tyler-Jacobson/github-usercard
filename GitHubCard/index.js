/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from 'axios'



/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell']

followersArray.forEach(function(item) {
  axios.get(`https://api.github.com/users/${item}`)
  .then(res =>{
    const cards = document.querySelector('.cards')
    cards.appendChild(createProfile(res.data))
  })

  .catch(err => {
    console.log(err)
  })
})

const myFollowers = []



axios.get(`https://api.github.com/users/tyler-jacobson/followers`)
  .then(res => {
    const cards2 = document.querySelector('.cards')
    res.data.forEach(function(item) {
      const friendName = item.login
      axios.get(`https://api.github.com/users/${friendName}`)
        .then(res => {
          cards2.appendChild(createProfile(res.data))
        })
        .catch(err => {
          console.log(err)
        })
  })
  .catch(err => {
    console.log(err)
  })
})


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

           
function createProfile(inputObject) {

  const card = document.createElement('div')
  const image = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const userName = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const githubLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')


  
  card.appendChild(image)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  profile.appendChild(githubLink)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  card.classList.add('card')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  userName.classList.add('username')
  
  image.src = inputObject.avatar_url
  githubLink.href = inputObject.html_url
  name.textContent = inputObject.name
  userName.textContent = inputObject.login
  location.textContent = `Location: ${inputObject.location}`
  profile.textContent = `Profile:`
  githubLink.textContent = inputObject.html_url
  followers.textContent = `Followers: ${inputObject.followers}`
  following.textContent = `Following: ${inputObject.following}`
  bio.textContent = `Bio: ${inputObject.bio}`


  return card
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
