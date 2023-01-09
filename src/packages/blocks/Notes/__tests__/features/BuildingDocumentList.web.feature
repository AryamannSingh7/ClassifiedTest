Feature: BuildingDocumentList

    Scenario: User navigates to BuildingDocumentList
        Given I am a User loading BuildingDocumentList
        When I navigate to the BuildingDocumentList
        Then BuildingDocumentList will load with out errors
        And Should load the document list
        And Should load the resolution list