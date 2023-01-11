Feature: MyUnitList

    Scenario: User navigates to MyUnitList
        Given I am a User loading MyUnitList
        When I navigate to the MyUnitList
        Then MyUnitList will load with out errors
        And Should load unit list
        And Should open the delete modal
        And Should Close the delete modal when click outside the modal
        And Should Close the delete modal when click close button
        And Should delete the unit
        And Should delete the unit pending request