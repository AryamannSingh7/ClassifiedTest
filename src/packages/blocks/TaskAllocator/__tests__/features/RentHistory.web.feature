Feature: RentHistory

    Scenario: User navigates to RentHistory
        Given I am a User loading RentHistory
        When I navigate to the RentHistory
        Then RentHistory will load with out errors
        And Should go back to unit details page
        And Should open for select to delete histories
        And Should select all the rent histories
        And Should delete the selected rent histories
        And Should add another history to the unit
        And Should close the add rent history modal
        And Should load rent histories list
        And Should select the check box and history id add into selectedRentHistory
        And Should unselect the check box and history id remove into selectedRentHistory
        And Should submit and add the rent history to list