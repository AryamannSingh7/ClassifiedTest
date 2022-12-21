Feature: Family

    Scenario: User navigates to family
        Given I am a User loading family
        When I navigate to the family
        Then family will load with out errors
        And I can enter firm name with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors