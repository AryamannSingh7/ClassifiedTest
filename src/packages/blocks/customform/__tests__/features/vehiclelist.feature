Feature: Family

    Scenario: User navigates to family
        Given I am a User loading family
        When I navigate to the family
        Then family will load with out errors
        Then I am able to click Icon Button
        Then I am able to click route
        Then Should load the Family List
        Then should check componentDidMount
        Then I am able to click route2
        Then I am able to click route3



