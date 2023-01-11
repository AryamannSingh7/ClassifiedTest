Feature: OwnerBuildings

    Scenario: User navigates to OwnerBuildings
        Given I am a User loading OwnerBuildings
        When I navigate to the OwnerBuildings
        Then OwnerBuildings will load with out errors
        And Should load the building details