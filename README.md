# LEVEL

Hello, this is team LEVEL
- Woody Lin (team leader)
- Sammed Jain
- Jeremy Yao

## Project Website
[LEVEL Platform](https://woodylinwc.github.io/LEVEL/)

## Introduction
The goal of this project is to provide standardized visualization benchmark datasets
and rankings of computational methods for visualization understanding.

The users can train their models and submit a pull request which triggers the GitHub Action workflow, 
run the script remotely in the school server, compute the scores, and update the website leaderboard accordingly.

## Technologies
- **HTML + CSS + JavaScript**: Provide the structure, interactivity and behavior of our website.
- **Python**: Evaluates the training model and merge the results into the database. 
- **Miniconda**: Ensures that the Python files run smoothly and conflict-free on the server side.
- **AJAX**: Allows for dynamic content updates, improving user experience.
- **GitHub Workflow**: Automates the process directly in the GitHub repository. 
- **GitHub Pages + Jekyll**: Streamline the hosting and support of our static website, ensuring the leaderboard remains updated.

## Submit
- Fork the repository
- Train your CQAW data
- Submit a pull request

After the pull request is accepted, the evaluation will run under the hood (you can check the Github Action for the process).
Once the evaluation is done, refresh the page. The leaderboard will be ranked based on the quality of prediction.

## Workflow Demo
It's called **demo.mp4** under the demo folder (unfortunately GitHub doesn't allow user to watch it online, you have to download it).

You will see the following update the JSON file in the GitHub Action when the workflow is triggered.
```
out: SUBMISSION BY SNEAKRZ
out: LEVEL 1 mean RMSE: 29.460651101441833
out: LEVEL 2 mean RMSE: 12943.056***71998
out: LEVEL 3 mean ERROR: 1.3067628375363
out: SUBMISSION BY SRK
out: LEVEL 1 mean RMSE: 0.6701709473346102
out: LEVEL 2 mean RMSE: 50.00059038095959
out: LEVEL 3 mean ERROR: 0.008474890499999999
out: SUBMISSION BY sudoku
out: LEVEL 1 mean RMSE: 39.80684086530146
out: LEVEL 2 mean RMSE: 2376.610556288988
out: LEVEL 3 mean ERROR: 236782.620882325
out: SUBMISSION BY TEAM_York
out: LEVEL 2 mean RMSE: 26351.605880857434
out: LEVEL 3 mean ERROR: 1652.9160890953815
out: SUBMISSION BY ZSY
out: LEVEL 1 mean RMSE: 2.178483077297918
out: LEVEL 2 mean RMSE: 114575.3238453669
out: [main 5749bd1] new scores
```
Please remember that published.lock in the remote server will prevent the workflow from triggering (**remove** it before accept the pull request).

The following in the GitHub Action indicates that the published.lock is presented in the server.
```
out: Script already executed. Skipping script execution.
```
See publish.yml for more information about the workflow.

## Make sure you have ruby installed before host our website on the local machine
In the terminal you can check the ruby and gem version by running
```
ruby -v
```
and
```
gem -v
```
## You can host the website locally by running
```
jekyll s
```
You will see the following, click the **Server address** to open up the website
```
Configuration file: /Users/woodylin/Documents/LEVEL/_config.yml
            Source: /Users/woodylin/Documents/LEVEL
       Destination: /Users/woodylin/Documents/LEVEL/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.249 seconds.
 Auto-regeneration: enabled for '/Users/woodylin/Documents/LEVEL'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

## Limitation
The website is currently in beta. It's designated to test out the GitHub workflow for CQAW challenge right now. If you wish to modify the website
for your own sake, feel free to do that. You can add more functionality and features.

## Licence 
MIT