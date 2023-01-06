Feature: Family

    Scenario: User navigates to family
        Given I am a User loading family
        When I navigate to the family
        Then family will load with out errors
        Then Should load the Family List
        Then should check componentDidMount



