Feature: EditUnit

    Scenario: User navigates to EditUnit
        Given I am a User loading EditUnit
        When I navigate to the EditUnit
        Then EditUnit will load with out errors
        And Should go back to unit details page
        And Should load complex details
        And Should load unit details
        And Should open add rent history modal
        And Should close add rent history modal
        And Should add the rent history to the unit
        And Should delete the rent history
        And Should edit the my unit