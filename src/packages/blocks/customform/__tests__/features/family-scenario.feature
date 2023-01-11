Feature: Family

    Scenario: User navigates to family
        Given I am a User loading family
        When I navigate to the family
        Then family will load with out errors
        Then I am able to click Icon Button
        Then Should load the Family List
        Then I am able to click route
        Then I am able to click route1
        Then I am able to click route2
