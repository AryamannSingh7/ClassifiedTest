Feature: PropertyManagerSuccess

    Scenario: User navigates to PropertyManagerSuccess
        Given I am a User loading PropertyManagerSuccess
        When I navigate to the PropertyManagerSuccess
        Then PropertyManagerSuccess will load with out errors
        And Should go to property manager list on click to back button
        And Should go to property manager list on click to okay button