Feature: SharedArea

    Scenario: User navigates to SharedArea
        Given I am a User loading SharedArea
        When I navigate to the SharedArea
        Then SharedArea will load with out errors
        And Should load the building list
        And Should load the shared area details
        And Should edit shared area details
        And Should close edit building modal when click on close icon
        And Should close edit building modal when click on cancel button
        And Should close the slider modal
        And Should see the prev the slider modal
        And Should see the next the slider modal
        And Should filter by building reservation
        And Should able to upload the image
        And Should able to upload the floor plan
        And Should edit the share area details
        And Should load the reservation list
        And Should open edit area modal when click on button