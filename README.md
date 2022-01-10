# Java Contact List Dashboard

**Feature:** As a user I should be able to enter the site providing my credentials

**Scenario:** Correct authentication 
Given I’m a user
When I provide my user and password correctly
Then I will be redirected to the main page and I should see my contact list 

**Scenario: **Wrong Authentication 
Given I’m a user
When I provide an incorrect user or password
Then I should see a message indicated that my user information is wrong

*image here*

**Feature:** As a user I should be able to see my contact list

**Scenario:** Contact List
Given I’m a user
When I enter the site
Then I should see my contact list

**Scenario:** Sort Contact list
Given I’m a user
When I enter the site, and click on any table header
Then I should see mi contact list sorted by the header selected (Except nickname)

*image here*

## What are we going to evaluate?

* Create a spring project based on Gradle.
* Use Sprint Boot to create the web app.
* Enable Restful endpoints.
* Implement login using spring security.
* Use properties file as much as possible.
* Use name convention for retrieve data with JPA.
* Retrieve data using Query string.
* Create CRUD Contact Functionalities
* Use Pagination on Contact List
* Quality of the code
* Logic
* Architecture used
* Good practices/Design patterns
* Application needs to be deployed to Heroku or any other hosting provider

## What are we going to evaluate?

* Use Angular and Bootstrap
* Add tests - TDD/BDD

## What are we going to evaluate?

* The code must be uploaded to a GitHub repository
* You need to create more than 50 contacts to list them into the contact list
* HAVE FUN CODING!

# Java Contact List Dashboard