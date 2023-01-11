Feature: DocumentViewChairman

    Scenario: User navigates to DocumentViewChairman
        Given I am a User loading DocumentViewChairman
        When I navigate to the DocumentViewChairman
        Then DocumentViewChairman will load with out errors
        And Should load the chairman document for view