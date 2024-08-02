<!-- SkyScraper README -->

<!-- PROJECT LOGO -->

<a id="readme-top"></a>

<p align="center">
  <a href="https://github.com/oslabs-beta/SkyScraper">
    <img src="./client/src/assets/images/CircleLogo.png" alt="Logo" height="100">
  </a>

  <h3 align="center">SkyScraper</h3>

  <p align="center">
    Visualizer Dashboard for AWS EC2 Instances
    <br />
    <a href="https://github.com/oslabs-beta/SkyScraper/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/SkyScraper/issues">Request Feature</a>

  </p>
    <!-- BADGES -->
  <p align="center">
    <!-- STARS -->
    <a href="https://github.com/oslabs-beta/SkyScraper/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/SkyScraper?label=Stars&logo=github"></a>
    <!-- FORKS -->
    <a href="https://github.com/oslabs-beta/SkyScraper/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/oslabs-beta/SkyScraper?label=Forks&logo=github"></a>
    <!-- LICENSE -->
    <a href="https://github.com/oslabs-beta/SkyScraper/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/SkyScraper"></a>
    <!-- CONTRIBUTIONS -->
    <a href="https://github.com/oslabs-beta/SkyScraper/blob/master/README.md"><img alt="Contributions" src="https://img.shields.io/badge/contributors-welcome-brightgreen"></a>
  </p>
</p>

<hr>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#introduction">Introduction</a>
    <li><a href="#built-with">Built With</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#creators">Creators</a></li>
    <li><a href="#contact-us">Contact Us</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<hr>

## Introduction

<br/>
<p align="center">
  <img width="900" src="./client/src/assets/images/FlatLogo.png">
</p>

SkyScraper is an innovative visualizer dashboard that transforms the way developers interact with AWS performance data, starting with EC2. By offering a streamlined, intuitive interface, SkyScraper optimizes the retrieval, organization, and visualization of performance metrics, enabling users to manage their AWS environments effectively.

Leveraging Auth0 and AWS Cognito for secure user authentication, SkyScraper ensures safe data retrieval using AWS credentials, with multiple security checkpoints to maintain data integrity and privacy. The application abstracts complex configurations, presenting clear and actionable insights that empower users to monitor instance activity, identify optimization opportunities, and make informed decisions to minimize costs and enhance performance.

Designed with a focus on clarity and aesthetics, SkyScraper features custom themes that provide a visually pleasing user experience. Data is categorized and displayed through modern charts and graphs, allowing users to quickly identify trends and anomalies. By turning complex data into easily understandable insights, SkyScraper revolutionizes AWS performance data management, making it more efficient and accessible for developers.

### Built With

- [<img style="height: 1em;" src="./client/src/assets/images/TS.png">](https://www.typescriptlang.org/) [TypeScript](https://www.typescriptlang.org/)
- [<img style="height: 1em;" src="./client/src/assets/images/React.png">](https://reactjs.org/) [React](https://reactjs.org/)
- [<img style="height: 1em;" src="./client/src/assets/images/Redux.png">](https://redux-toolkit.js.org/) [Redux](https://redux-toolkit.js.org/)
- [<img style="height: 1em;" src="./client/src/assets/images/Node.js.png">](https://nodejs.org/en) [Node.js](https://nodejs.org/en)
- [<img style="height: 1em;" src="./client/src/assets/images/Express.png">](https://expressjs.com/) [Express](https://expressjs.com/)
- [<img style="height: 1em;" src="./client/src/assets/images/ChartJs.png">](https://www.chartjs.org/) [Chart.js](https://www.chartjs.org/)
- [<img style="height: 1em;" src="./client/src/assets/images/WebPack.png">](https://webpack.js.org/) [Webpack](https://webpack.js.org/)
- [<img style="height: 1em;" src="./client/src/assets/images/Auth0.png">](https://auth0.com/) [Auth0](https://auth0.com/)
- [<img style="height: 1em;" src="./client/src/assets/images/Cognito.png">](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/Welcome.html) [AWS Cognito API](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/Welcome.html)
- [<img style="height: 1em;" src="./client/src/assets/images/CloudWatch.png">](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/Welcome.html) [AWS CloudWatch API](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/Welcome.html)
- [<img style="height: 1em;" src="./client/src/assets/images/EC2.png">](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Welcome.html) [AWS EC2 API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Welcome.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. Navigate to https://skyscraper-api.com in your browser
1. Click Get Started
1. Sign Up or Log In with Auth0
1. Once Logged In, you will see an overview of the name and status of all EC2 Instances
1. Clicking on any instance box will bring you to the metrics page where you can view detailed metrics of each instance

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Installing from Github:

1. Clone and open the Repo in your Code Editor
   ```sh
   git clone https://github.com/oslabs-beta/SkyScraper.git
   ```
1. Create a .env file in the root directory from the provided template and input values from an AWS account
1. Install dependencies
   ```sh
   npm install
   ```
1. Build and run the application on your local machine
   ```sh
   npm run go
   ```
1. Navigate to http://localhost:8080 in your browser to view the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a **star**! Thanks again!

1. Fork the Repo
2. Create your Feature Branch

   ```sh
   git checkout -b feature/AmazingFeature
   ```

3. Commit your Changes

   ```sh
   git commit -m 'Add some AmazingFeature'
   ```

4. Push to the Branch

   ```sh
   git push origin feature/AmazingFeature
   ```

5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/oslabs-beta/SkyScraper?tab=MIT-1-ov-file#readme) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Creators

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">](https://github.com/abelr20) [<img style="height: 1em; width: 1em;" src="./client/src/assets/images/LinkedIn.png">](https://www.linkedin.com/in/abel-ratanaphan/) Abel Ratanaphan

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">](https://github.com/b-the-coder) [<img style="height: 1em; width: 1em;" src="./client/src/assets/images/LinkedIn.png">](https://www.linkedin.com/in/bin-emma-he/) Bin He

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">](https://github.com/ChristieLaf) [<img style="height: 1em; width: 1em;" src="./client/src/assets/images/LinkedIn.png">](https://www.linkedin.com/in/christie-laferriere/) Christie Laferriere

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">](https://github.com/TrippMurphy) [<img style="height: 1em; width: 1em;" src="./client/src/assets/images/LinkedIn.png">](https://www.linkedin.com/in/trippmurphy/) Tripp Murphy

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">](https://github.com/Nikolaa92) [<img style="height: 1em; width: 1em;" src="./client/src/assets/images/LinkedIn.png">](https://www.linkedin.com/in/nikola-andelkovic/) Nikola Andelkovic

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact Us

<img style="height: 1em; width: 1em;" src="./client/src/assets/images/Mail.png"> AppSkyScraper@gmail.com

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/XWhite.png">]() [@SkyScraperApp](https://x.com/SkyScraperApp)

[<img style="height: 1em; width: 1em;" src="./client/src/assets/images/GitHubWhite.png">]() [github.com/oslabs-beta/SkyScraper](https://github.com/oslabs-beta/SkyScraper/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements

- [README Template](https://github.com/othneildrew/Best-README-Template)
- [shields.io Badges](https://shields.io/)
- [Icons 8](https://icons8.com/icons)
- [Icon Finder](https://www.iconfinder.com/)
- [Icon Scout](https://iconscout.com/)
- [Flat Icon](https://flaticon.com)
- [AWS Icons](https://aws-icons.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
