Feature: UnitDetails

    Scenario: User navigates to UnitDetails
        Given I am a User loading UnitDetails
        When I navigate to the UnitDetails
        Then UnitDetails will load with out errors
        And Should open the delete modal when unit is not in pending
        And Should Close the delete modal when click outside the modal
        And Should Close the delete modal when click close button
        And Should delete the unit
        And Should go back to unit list when unit is not in pending
        And Should go back to unit list when click on okay button
        And Should delete pending unit request
        And Should load unit details 
        And Should load rent history
        And Should go to rent history page