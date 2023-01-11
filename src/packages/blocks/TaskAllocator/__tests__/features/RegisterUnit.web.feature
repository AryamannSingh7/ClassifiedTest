Feature: RegisterUnit

    Scenario: User navigates to RegisterUnit
        Given I am a User loading RegisterUnit
        When I navigate to the RegisterUnit
        Then RegisterUnit will load with out errors
        And Should load the building list
        And Should load the floor list after building selected
        And Should load the unit list after floor selected
        And Should load the rent history list after unit selected
        And Should open add rent history modal
        And Should close add rent history modal
        And Should add the rent history to the unit
        And Should delete the rent history
        And Should register the my unit