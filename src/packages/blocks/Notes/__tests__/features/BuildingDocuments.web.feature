Feature: BuildingDocuments

    Scenario: User navigates to BuildingDocuments
        Given I am a User loading BuildingDocuments
        When I navigate to the BuildingDocuments
        Then BuildingDocuments will load with out errors
        And Should go to dashboard when click to back button
        And Should load the document counts