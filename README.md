<!-- SkyScraper README -->
<!-- PROJECT LOGO -->

README Public Template (https://github.com/othneildrew/Best-README-Template)
<br />

<p align="center">
  <a href="https://github.com/oslabs-beta/SkyScraper">
    <!-- <img src="SkyScraper/media/SkyScraper-logo.png" alt="Logo" height="120"> -->
  </a>

  <h3 align="center">SkyScraper</h3>

  <p align="center">
    An AWS visualizer dashboard for EC2 instances and other services.
    <!-- <br />
    <a href="https://github.com/oslabs-beta/SkyScraper"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/SkyScraper/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/SkyScraper/issues">Request Feature</a> -->
  </p>
    <!-- BADGES -->
  <p align="center">
    <!-- VSCode Version
    <a href="https://marketplace.visualstudio.com/items?itemName=team-SkyScraper.SkyScraper"><img alt="Visual Studio Marketplace Version" src="https://img.shields.io/visual-studio-marketplace/v/team-SkyScraper.SkyScraper?label=Version"></a> -->
    <!-- VSCode Installs -->
    <!-- <a href="https://marketplace.visualstudio.com/items?itemName=team-SkyScraper.SkyScraper"><img alt="Visual Studio Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/team-SkyScraper.SkyScraper?label=Installs&logo=visualstudiocode"></a> -->
    <!-- STARS -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/SkyScraper?label=Stars&logo=github"></a> -->
    <!-- FORKS -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/oslabs-beta/SkyScraper?label=Forks&logo=github"></a> -->
    <!-- GITHUB RELEASE VERSION -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/releases"><img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/oslabs-beta/SkyScraper?include_prereleases"></a> -->
    <!-- <br> -->
    <!-- BUILD STATUS -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/actions/workflows/master.yml"><img alt="master CI/CD workflow status" src="https://github.com/oslabs-beta/SkyScraper/actions/workflows/master.yml/badge.svg"></a> -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/actions/workflows/dev.yml"><img alt="dev CI workflow status" src="https://github.com/oslabs-beta/SkyScraper/actions/workflows/dev.yml/badge.svg"></a> -->
    <!-- <img alt="Vercel Web deployments" src="https://img.shields.io/github/deployments/oslabs-beta/SkyScraper/production?label=build&logo=vercel"> -->
    <!-- LICENSE -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/SkyScraper"></a> -->
    <!-- CONTRIBUTIONS -->
    <!-- <a href="https://github.com/oslabs-beta/SkyScraper/blob/master/README.md"><img alt="Contributions" src="https://img.shields.io/badge/contributors-welcome-brightgreen"></a> -->
  </p>
</p>

<hr>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
        <li><a href="#built-with">Built With</a></li>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li>
      <a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#extension-settings">Extension Settings</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#creators">Creators</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>

  </ol>
</details>

<hr>

## About The Project

<br/>
<p align="center">
  <img width="900" src="SkyScraper/media/quizwall_demo.gif">
</p>
<br/>

SkyScraper is a visualizer dashboard that display AWS services. Starting with EC2, AWS users can visualize their EC2 Instances alongside their metrics in graph and chart format

With SkyScraper, you can optimize your spending by using the visuals to make informed decisions on which services you keep active and which need to be paused.

### Built With

- [<img style="height: 1em;" src="SkyScraper/media/react-brands.svg">](https://reactjs.org/) [React](https://reactjs.org/)
- [<img style="height: 1em;" src="SkyScraper/media/vscode.svg">](https://code.visualstudio.com/api) [AWS CloudWatch API](https://aws.com/api)
- [<img style="height: 1em;" src="SkyScraper/media/mochajs-icon.svg">](https://mochajs.org/) [AWS EC2 PI](https://aws.org/)
- [<img style="height: 1em;" src="SkyScraper/media/chai_icon.svg">](https://www.chaijs.com/) [Redux Toolkit](https://www.chaijs.com/)
- [<img style="height: 1em;" src="SkyScraper/media/babel-logo-minimal.svg">](https://babeljs.io/docs/en/babel-parser) [TypeScript](https://babeljs.io/docs/en/babel-parser)
- [<img style="height: 1em;" src="SkyScraper/media/webpack.svg">](https://webpack.js.org/) [Webpack](https://webpack.js.org/)
- [<img style="height: 1em;" src="SkyScraper/media/github-actions.svg">](https://github.com/features/actions) [GitHub Actions](https://github.com/features/actions)

## Installation

Installing from npm:

1. npm install skyscraper
2. npm run dev
3. Ta da

<!-- To install SkyScraper for development, please see the contributing section below. -->

## Usage

1. Login with region, access key, and secret access key
2. Click EC2 button
3. View each EC2 instance and their metrics

Icon Legend in SkyScraper Tree View:

- [<img style="height: 1em;" src="SkyScraper/media/circle-info-solid.svg">]() available props (hover)
- [<img style="height: 1em;" src="SkyScraper/media/circle-arrow-right-solid.svg">]() open file (click)
- [<img style="height: 1em;" src="SkyScraper/media/store-solid.svg" >]() Redux store connection
- <span>Navbar</span>: error in file (matches the error color of your theme)
- <b>Navbar</b>: currently open file

SkyScraper can currently display React apps made with TSX/JSX and ES6 import syntax.

SkyScraper will detect React components invoked using JSX tag syntax and React-Router component syntax, where React is imported in a file:

<!-- ```JSX
    // Navbar will be detected as a child of the current file
    <Navbar />

    // As above
    <Navbar></Navbar>

    // Route and Navbar will be detected as child components of the current file
    <Route component={Navbar} />

    // Route and App will be detected as child components of the current file
    <Route children={App} />
``` -->

<!-- SkyScraper will detect the names of inline props for JSX components it identifies:

```JSX
    // props 'userId' and 'userName' will be listed for Navbar in SkyScraper
    <Navbar userId={...} userName={...} />
```

SkyScraper can identify components connected to the Redux store, when 'connect' is imported from 'react-redux', and the component is the export default of the file:

```JSX
    // App.jsx
    import React from 'react';
    import { connect } from 'react-redux';

    const mapStateToProps = ...
    const mapDispatchToProps = ...

    const App = (props) => {
      return <h1>This is the App</h1>
    }

    // SkyScraper will detect App as connected to the Redux store
    export default connect(mapStateToProps, mapDispatchToProps)(App);
``` -->

<!-- ### Note

SkyScraper prioritizes file dependencies over component dependencies. Consider the following JSX contained in the file App.jsx:

```JSX
    //App.jsx
    import React from 'react';
    import Home from './Home';
    import Navbar from './Navbar';

    class App extends Component {

      render (
        return {
          <Home>
            <Navbar />
          </Home>
        })
    }
``` -->

<!-- SkyScraper will display Home and Navbar as siblings, both children of App: -->

<!-- <br />
  <img src="SkyScraper/media/readme-example.png"> -->

<!-- ### Contributor Usage

1. Download/clone the project from [Github](https://github.com/oslabs-beta/SkyScraper/)
2. Work on it
3. Make a PR and contribute your changes -->

<!-- Note: `Ctrl+R` (or `Cmd+R` on Mac) will refresh the extension development host

## Extension Settings

This extension contributes the following settings:

- `SkyScraper.view.reactRouter`: enable/disable React Router component nodes
- `SkyScraper.view.thirdParty`: enable/disable all third party component nodes -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/oslabs-beta/SkyScraper/LICENSE) for more information.

## Creators

- [Abel](https://github.com/abelr20)
- [Bin](https://github.com/b-the-coder)
- [Christie](https://github.com/ChristieLaf)
- [Tripp](https://github.com/TrippMurphy)
- [Nikola](https://github.com/Nikolaa92)

## Contact

[<img style="height: 1em; width: 1em;" src="SkyScraper/media/twitter-logo.svg">]() Twitter: [@TeamSkyScraper](https://x.com/teamSkyScraper) | Email: SkyScraperApp@gmail.com

[<img style="height: 1em; width: 1em;" src="SkyScraper/media/github-icon.svg">]() GitHub: [https://github.com/oslabs-beta/SkyScraper/](https://github.com/oslabs-beta/SkyScraper/)

## Acknowledgements

- Parsing Strategy inspired by [React Component Hierarchy](https://www.npmjs.com/package/react-component-hierarchy)
- Interactive tree view styling adapted from [Pure CSS Tree Menu](https://codepen.io/bisserof/pen/fdtBm)
- Icons from [Font Awesome](https://fontawesome.com)
- Tooltips with [Tippy](https://www.npmjs.com/package/@tippy.js/react)
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- SkyScraper Logo from [Freepik](https://www.freepik.com/vectors/tree)
- Readme badges from [shields.io](https://shields.io/)
