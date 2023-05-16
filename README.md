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
- submit a pull request

After the pull request is accepted, the evaluation will be run under the hood (you can check the Github Action for the process)
Once the evaluation is done, refresh the page. The leaderboard will be ranked based on the quality of prediction.

## Workflow Demo


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
