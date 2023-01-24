Feature: PersonalDocuments

    Scenario: User navigates to PersonalDocuments
        Given I am a User loading PersonalDocuments
        When I navigate to the PersonalDocuments
        Then PersonalDocuments will load with out errors
        And Should go to dashboard when click to back button
        And Should load the document counts