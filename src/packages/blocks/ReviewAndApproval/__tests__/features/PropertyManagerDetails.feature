Feature: PropertyManagerDetails

    Scenario: User navigates to PropertyManagerDetails
        Given I am a User loading PropertyManagerDetails
        When I navigate to the PropertyManagerDetails
        Then PropertyManagerDetails will load with out errors
        And Should navigate to edit property manager
        And Should delete the property manager
        And Should load property manager details
        And Should delete the property manager
        And Should delete the property when there is multiple property
        And Should delete the property manager when there is single property
        And Should load complex details in form
        And Should edit the property
        And Should close the edit modal when click outside of modal
        And Should submit the edit form