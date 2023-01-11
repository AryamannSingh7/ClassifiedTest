Feature: DocumentChairman

    Scenario: User navigates to DocumentChairman
        Given I am a User loading DocumentChairman
        When I navigate to the DocumentChairman
        Then DocumentChairman will load with out errors
        And Should load the document counts