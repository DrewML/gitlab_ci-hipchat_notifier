# Gitlab CI Hipchat Notifier

Sends Success/Failure messages to a Hipchat room for a specific Gitlab CI project.

## Install

1. Ensure you have a version of `node.js` >= 4.0.0
2. Clone the repository
3. Run `npm install` in the root of the repo

## Configure Hipchat

1. Login to Hipchat.com, and go to the `Rooms` section
2. Select a room you are an owner of, and click on the `Tokens` tab
3. Provide a label for your key, and choose the `Send Notification` scope
4. Copy the token somewhere (you'll need it shortly), as well as the room ID in the URL of the page

## Configure Notifier

1. Open `config.js` in this repo
2. Add a new key/value entry, where the key is the Hipchat room ID, and the value is the Hipchat token (or an env var referencing the token)

## Configure Gitlab

1. Make sure you have already configured the notifier, as well as the Hipchat room API token
2. Start the Notifier plugin in this repo by running `PORT=8080 npm start`
3. In your Gitlab project settings, click on `CI Web Hooks`
4. Add a new hook, following the format below (replace the values in {} with your own):
```
http://{PublicIPHere}:8080/ci/{RoomIDHere}
```
5. If you've followed all the steps outlined above, your notifier should now be working
