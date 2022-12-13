Feature: PropertyManagerDetails

    Scenario: User navigates to PropertyManagerDetails
        Given I am a User loading PropertyManagerDetails
        When I navigate to the PropertyManagerDetails
        Then PropertyManagerDetails will load with out errors
        And Should navigate to edit property manager
        And Should delete the property manager