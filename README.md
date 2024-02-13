[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/szybkirito/whitelist_manager">
    <img src="https://i.imgur.com/vFROF8D.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">Whitelist Website API</h3>

  <p align="center">
    API created for whitelist website which handles users applications and authentication of users. This also runs the discord bot which sends messages to the users.
    <br />
    <a href="https://github.com/szybkiritowhitelist_manager/whitelist_manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/szybkirito/whitelist_manager/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is designed to automate the process of managing player admissions across various gaming servers. Recognizing the common use of whitelists to ensure an optimal gaming experience, this solution aims to streamline the traditional, often cumbersome methods of using Discord or forums for player approvals. Initially conceived to enhance the experience for FiveM servers, the website versatility allows it to be adapted for use with any game that employs a similar whitelist process. The code is open for customization, enabling users to tailor it according to their specific requirements.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- <a href="https://reactjs.org/">React.js</a>
- <a href="https://www.npmjs.com/package/express/">Express</a>
- <a href="https://jwt.io/">JWT</a>
- <a href="https://swagger.io/">Swagger</a>
- <a href="https://discord.com/developers/docs/intro">Discord.js</a>

## Screenshots

<img src="https://i.imgur.com/Zr8Zjs1.png" alt="website_screenshots">
<img src="https://i.imgur.com/71yBAtY.png" alt ="discord_messages_screenshot">
<!-- GETTING STARTED -->

## Getting Started

Setup Instruction will be given with two main aspects:

- Setup of website
- Setup of API

### Prerequisites

To get this running you have to own a <strong>MySQL</strong> database.

### Installation API

1. Clone the repo
   ```sh
   git clone https://github.com/szybkirito/whitelist_manager.git
   ```
2. Go to the /api directory
   ```sh
   cd ./whitelist_manager/api
   ```
3. Install all of the dependencies
   ```sh
   npm install .
   ```
4. Setup .env file
   JWT_SECRET can be generated through node.js
   `js
require('crypto').randomBytes(64).toString('hex');
`

- Discord
  Following variables can be found in <a href="https://discord.com/developers/applications/">Discord Developer Portal</a>.
  <br>

  ```
  DISCORD_BOT_TOKEN=
  DISCORD_CLIENT_ID=
  DISCORD_CLIENT_SECRET=
  DISCORD_OAUTH_REDIRECT_URI=http://localhost:5173/authorize
  ```

  - <strong>REMEMBER TO ADD CORRECT REDIRECT URL IN DISCORD DEVELOPERPORTAL</strong>
  - If you have in plan to change name of the routes you shouldchange the redirect url here too

5. Setup ./src/constants/config.ts file

   - If you cannot get guild server ID or roles ID you should enable discord developer option

6. Build the project
   ```sh
   npm run build
   ```
   The build will enable you to visit the <strong>localhost:5000/docs</strong> route
7. Start the project
   ```sh
   npm run dev
   ```

### Installation Client

1. Clone the repo
   ```sh
   git clone https://github.com/szybkirito/whitelist_manager.git
   ```
2. Go to the /client directory
   ```sh
   cd ./whitelist_manager/client
   ```
3. Install all of the dependencies
   ```sh
   npm install .
   ```
4. Setup .env file
5. Setup ./src/config.ts file
   - If you cannot get guild server ID or roles ID you should enable discord developer option
6. Build the project
   ```sh
   npm run build
   ```
7. Start the project
   ```sh
   npm run dev
   ```

## Usage

- Important note is that in order it to work the user have to be in the same discord server as your bot
- If you want to visit all of the avaiable request, visit
  `http://localhost:5000/docs`

## Known Issues

Currently there is no method to made a request through swagger because of empty authenticate buttons.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/szybkirito/whitelist_manager?style=for-the-badge
[contributors-url]: https://github.com/szybkirito/whitelist_manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/stars/szybkirito/whitelist_manager?style=for-the-badge
[forks-url]: https://github.com/szybkirito/whitelist_manager/network/members
[stars-shield]: https://img.shields.io/github/stars/szybkirito/whitelist_manager?style=for-the-badge
[stars-url]: https://github.com/szybkirito/whitelist_manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/szybkirito/whitelist_manager.svg?style=for-the-badge
[issues-url]: https://github.com/szybkirito/whitelist_manager/issues
[license-shield]: https://img.shields.io/github/license/szybkirito/whitelist_manager?style=for-the-badge
[license-url]: https://github.com/szybkirito/whitelist_manager/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mateusz-jakubczak-1073591b9/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ExpressJS]: https://i.imgur.com/9RqI83p.png
[Express-url]: https://www.npmjs.com/package/express
