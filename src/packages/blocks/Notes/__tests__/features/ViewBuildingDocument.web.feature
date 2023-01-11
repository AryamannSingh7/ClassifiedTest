Feature: ViewBuildingDocument

    Scenario: User navigates to ViewBuildingDocument
        Given I am a User loading ViewBuildingDocument
        When I navigate to the ViewBuildingDocument
        Then ViewBuildingDocument will load with out errors
        And Should load the resolution document
        And Should able to share meeting minute document
        And Should load the building document